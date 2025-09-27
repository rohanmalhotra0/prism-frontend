"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  const [is3D, setIs3D] = useState(false);
  const [filters, setFilters] = useState<{[key: string]: any}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [performanceMode, setPerformanceMode] = useState(false);
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

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
        
        let rowIndex = 0;
        const parsedData = dataRows.map(row => {
          const dataPoint: DataPoint = {};
          headers.forEach((header, index) => {
            const value = row[index];
            // Try to parse as number, otherwise keep as string
            dataPoint[header] = isNaN(Number(value)) ? value : Number(value);
          });
          // Excel serial date -> ISO string; also create date_index for plotting
          if (dataPoint["Date"] !== undefined) {
            const v = dataPoint["Date"];
            if (typeof v === "number" && v > 20000) {
              const jsDate = new Date(Math.round((v - 25569) * 86400 * 1000));
              dataPoint["Date"] = jsDate.toISOString().slice(0, 10);
            }
            dataPoint["date_index"] = rowIndex++;
          }
          return dataPoint;
        });

        setDataset(parsedData);
        const cols = [...headers];
        if (!cols.includes("date_index") && parsedData[0]?.date_index !== undefined) cols.push("date_index");
        setColumns(cols);
        // Prefer date_index with Close if available
        if (cols.includes("date_index") && cols.includes("Close")) {
          setSelectedColumns(["date_index", "Close"]);
        } else {
          setSelectedColumns(cols.slice(0, 2));
        }
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
          let rowIndex = 0;
          const processedData = data.map(row => {
            const processedRow: DataPoint = {};
            Object.keys(row).forEach(key => {
              const value = row[key];
              // Try to parse as number, otherwise keep as string
              processedRow[key] = isNaN(Number(value)) ? value : Number(value);
            });
            // Convert possible Excel serial date and add date_index
            if (processedRow["Date"] !== undefined) {
              const v = processedRow["Date"];
              if (typeof v === "number" && v > 20000) {
                const jsDate = new Date(Math.round((v - 25569) * 86400 * 1000));
                processedRow["Date"] = jsDate.toISOString().slice(0, 10);
              }
              processedRow["date_index"] = rowIndex++;
            }
            return processedRow;
          });

          const headers = Object.keys(processedData[0] || {});
          setDataset(processedData);
          const cols = [...headers];
          if (!cols.includes("date_index") && processedData[0]?.date_index !== undefined) cols.push("date_index");
          setColumns(cols);
          if (cols.includes("date_index") && cols.includes("Close")) {
            setSelectedColumns(["date_index", "Close"]);
          } else {
            setSelectedColumns(cols.slice(0, 2));
          }
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


  const initThreeJS = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Dispose of existing renderer if it exists
    if (rendererRef.current) {
      rendererRef.current.dispose();
      rendererRef.current = null;
    }

    // Clear any existing context by removing and recreating the canvas
    const parent = canvas.parentNode;
    if (parent) {
      // Remove the old canvas
      parent.removeChild(canvas);
      
      // Create a completely new canvas element
      const newCanvas = document.createElement('canvas');
      newCanvas.className = canvas.className;
      newCanvas.style.cssText = canvas.style.cssText;
      newCanvas.width = canvas.clientWidth;
      newCanvas.height = canvas.clientHeight;
      
      // Insert the new canvas
      parent.appendChild(newCanvas);
      
      // Update the ref to point to the new canvas
      canvasRef.current = newCanvas;
    }

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0f0f);
    sceneRef.current = scene;

    // Camera
    const newCanvas = canvasRef.current;
    if (!newCanvas) return;
    
    const camera = new THREE.PerspectiveCamera(75, newCanvas.clientWidth / newCanvas.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);
    cameraRef.current = camera;

    // Renderer - use the new canvas
    const renderer = new THREE.WebGLRenderer({ canvas: newCanvas, antialias: false });
    renderer.setSize(newCanvas.clientWidth, newCanvas.clientHeight);
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

    if (newCanvas) {
      newCanvas.addEventListener('mousedown', handleMouseDown);
      newCanvas.addEventListener('mouseup', handleMouseUp);
      newCanvas.addEventListener('mousemove', handleMouseMove);
      newCanvas.addEventListener('wheel', handleWheel);
    }

    // Cleanup function
    return () => {
      if (newCanvas) {
        newCanvas.removeEventListener('mousedown', handleMouseDown);
        newCanvas.removeEventListener('mouseup', handleMouseUp);
        newCanvas.removeEventListener('mousemove', handleMouseMove);
        newCanvas.removeEventListener('wheel', handleWheel);
      }
    };
  };

  const addAxisLabels = (xLabel: string, yLabel: string, zLabel?: string) => {
    if (!sceneRef.current) return;

    // Remove existing labels
    const existingLabels = sceneRef.current.children.filter(child => child.userData.isAxisLabel);
    existingLabels.forEach(label => sceneRef.current!.remove(label));

    // Create simple text sprites for axis labels
    const createTextSprite = (text: string, position: THREE.Vector3, color: number = 0xffffff) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return null;

      canvas.width = 256;
      canvas.height = 64;
      context.fillStyle = '#ffffff';
      context.font = '24px Arial';
      context.textAlign = 'center';
      context.fillText(text, 128, 40);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);
      sprite.position.copy(position);
      sprite.scale.set(2, 0.5, 1);
      sprite.userData.isAxisLabel = true;
      return sprite;
    };

    // Add X-axis label
    const xLabelSprite = createTextSprite(xLabel, new THREE.Vector3(12, -1, 0));
    if (xLabelSprite) sceneRef.current.add(xLabelSprite);

    // Add Y-axis label
    const yLabelSprite = createTextSprite(yLabel, new THREE.Vector3(-1, 12, 0));
    if (yLabelSprite) sceneRef.current.add(yLabelSprite);

    // Add Z-axis label if provided
    if (zLabel) {
      const zLabelSprite = createTextSprite(zLabel, new THREE.Vector3(0, -1, 12));
      if (zLabelSprite) sceneRef.current.add(zLabelSprite);
    }
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

    // Prefer a numeric index for X if Date is categorical
    let xCol = selectedColumns[0];
    const yCol = selectedColumns[1];
    const zCol = selectedColumns[2];

    if (!xCol || !yCol) return;

    // If X is Date (string), switch to date_index if exists
    if (xCol === 'Date' && columns.includes('date_index')) {
      xCol = 'date_index';
    }

    const xValues = filteredData.map(d => d[xCol]).filter(v => typeof v === 'number');
    const yValues = filteredData.map(d => d[yCol]).filter(v => typeof v === 'number');
    const zValues = zCol ? filteredData.map(d => d[zCol]).filter(v => typeof v === 'number') : [];
    
    if (xValues.length === 0 || yValues.length === 0) return;

    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMinRaw = Math.min(...yValues);
    const yMax = Math.max(...yValues);
    const yMin = yMinRaw;

    // Calculate Z range if we have Z values, otherwise use a default range
    let zMin = 0, zMax = 1, zRange = 1;
    if (zValues.length > 0) {
      zMin = Math.min(...zValues);
      zMax = Math.max(...zValues);
      zRange = zMax - zMin || 1;
    }

    const xRange = xMax - xMin || 1;
    const yRange = yMax - yMin || 1;

    // Normalize data to -10 to 10 range
    const normalizeX = (x: number) => ((x - xMin) / xRange) * 20 - 10;
    const normalizeY = (y: number) => ((y - yMin) / yRange) * 20 - 10;
    const normalizeZ = (z: number) => zValues.length > 0 ? ((z - zMin) / zRange) * 20 - 10 : 0;

    console.log('Creating', filteredData.length, 'data points');
    filteredData.forEach((row, index) => {
      const x = row[xCol];
      const y = row[yCol];
      const z = zCol ? row[zCol] : 0;
      
      if (typeof x !== 'number' || typeof y !== 'number') return;

      const geometry = new THREE.SphereGeometry(0.4, 6, 4);
      
      // White color for better performance
      const color = 0xffffff;

      const material = new THREE.MeshBasicMaterial({ color });
      const sphere = new THREE.Mesh(geometry, material);
      
      // Use actual Z position for true 3D positioning
      const zPos = zCol && typeof z === 'number' ? normalizeZ(z) : 0;
      sphere.position.set(normalizeX(x), normalizeY(y), zPos);
      sphere.userData.isDataPoint = true;
      sphere.userData.originalIndex = index;
      
      sceneRef.current!.add(sphere);
      
      if (index < 5) {
        console.log(`Point ${index}: x=${normalizeX(x).toFixed(2)}, y=${normalizeY(y).toFixed(2)}, z=${zPos.toFixed(2)}`);
      }
    });

    // Add axis labels
    addAxisLabels(xCol, yCol, zCol);

    // Set camera position for 3D view
    cameraRef.current!.position.set(15, 15, 15);
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

    let xCol = selectedColumns[0];
    const yCol = selectedColumns[1];

    if (!xCol || !yCol) return;
    if (xCol === 'Date' && columns.includes('date_index')) {
      xCol = 'date_index';
    }

    const sortedData = filteredData
      .filter(row => typeof row[xCol] === 'number' && typeof row[yCol] === 'number')
      .sort((a, b) => a[xCol] - b[xCol]);

    if (sortedData.length === 0) return;

    const xValues = sortedData.map(d => d[xCol]);
    const yValues = sortedData.map(d => d[yCol]);

    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMinRaw = Math.min(...yValues);
    const yMax = Math.max(...yValues);
    const yMin = yMinRaw;

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

    // Add axis labels
    addAxisLabels(xCol, yCol);

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

    let xCol = selectedColumns[0];
    const yCol = selectedColumns[1];
    const zCol = selectedColumns[2];

    if (!xCol || !yCol) return;
    if (xCol === 'Date' && columns.includes('date_index')) {
      xCol = 'date_index';
    }

    const xValues = filteredData.map(d => d[xCol]).filter(v => typeof v === 'number');
    const yValues = filteredData.map(d => d[yCol]).filter(v => typeof v === 'number');
    const zValues = zCol ? filteredData.map(d => d[zCol]).filter(v => typeof v === 'number') : [0];
    
    if (xValues.length === 0 || yValues.length === 0) return;

    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMinRaw = Math.min(...yValues);
    const yMax = Math.max(...yValues);
    const yMin = yMinRaw;
    const zMinRaw = zValues.length > 0 ? Math.min(...zValues) : 0;
    const zMin = zMinRaw;
    const zMax = zValues.length > 0 ? Math.max(...zValues) : 0;

    const xRange = xMax - xMin || 1;
    const yRange = yMax - yMin || 1;
    const zRange = zMax - zMin || 1;

    // Normalize data to -10 to 10 range
    const normalizeX = (x: number) => ((x - xMin) / xRange) * 20 - 10;
    const normalizeY = (y: number) => ((y - yMin) / yRange) * 20 - 10;
    const normalizeZ = (z: number) => ((z - zMin) / zRange) * 20 - 10;

    // Limit number of spheres for performance - much lower for animation
    const maxSpheres = 100;
    const dataToRender = filteredData.slice(0, maxSpheres);
    
    // Show warning if data is limited and enable performance mode
    if (filteredData.length > maxSpheres) {
      console.warn(`Performance: Limited 3D visualization to ${maxSpheres} points out of ${filteredData.length} total points`);
      setPerformanceMode(true);
    } else {
      setPerformanceMode(false);
    }
    
    // Create shared geometry for better performance - minimal polygons
    const geometry = new THREE.SphereGeometry(0.5, 6, 4);

    dataToRender.forEach((row, index) => {
      const x = row[xCol];
      const y = row[yCol];
      const z = zCol && typeof row[zCol] === 'number' ? row[zCol] : 0;
      
      if (typeof x !== 'number' || typeof y !== 'number') return;

      // White color for better performance
      const color = 0xffffff;

      const material = new THREE.MeshBasicMaterial({ color });
      const sphere = new THREE.Mesh(geometry, material);
      
      sphere.position.set(normalizeX(x), normalizeY(y), normalizeZ(z));
      sphere.userData.isData3D = true;
      sphere.userData.originalIndex = index;
      
      sceneRef.current!.add(sphere);
    });

    // Add axis labels
    addAxisLabels(xCol, yCol, zCol);

    // Set camera position for 3D view
    cameraRef.current!.position.set(15, 15, 15);
    cameraRef.current!.lookAt(0, 0, 0);
  };

  const create2DScatterPlot = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const filteredData = dataset.filter(row => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === '') return true;
        return row[key]?.toString().toLowerCase().includes(value.toString().toLowerCase());
      });
    });

    if (filteredData.length === 0) return;

    let xCol = selectedColumns[0];
    const yCol = selectedColumns[1];

    if (!xCol || !yCol) return;
    if (xCol === 'Date' && columns.includes('date_index')) {
      xCol = 'date_index';
    }

    const xValues = filteredData.map(d => d[xCol]).filter(v => typeof v === 'number');
    const yValues = filteredData.map(d => d[yCol]).filter(v => typeof v === 'number');

    if (xValues.length === 0 || yValues.length === 0) return;

    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    const padding = 50;
    const plotWidth = canvas.width - 2 * padding;
    const plotHeight = canvas.height - 2 * padding;

    // Draw axes
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Draw grid lines
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 10; i++) {
      const x = padding + (i / 10) * plotWidth;
      const y = padding + (i / 10) * plotHeight;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, canvas.height - padding);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.stroke();
    }

    // Draw data points as circles
    ctx.fillStyle = '#8b5cf6';
    xValues.forEach((x, i) => {
      if (i < yValues.length) {
        const plotX = padding + ((x - minX) / (maxX - minX)) * plotWidth;
        const plotY = canvas.height - padding - ((yValues[i] - minY) / (maxY - minY)) * plotHeight;
        
        ctx.beginPath();
        ctx.arc(plotX, plotY, 4, 0, 2 * Math.PI);
        ctx.fill();
      }
    });

    // Draw title
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('2D Scatter Plot', canvas.width / 2, 25);
    
    // Draw axis labels
    ctx.fillStyle = '#fff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(xCol, canvas.width - padding - 10, canvas.height - 10);
    ctx.save();
    ctx.translate(15, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText(yCol, 0, 0);
    ctx.restore();
    
    // Draw data count
    ctx.fillStyle = '#888';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`${filteredData.length} data points`, padding, canvas.height - 10);
  };

  const create2DLinePlot = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const filteredData = dataset.filter(row => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === '') return true;
        return row[key]?.toString().toLowerCase().includes(value.toString().toLowerCase());
      });
    });

    if (filteredData.length === 0) return;

    let xCol = selectedColumns[0];
    const yCol = selectedColumns[1];

    if (!xCol || !yCol) return;
    if (xCol === 'Date' && columns.includes('date_index')) {
      xCol = 'date_index';
    }

    const sortedData = filteredData
      .filter(row => typeof row[xCol] === 'number' && typeof row[yCol] === 'number')
      .sort((a, b) => a[xCol] - b[xCol]);

    if (sortedData.length === 0) return;

    const xValues = sortedData.map(d => d[xCol]);
    const yValues = sortedData.map(d => d[yCol]);

    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    const padding = 50;
    const plotWidth = canvas.width - 2 * padding;
    const plotHeight = canvas.height - 2 * padding;

    // Draw axes
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Draw grid lines
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 10; i++) {
      const x = padding + (i / 10) * plotWidth;
      const y = padding + (i / 10) * plotHeight;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, canvas.height - padding);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.stroke();
    }

    // Draw line
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    xValues.forEach((x, i) => {
      if (i < yValues.length) {
        const plotX = padding + ((x - minX) / (maxX - minX)) * plotWidth;
        const plotY = canvas.height - padding - ((yValues[i] - minY) / (maxY - minY)) * plotHeight;
        
        if (i === 0) {
          ctx.moveTo(plotX, plotY);
        } else {
          ctx.lineTo(plotX, plotY);
        }
      }
    });
    ctx.stroke();

    // Draw data points
    ctx.fillStyle = '#8b5cf6';
    xValues.forEach((x, i) => {
      if (i < yValues.length) {
        const plotX = padding + ((x - minX) / (maxX - minX)) * plotWidth;
        const plotY = canvas.height - padding - ((yValues[i] - minY) / (maxY - minY)) * plotHeight;
        
        ctx.beginPath();
        ctx.arc(plotX, plotY, 3, 0, 2 * Math.PI);
        ctx.fill();
      }
    });

    // Draw title
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('2D Line Plot', canvas.width / 2, 25);
    
    // Draw axis labels
    ctx.fillStyle = '#fff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(xCol, canvas.width - padding - 10, canvas.height - 10);
    ctx.save();
    ctx.translate(15, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText(yCol, 0, 0);
    ctx.restore();
    
    // Draw data count
    ctx.fillStyle = '#888';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`${filteredData.length} data points`, padding, canvas.height - 10);
  };

  const animate = useCallback(() => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

    // Only animate if animation is enabled and not in performance mode
    if (isAnimating && !performanceMode) {
      // Rotate camera around the data - simplified
      const time = Date.now() * 0.001;
      const radius = 20;
      cameraRef.current.position.x = Math.cos(time * 0.3) * radius;
      cameraRef.current.position.z = Math.sin(time * 0.3) * radius;
      cameraRef.current.lookAt(0, 0, 0);

      // Animate data points - much more efficient
      const dataPoints = sceneRef.current.children.filter(child => 
        child.userData.isData3D // Only animate 3D points
      );
      
      // Batch update positions for better performance
      dataPoints.forEach((point, index) => {
        if (point.userData.originalY === undefined) {
          point.userData.originalY = point.position.y;
        }
        // Simpler animation with less calculation
        point.position.y = point.userData.originalY + Math.sin(time * 2 + index * 0.2) * 0.3;
      });
    }

    // Render the scene
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    
    // Only continue animation loop if we're actually animating
    if (isAnimating) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [isAnimating, performanceMode]);

  // Reset original positions when data changes
  const resetOriginalPositions = useCallback(() => {
    if (!sceneRef.current) return;
    const dataPoints = sceneRef.current.children.filter(child => 
      child.userData.isDataPoint || child.userData.isData3D
    );
    dataPoints.forEach(point => {
      point.userData.originalY = undefined; // Reset so it gets recalculated
    });
  }, []);

  // Reset positions when dataset changes
  useEffect(() => {
    resetOriginalPositions();
  }, [dataset, resetOriginalPositions]);

  // Handle animation start/stop
  useEffect(() => {
    if (is3D && rendererRef.current && sceneRef.current && cameraRef.current) {
      // Cancel existing animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
      
      if (isAnimating) {
        // Start animation loop
        animate();
      } else {
        // Just render once when not animating
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    }
  }, [isAnimating, animate, is3D]);

  // Initialize Three.js only for 3D mode
  useEffect(() => {
    if (is3D) {
      // Clean up any existing 2D context
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
      
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
    } else {
      // For 2D mode, clean up Three.js resources
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      if (sceneRef.current) {
        sceneRef.current = null;
      }
      if (cameraRef.current) {
        cameraRef.current = null;
      }
      
      // Clear canvas and render 2D plot
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        // Force clear the canvas
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
      
      // Immediately render 2D plot based on current visualization type
      if (dataset.length > 0) {
        switch (visualizationType) {
          case 'scatter':
            create2DScatterPlot();
            break;
          case 'line':
            create2DLinePlot();
            break;
          case '3d':
            create2DScatterPlot(); // For 2D mode, 3D scatter becomes 2D scatter
            break;
        }
      }
    }
  }, [is3D, dataset, visualizationType]);

  // Update visualization when data changes
  useEffect(() => {
    if (dataset.length === 0) return;

    if (is3D) {
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
    } else {
      // 2D mode - use different 2D visualizations based on type
      switch (visualizationType) {
        case 'scatter':
          create2DScatterPlot();
          break;
        case 'line':
          create2DLinePlot();
          break;
        case '3d':
          create2DScatterPlot(); // For 2D mode, 3D scatter becomes 2D scatter
          break;
      }
    }
  }, [dataset, selectedColumns, visualizationType, filters, is3D]);

  // Animation state is now handled within the animate function


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

          {/* 2D/3D Toggle */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">View Mode</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setIs3D(false);
                  // Ensure we have at least 2 columns for 2D mode
                  if (selectedColumns.length < 2 && columns.length >= 2) {
                    const newYColumn = columns[1]; // Select the second column as Y
                    if (!selectedColumns.includes(newYColumn)) {
                      setSelectedColumns(prev => [...prev, newYColumn]);
                    }
                  }
                }}
                className={`flex-1 p-2 rounded text-sm transition-colors ${
                  !is3D
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                2D
              </button>
              <button
                onClick={() => {
                  setIs3D(true);
                  // Auto-select Z column for 3D mode
                  if (selectedColumns.length < 3 && columns.length >= 3) {
                    const newZColumn = columns[2]; // Select the third column as Z
                    if (!selectedColumns.includes(newZColumn)) {
                      setSelectedColumns(prev => [...prev, newZColumn]);
                    }
                  }
                }}
                className={`flex-1 p-2 rounded text-sm transition-colors ${
                  is3D
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                3D
              </button>
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

          {/* Visualization */}
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                {is3D ? (
                  visualizationType === 'scatter' ? '3D Scatter Plot' : 
                  visualizationType === 'line' ? '3D Line Plot' : '3D Scatter Plot'
                ) : (
                  visualizationType === 'scatter' ? '2D Scatter Plot' : 
                  visualizationType === 'line' ? '2D Line Plot' : '2D Scatter Plot'
                )}
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
                width={800}
                height={500}
              />
            </div>
            
            <div className="mt-4 p-3 bg-gray-700/50 rounded text-xs text-gray-400">
              <div className="font-semibold mb-1">{is3D ? '3D Controls:' : '2D Plot:'}</div>
              {is3D ? (
                <>
                  <div>• Mouse: Rotate view</div>
                  <div>• Scroll: Zoom in/out</div>
                  <div>• Right click + drag: Pan</div>
                </>
              ) : (
                <div>• Static 2D visualization with automatic scaling</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
