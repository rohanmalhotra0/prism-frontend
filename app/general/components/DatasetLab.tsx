"use client";

import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import * as THREE from "three";

interface DatasetLabProps {
  sharedData: any;
  setSharedData: (data: any) => void;
}

interface DataPoint {
  [key: string]: any;
}

export default function DatasetLab({ sharedData, setSharedData }: DatasetLabProps) {
  const [dataset, setDataset] = useState<DataPoint[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [visualizationType, setVisualizationType] = useState<'scatter' | 'line' | '3d'>('scatter');
  const [filters, setFilters] = useState<{[key: string]: any}>({});
  const [transformations, setTransformations] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false });
  const targetRef = useRef({ x: 0, y: 0 });

  // Load shared data from Math Visualizer
  useEffect(() => {
    if (sharedData && sharedData.type === 'equation_data') {
      setDataset(sharedData.data);
      setColumns(['x', 'y']);
      setSelectedColumns(['x', 'y']);
    }
  }, [sharedData]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      parseXLSXFile(file);
    } else if (fileExtension === 'csv') {
      parseCSVFile(file);
    } else {
      setError('Please upload a CSV or XLSX file');
      setIsLoading(false);
    }
  };

  const parseXLSXFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        if (jsonData.length === 0) {
          alert('The file appears to be empty');
          return;
        }

        const headers = (jsonData[0] as string[]).map(h => h?.toString().trim() || '');
        const dataRows = jsonData.slice(1) as any[][];
        
        const parsedData = dataRows.map(row => {
          const dataPoint: DataPoint = {};
          headers.forEach((header, index) => {
            const value = row[index];
            // Try to parse as number, otherwise keep as string
            dataPoint[header] = isNaN(Number(value)) ? value : Number(value);
          });
          return dataPoint;
        });

        setDataset(parsedData);
        setColumns(headers);
        setSelectedColumns(headers.slice(0, 2));
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.error('Error parsing XLSX file:', error);
        setError('Error parsing XLSX file. Please check the file format.');
        setIsLoading(false);
      }
    };
    reader.readAsBinaryString(file);
  };

  const parseCSVFile = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          if (results.errors.length > 0) {
            console.warn('CSV parsing warnings:', results.errors);
          }

          const data = results.data as DataPoint[];
          if (data.length === 0) {
            alert('The CSV file appears to be empty');
            return;
          }

          // Convert string numbers to actual numbers
          const processedData = data.map(row => {
            const processedRow: DataPoint = {};
            Object.keys(row).forEach(key => {
              const value = row[key];
              // Try to parse as number, otherwise keep as string
              processedRow[key] = isNaN(Number(value)) ? value : Number(value);
            });
            return processedRow;
          });

          const headers = Object.keys(processedData[0] || {});
          setDataset(processedData);
          setColumns(headers);
          setSelectedColumns(headers.slice(0, 2));
          setIsLoading(false);
          setError(null);
        } catch (error) {
          console.error('Error processing CSV data:', error);
          setError('Error processing CSV file. Please check the file format.');
          setIsLoading(false);
        }
      },
      error: (error) => {
        console.error('Error parsing CSV file:', error);
        setError('Error parsing CSV file. Please check the file format.');
        setIsLoading(false);
      }
    });
  };

  const generateSampleData = () => {
    const sampleData = [];
    for (let i = 0; i < 100; i++) {
      const x = (i - 50) / 10;
      const y = Math.sin(x) + (Math.random() - 0.5) * 0.5;
      const z = Math.cos(x) + (Math.random() - 0.5) * 0.3;
      sampleData.push({ x, y, z, category: Math.random() > 0.5 ? 'A' : 'B' });
    }
    setDataset(sampleData);
    setColumns(['x', 'y', 'z', 'category']);
    setSelectedColumns(['x', 'y']);
  };

  const applyTransformation = (column: string, transformation: string) => {
    if (!transformation) return;

    const newDataset = dataset.map(row => {
      const value = row[column];
      let newValue = value;

      switch (transformation) {
        case 'normalize':
          const min = Math.min(...dataset.map(d => d[column]));
          const max = Math.max(...dataset.map(d => d[column]));
          newValue = (value - min) / (max - min);
          break;
        case 'log':
          newValue = Math.log(Math.abs(value) + 1);
          break;
        case 'sqrt':
          newValue = Math.sqrt(Math.abs(value));
          break;
        case 'square':
          newValue = value * value;
          break;
        case 'moving_average':
          // Simple moving average (would need more complex implementation)
          newValue = value;
          break;
      }

      return { ...row, [`${column}_${transformation}`]: newValue };
    });

    setDataset(newDataset);
    setColumns(prev => [...prev, `${column}_${transformation}`]);
  };

  const initThreeJS = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0f0f);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Grid
    const gridHelper = new THREE.GridHelper(20, 20, 0x374151, 0x374151);
    scene.add(gridHelper);

    // Axes
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // Mouse controls
    const handleMouseDown = (event: MouseEvent) => {
      mouseRef.current.isDown = true;
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!mouseRef.current.isDown || !cameraRef.current) return;

      const deltaX = event.clientX - mouseRef.current.x;
      const deltaY = event.clientY - mouseRef.current.y;

      targetRef.current.x += deltaX * 0.01;
      targetRef.current.y += deltaY * 0.01;

      // Update camera position
      const radius = 20;
      cameraRef.current.position.x = Math.cos(targetRef.current.x) * Math.cos(targetRef.current.y) * radius;
      cameraRef.current.position.y = Math.sin(targetRef.current.y) * radius;
      cameraRef.current.position.z = Math.sin(targetRef.current.x) * Math.cos(targetRef.current.y) * radius;
      cameraRef.current.lookAt(0, 0, 0);

      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    const handleWheel = (event: WheelEvent) => {
      if (!cameraRef.current) return;
      
      const zoomSpeed = 0.1;
      const direction = event.deltaY > 0 ? 1 : -1;
      const currentRadius = cameraRef.current.position.length();
      const newRadius = Math.max(5, Math.min(50, currentRadius + direction * zoomSpeed));
      
      const normalizedPosition = cameraRef.current.position.clone().normalize();
      cameraRef.current.position.copy(normalizedPosition.multiplyScalar(newRadius));
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('wheel', handleWheel);

    // Cleanup function
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('wheel', handleWheel);
    };
  };

  const createScatterPlot = () => {
    if (!sceneRef.current || !cameraRef.current) return;

    console.log('Creating scatter plot with dataset length:', dataset.length);

    // Clear existing data points
    const existingPoints = sceneRef.current.children.filter(child => child.userData.isDataPoint);
    existingPoints.forEach(point => sceneRef.current!.remove(point));

    const filteredData = dataset.filter(row => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === '') return true;
        return row[key]?.toString().toLowerCase().includes(value.toString().toLowerCase());
      });
    });

    if (filteredData.length === 0) return;

    const xCol = selectedColumns[0];
    const yCol = selectedColumns[1];
    const zCol = selectedColumns[2];

    if (!xCol || !yCol) return;

    const xValues = filteredData.map(d => d[xCol]).filter(v => typeof v === 'number');
    const yValues = filteredData.map(d => d[yCol]).filter(v => typeof v === 'number');
    
    if (xValues.length === 0 || yValues.length === 0) return;

    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);

    const xRange = xMax - xMin || 1;
    const yRange = yMax - yMin || 1;

    // Normalize data to -10 to 10 range
    const normalizeX = (x: number) => ((x - xMin) / xRange) * 20 - 10;
    const normalizeY = (y: number) => ((y - yMin) / yRange) * 20 - 10;

    console.log('Creating', filteredData.length, 'data points');
    filteredData.forEach((row, index) => {
      const x = row[xCol];
      const y = row[yCol];
      
      if (typeof x !== 'number' || typeof y !== 'number') return;

      const geometry = new THREE.SphereGeometry(0.2, 8, 8);
      
      // Color based on z-value or index
      let color = 0x8b5cf6;
      if (zCol && typeof row[zCol] === 'number') {
        const z = row[zCol];
        const zMin = Math.min(...filteredData.map(d => d[zCol]).filter(v => typeof v === 'number'));
        const zMax = Math.max(...filteredData.map(d => d[zCol]).filter(v => typeof v === 'number'));
        const intensity = (z - zMin) / (zMax - zMin);
        color = new THREE.Color().setHSL(0.7, 1, 0.3 + intensity * 0.7).getHex();
      }

      const material = new THREE.MeshBasicMaterial({ color });
      const sphere = new THREE.Mesh(geometry, material);
      
      sphere.position.set(normalizeX(x), normalizeY(y), 0);
      sphere.userData.isDataPoint = true;
      sphere.userData.originalIndex = index;
      
      sceneRef.current!.add(sphere);
      
      if (index < 5) {
        console.log(`Point ${index}: x=${normalizeX(x).toFixed(2)}, y=${normalizeY(y).toFixed(2)}`);
      }
    });

    // Set camera position for 2D view
    cameraRef.current!.position.set(0, 0, 15);
    cameraRef.current!.lookAt(0, 0, 0);
  };

  const createLinePlot = () => {
    if (!sceneRef.current) return;

    // Clear existing lines
    const existingLines = sceneRef.current.children.filter(child => child.userData.isDataLine);
    existingLines.forEach(line => sceneRef.current!.remove(line));

    const filteredData = dataset.filter(row => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === '') return true;
        return row[key]?.toString().toLowerCase().includes(value.toString().toLowerCase());
      });
    });

    if (filteredData.length === 0) return;

    const xCol = selectedColumns[0];
    const yCol = selectedColumns[1];

    if (!xCol || !yCol) return;

    const sortedData = filteredData
      .filter(row => typeof row[xCol] === 'number' && typeof row[yCol] === 'number')
      .sort((a, b) => a[xCol] - b[xCol]);

    if (sortedData.length === 0) return;

    const xValues = sortedData.map(d => d[xCol]);
    const yValues = sortedData.map(d => d[yCol]);

    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);

    const xRange = xMax - xMin || 1;
    const yRange = yMax - yMin || 1;

    // Create line geometry
    const points = sortedData.map(row => {
      const x = ((row[xCol] - xMin) / xRange) * 20 - 10;
      const y = ((row[yCol] - yMin) / yRange) * 20 - 10;
      return new THREE.Vector3(x, y, 0);
    });

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0x8b5cf6, linewidth: 3 });
    const line = new THREE.Line(geometry, material);
    
    line.userData.isDataLine = true;
    sceneRef.current.add(line);

    // Set camera position for 2D view
    cameraRef.current!.position.set(0, 0, 15);
    cameraRef.current!.lookAt(0, 0, 0);
  };

  const create3DPlot = () => {
    if (!sceneRef.current) return;

    // Clear existing 3D objects
    const existing3D = sceneRef.current.children.filter(child => child.userData.isData3D);
    existing3D.forEach(obj => sceneRef.current!.remove(obj));

    const filteredData = dataset.filter(row => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === '') return true;
        return row[key]?.toString().toLowerCase().includes(value.toString().toLowerCase());
      });
    });

    if (filteredData.length === 0) return;

    const xCol = selectedColumns[0];
    const yCol = selectedColumns[1];
    const zCol = selectedColumns[2];

    if (!xCol || !yCol) return;

    const xValues = filteredData.map(d => d[xCol]).filter(v => typeof v === 'number');
    const yValues = filteredData.map(d => d[yCol]).filter(v => typeof v === 'number');
    const zValues = zCol ? filteredData.map(d => d[zCol]).filter(v => typeof v === 'number') : [0];
    
    if (xValues.length === 0 || yValues.length === 0) return;

    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);
    const zMin = zValues.length > 0 ? Math.min(...zValues) : 0;
    const zMax = zValues.length > 0 ? Math.max(...zValues) : 0;

    const xRange = xMax - xMin || 1;
    const yRange = yMax - yMin || 1;
    const zRange = zMax - zMin || 1;

    // Normalize data to -10 to 10 range
    const normalizeX = (x: number) => ((x - xMin) / xRange) * 20 - 10;
    const normalizeY = (y: number) => ((y - yMin) / yRange) * 20 - 10;
    const normalizeZ = (z: number) => ((z - zMin) / zRange) * 20 - 10;

    filteredData.forEach((row, index) => {
      const x = row[xCol];
      const y = row[yCol];
      const z = zCol && typeof row[zCol] === 'number' ? row[zCol] : 0;
      
      if (typeof x !== 'number' || typeof y !== 'number') return;

      const geometry = new THREE.SphereGeometry(0.3, 8, 8);
      
      // Color based on z-value or index
      let color = 0x8b5cf6;
      if (zCol && typeof row[zCol] === 'number') {
        const intensity = (z - zMin) / zRange;
        color = new THREE.Color().setHSL(0.7, 1, 0.3 + intensity * 0.7).getHex();
      }

      const material = new THREE.MeshBasicMaterial({ color });
      const sphere = new THREE.Mesh(geometry, material);
      
      sphere.position.set(normalizeX(x), normalizeY(y), normalizeZ(z));
      sphere.userData.isData3D = true;
      sphere.userData.originalIndex = index;
      
      sceneRef.current!.add(sphere);
    });

    // Set camera position for 3D view
    cameraRef.current!.position.set(15, 15, 15);
    cameraRef.current!.lookAt(0, 0, 0);
  };

  const animate = () => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

    if (isAnimating) {
      // Rotate camera around the data
      const time = Date.now() * 0.001;
      const radius = 20;
      cameraRef.current.position.x = Math.cos(time * 0.5) * radius;
      cameraRef.current.position.z = Math.sin(time * 0.5) * radius;
      cameraRef.current.lookAt(0, 0, 0);

      // Animate data points
      const dataPoints = sceneRef.current.children.filter(child => 
        child.userData.isDataPoint || child.userData.isData3D
      );
      
      dataPoints.forEach((point, index) => {
        const originalY = point.position.y;
        point.position.y = originalY + Math.sin(time + index * 0.1) * 0.5;
      });
    }

    // Always render the scene, regardless of animation state
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    animationRef.current = requestAnimationFrame(animate);
  };

  // Initialize Three.js
  useEffect(() => {
    initThreeJS();
    // Start the render loop immediately
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (canvasRef.current && rendererRef.current && cameraRef.current) {
        const canvas = canvasRef.current;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Update visualization when data changes
  useEffect(() => {
    if (dataset.length === 0) return;

    switch (visualizationType) {
      case 'scatter':
        createScatterPlot();
        break;
      case 'line':
        createLinePlot();
        break;
      case '3d':
        create3DPlot();
        break;
    }
  }, [dataset, selectedColumns, visualizationType, filters]);

  // Animation state is now handled within the animate function

  const exportToML = () => {
    setSharedData({
      type: 'dataset',
      data: dataset,
      columns,
      selectedColumns
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Dataset Lab</h2>
        <p className="text-gray-400">Upload, explore, and transform datasets with interactive visualizations</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Controls Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Data Import */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Data Import</h3>
            <div className="space-y-3">
              <div>
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Supported formats: CSV, XLSX, XLS
                </p>
              </div>
              <button
                onClick={generateSampleData}
                disabled={isLoading}
                className={`w-full p-2 rounded transition-colors ${
                  isLoading
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isLoading ? 'Loading...' : 'Generate Sample Data'}
              </button>
              
              {error && (
                <div className="p-3 bg-red-900/50 border border-red-500 rounded text-red-300 text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Column Selection */}
          {columns.length > 0 && (
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Columns</h3>
              <div className="space-y-2">
                {columns.map((col, index) => (
                  <label key={col} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedColumns.includes(col)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedColumns(prev => [...prev, col]);
                        } else {
                          setSelectedColumns(prev => prev.filter(c => c !== col));
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-300">{col}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Visualization Type */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Visualization</h3>
            <div className="space-y-2">
              {[
                { value: 'scatter', label: 'Scatter Plot', desc: '3D points' },
                { value: 'line', label: 'Line Plot', desc: 'Connected lines' },
                { value: '3d', label: '3D Scatter', desc: 'Full 3D view' }
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() => setVisualizationType(type.value as any)}
                  className={`w-full p-2 rounded text-sm transition-colors ${
                    visualizationType === type.value
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="text-left">
                    <div className="font-medium">{type.label}</div>
                    <div className="text-xs opacity-75">{type.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Animation Controls */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Animation</h3>
            <div className="space-y-3">
              <button
                onClick={() => setIsAnimating(!isAnimating)}
                className={`w-full p-2 rounded transition-colors ${
                  isAnimating
                    ? 'bg-red-600 text-white'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isAnimating ? 'Stop Animation' : 'Start Animation'}
              </button>
              
              <div className="text-xs text-gray-400">
                Animation rotates camera and bounces data points
              </div>
            </div>
          </div>

          {/* Transformations */}
          {columns.length > 0 && (
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Transformations</h3>
              <div className="space-y-3">
                {columns.map((col) => (
                  <div key={col}>
                    <label className="block text-sm text-gray-300 mb-1">{col}</label>
                    <select
                      value={transformations[col] || ''}
                      onChange={(e) => {
                        setTransformations(prev => ({ ...prev, [col]: e.target.value }));
                        if (e.target.value) {
                          applyTransformation(col, e.target.value);
                        }
                      }}
                      className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
                    >
                      <option value="">None</option>
                      <option value="normalize">Normalize</option>
                      <option value="log">Log</option>
                      <option value="sqrt">Square Root</option>
                      <option value="square">Square</option>
                      <option value="moving_average">Moving Average</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Export */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Export</h3>
            <button
              onClick={exportToML}
              className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Send to ML Toolkit
            </button>
          </div>
        </div>

        {/* Data Table and Visualization */}
        <div className="lg:col-span-3 space-y-6">
          {/* Data Table */}
          {dataset.length > 0 && (
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Data Preview</h3>
              <div className="overflow-x-auto max-h-48">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      {columns.map((col) => (
                        <th key={col} className="text-left p-2 text-gray-300">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dataset.slice(0, 10).map((row, index) => (
                      <tr key={index} className="border-b border-gray-700">
                        {columns.map((col) => (
                          <td key={col} className="p-2 text-gray-400">
                            {typeof row[col] === 'number' ? row[col].toFixed(2) : row[col]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {dataset.length > 10 && (
                  <p className="text-gray-500 text-sm mt-2">Showing first 10 rows of {dataset.length} total</p>
                )}
              </div>
            </div>
          )}

          {/* Three.js Visualization */}
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                {visualizationType === 'scatter' ? '3D Scatter Plot' : 
                 visualizationType === 'line' ? '3D Line Plot' : '3D Scatter Plot'}
              </h3>
              <div className="text-sm text-gray-400">
                {dataset.length} data points
              </div>
            </div>
            
            <div className="bg-black rounded-lg overflow-hidden" style={{ height: '500px' }}>
              <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ display: 'block' }}
              />
            </div>
            
            <div className="mt-4 p-3 bg-gray-700/50 rounded text-xs text-gray-400">
              <div className="font-semibold mb-1">3D Controls:</div>
              <div>• Mouse: Rotate view</div>
              <div>• Scroll: Zoom in/out</div>
              <div>• Right click + drag: Pan</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
