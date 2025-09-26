"use client";

import { useState, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Upload, 
  Download, 
  Filter, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X,
  Search,
  Calculator
} from "lucide-react";
import * as XLSX from 'xlsx';

// Types
interface DataRow {
  [key: string]: any;
  _id?: string;
}

interface ComputedField {
  id: string;
  name: string;
  formula: string;
  enabled: boolean;
}

interface FilterState {
  column: string;
  operator: string;
  value: string;
}

// Main Component
export default function DatasetEditor() {
  // State
  const [data, setData] = useState<DataRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [editingCell, setEditingCell] = useState<{row: number, col: string} | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [filters, setFilters] = useState<FilterState[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [computedFields, setComputedFields] = useState<ComputedField[]>([]);
  const [showComputedBuilder, setShowComputedBuilder] = useState(false);
  const [newComputedField, setNewComputedField] = useState({ name: "", formula: "" });
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Computed data with filters and computed fields
  const processedData = useMemo(() => {
    let result = [...data];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(row => 
        Object.values(row).some(value => 
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply column filters
    filters.forEach(filter => {
      if (filter.column && filter.operator && filter.value) {
        result = result.filter(row => {
          const cellValue = row[filter.column];
          const filterValue = filter.value;
          
          switch (filter.operator) {
            case 'equals':
              return String(cellValue) === filterValue;
            case 'contains':
              return String(cellValue).toLowerCase().includes(filterValue.toLowerCase());
            case 'greater':
              return Number(cellValue) > Number(filterValue);
            case 'less':
              return Number(cellValue) < Number(filterValue);
            default:
              return true;
          }
        });
      }
    });

    // Apply computed fields
    computedFields.forEach(field => {
      if (field.enabled && field.formula) {
        result = result.map(row => {
          try {
            const computedValue = evaluateFormula(field.formula, row);
            return { ...row, [field.name]: computedValue };
          } catch (error) {
            return { ...row, [field.name]: 'Error' };
          }
        });
      }
    });

    return result;
  }, [data, searchTerm, filters, computedFields]);

  // Formula evaluator
  const evaluateFormula = (formula: string, row: DataRow): any => {
    // Simple formula evaluator - replace column names with values
    let expression = formula;
    
    // Replace column references with actual values
    Object.keys(row).forEach(col => {
      const value = row[col];
      const regex = new RegExp(`\\b${col}\\b`, 'g');
      if (typeof value === 'number') {
        expression = expression.replace(regex, value.toString());
      } else {
        expression = expression.replace(regex, '0');
      }
    });

    // Basic math operations
    try {
      // Replace common operators
      expression = expression
        .replace(/\+\+/g, '+')
        .replace(/--/g, '-')
        .replace(/\*\*/g, '*')
        .replace(/\/\//g, '/');

      // Evaluate safely
      return eval(expression);
    } catch (error) {
      return 'Error';
    }
  };

  // File upload handler
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    // Basic file validation
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File too large. Please upload files smaller than 10MB.');
      setIsUploading(false);
      return;
    }

    try {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      
      if (!fileExtension || !['csv', 'xlsx', 'xls'].includes(fileExtension)) {
        alert('Unsupported file format. Please upload CSV or Excel files (.csv, .xlsx, .xls).');
        setIsUploading(false);
        return;
      }
      
      if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        // Handle Excel files with improved parsing
        const arrayBuffer = await file.arrayBuffer();
        
        try {
          const workbook = XLSX.read(arrayBuffer, { 
            type: 'array',
            cellDates: true,
            cellNF: false,
            cellText: false,
            raw: false
          });
          
          if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
            alert('No worksheets found in the Excel file');
            return;
          }
          
          // Try to find the first worksheet with data
          let worksheet = null;
          let sheetName = '';
          
          for (const name of workbook.SheetNames) {
            const ws = workbook.Sheets[name];
            const range = XLSX.utils.decode_range(ws['!ref'] || 'A1:A1');
            if (range.e.r > 0 || range.e.c > 0) {
              worksheet = ws;
              sheetName = name;
              break;
            }
          }
          
          if (!worksheet) {
            alert('No data found in any worksheet');
            return;
          }
          
          // Convert to JSON with better options
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
            header: 1,
            defval: '',
            blankrows: false,
            raw: false
          });
          
          if (jsonData.length === 0) {
            alert('Empty worksheet');
            return;
          }
          
          // Find the first row with actual data (skip empty rows)
          let dataStartIndex = 0;
          for (let i = 0; i < jsonData.length; i++) {
            const row = jsonData[i] as any[];
            if (row.some(cell => cell !== undefined && cell !== null && cell !== '')) {
              dataStartIndex = i;
              break;
            }
          }
          
          const headers = (jsonData[dataStartIndex] as any[])
            .map(h => String(h || '').trim())
            .filter(h => h !== '');
          
          if (headers.length === 0) {
            alert('No valid headers found in the Excel file');
            return;
          }
          
          const newData = (jsonData.slice(dataStartIndex + 1) as any[][])
            .filter(row => row.some(cell => cell !== undefined && cell !== null && cell !== ''))
            .map((row, index) => {
              const dataRow: DataRow = { _id: `row_${index}` };
              headers.forEach((header, i) => {
                const value = row[i];
                if (value !== undefined && value !== null && value !== '') {
                  // Try to parse as number first
                  const numValue = Number(value);
                  if (!isNaN(numValue) && isFinite(numValue)) {
                    dataRow[header] = numValue;
                  } else {
                    // Keep as string, but clean it up
                    dataRow[header] = String(value).trim();
                  }
                } else {
                  dataRow[header] = '';
                }
              });
              return dataRow;
            });

          setData(newData);
          setColumns(headers);
          
        } catch (excelError) {
          console.error('Excel parsing error:', excelError);
          alert('Error parsing Excel file. The file may be corrupted or contain unsupported formatting. Please try a simpler Excel file or convert to CSV.');
          setIsUploading(false);
          return;
        }
      } else if (fileExtension === 'csv') {
        // Handle CSV files
        const text = await file.text();
        const lines = text.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim());
        
        const newData = lines.slice(1).map((line, index) => {
          const values = line.split(',');
          const row: DataRow = { _id: `row_${index}` };
          headers.forEach((header, i) => {
            const value = values[i] || '';
            const numValue = Number(value);
            row[header] = !isNaN(numValue) ? numValue : value;
          });
          return row;
        });

        setData(newData);
        setColumns(headers);
      } else {
        alert('Unsupported file format. Please upload CSV or Excel files.');
        return;
      }

      setFilters([]);
      setSearchTerm('');
      setComputedFields([]);
    } catch (error) {
      console.error('Error parsing file:', error);
      alert('Error parsing file. Please check the file format.');
    } finally {
      setIsUploading(false);
    }
  };

  // Cell editing
  const startEditing = (rowIndex: number, column: string) => {
    setEditingCell({ row: rowIndex, col: column });
    setEditValue(String(processedData[rowIndex][column] || ''));
  };

  const saveEdit = () => {
    if (editingCell) {
      const newData = [...data];
      const originalIndex = data.findIndex(row => row._id === processedData[editingCell.row]._id);
      if (originalIndex !== -1) {
        newData[originalIndex][editingCell.col] = editValue;
        setData(newData);
      }
      setEditingCell(null);
      setEditValue('');
    }
  };

  const cancelEdit = () => {
    setEditingCell(null);
    setEditValue('');
  };

  // Filter management
  const addFilter = () => {
    setFilters([...filters, { column: '', operator: 'equals', value: '' }]);
  };

  const updateFilter = (index: number, field: keyof FilterState, value: string) => {
    const newFilters = [...filters];
    newFilters[index][field] = value;
    setFilters(newFilters);
  };

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  // Computed field management
  const addComputedField = () => {
    if (newComputedField.name && newComputedField.formula) {
      setComputedFields([...computedFields, {
        id: `field_${Date.now()}`,
        name: newComputedField.name,
        formula: newComputedField.formula,
        enabled: true
      }]);
      setNewComputedField({ name: "", formula: "" });
      setShowComputedBuilder(false);
    }
  };

  const toggleComputedField = (id: string) => {
    setComputedFields(computedFields.map(field => 
      field.id === id ? { ...field, enabled: !field.enabled } : field
    ));
  };

  const removeComputedField = (id: string) => {
    setComputedFields(computedFields.filter(field => field.id !== id));
  };

  // Export functionality
  const exportToCSV = () => {
    if (processedData.length === 0) return;

    const allColumns = [...columns, ...computedFields.map(f => f.name)];
    const csvContent = [
      allColumns.join(','),
      ...processedData.map(row => 
        allColumns.map(col => {
          const value = row[col];
          return typeof value === 'string' ? `"${value}"` : value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dataset.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-[90vh] text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Dataset Editor</h2>
          <p className="text-gray-400">Upload, edit, filter, and export your datasets</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            {/* Upload */}
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Upload Data</h3>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full bg-[#1877F2] hover:bg-[#145db2] disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                <Upload className="w-4 h-4 mr-2" />
                {isUploading ? 'Processing...' : 'Upload CSV/Excel'}
              </Button>
              {data.length > 0 && (
                <div className="mt-3 text-sm text-gray-400">
                  <div>Rows: {data.length}</div>
                  <div>Columns: {columns.length}</div>
                </div>
              )}
            </div>

            {/* Search */}
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search all columns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">Filters</h3>
                <Button
                  onClick={addFilter}
                  size="sm"
                  className="bg-gray-700 hover:bg-gray-600"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-3">
                {filters.map((filter, index) => (
                  <div key={index} className="bg-gray-700/50 rounded p-3">
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <select
                        value={filter.column}
                        onChange={(e) => updateFilter(index, 'column', e.target.value)}
                        className="bg-gray-600 border-gray-500 rounded px-2 py-1 text-sm"
                      >
                        <option value="">Column</option>
                        {columns.map(col => (
                          <option key={col} value={col}>{col}</option>
                        ))}
                      </select>
                      <select
                        value={filter.operator}
                        onChange={(e) => updateFilter(index, 'operator', e.target.value)}
                        className="bg-gray-600 border-gray-500 rounded px-2 py-1 text-sm"
                      >
                        <option value="equals">Equals</option>
                        <option value="contains">Contains</option>
                        <option value="greater">Greater</option>
                        <option value="less">Less</option>
                      </select>
                      <Button
                        onClick={() => removeFilter(index)}
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 p-1"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                    <Input
                      placeholder="Filter value"
                      value={filter.value}
                      onChange={(e) => updateFilter(index, 'value', e.target.value)}
                      className="bg-gray-600 border-gray-500 text-white text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Computed Fields */}
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">Computed Fields</h3>
                <Button
                  onClick={() => setShowComputedBuilder(true)}
                  size="sm"
                  className="bg-[#1877F2] hover:bg-[#145db2]"
                >
                  <Calculator className="w-4 h-4" />
                </Button>
              </div>
              
              {showComputedBuilder && (
                <div className="bg-gray-700/50 rounded p-3 mb-3">
                  <Input
                    placeholder="Field name"
                    value={newComputedField.name}
                    onChange={(e) => setNewComputedField({...newComputedField, name: e.target.value})}
                    className="mb-2 bg-gray-600 border-gray-500 text-white"
                  />
                  <Input
                    placeholder="Formula (e.g., colA + colB)"
                    value={newComputedField.formula}
                    onChange={(e) => setNewComputedField({...newComputedField, formula: e.target.value})}
                    className="mb-2 bg-gray-600 border-gray-500 text-white"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={addComputedField}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Save className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                    <Button
                      onClick={() => setShowComputedBuilder(false)}
                      size="sm"
                      className="bg-gray-600 hover:bg-gray-700"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {computedFields.map(field => (
                  <div key={field.id} className="bg-gray-700/50 rounded p-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.enabled}
                        onChange={() => toggleComputedField(field.id)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-white">{field.name}</span>
                    </div>
                    <Button
                      onClick={() => removeComputedField(field.id)}
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 p-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Export */}
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Export</h3>
              <Button
                onClick={exportToCSV}
                disabled={processedData.length === 0}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>

          {/* Right Panel - Data Table */}
          <div className="lg:col-span-3">
            {data.length === 0 ? (
              <div className="bg-gray-800/50 rounded-lg p-8 text-center">
                <h3 className="text-lg font-semibold text-white mb-2">No Data</h3>
                <p className="text-gray-400">Upload a CSV or Excel file to get started</p>
              </div>
            ) : (
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    Data Table ({processedData.length} rows)
                  </h3>
                  <div className="text-sm text-gray-400">
                    Click cells to edit
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        {[...columns, ...computedFields.map(f => f.name)].map(col => (
                          <th key={col} className="text-left p-2 text-gray-300 font-semibold">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {processedData.map((row, rowIndex) => (
                        <tr key={row._id || rowIndex} className="border-b border-gray-700">
                          {[...columns, ...computedFields.map(f => f.name)].map(col => (
                            <td key={col} className="p-2">
                              {editingCell?.row === rowIndex && editingCell?.col === col ? (
                                <div className="flex items-center gap-2">
                                  <Input
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="bg-gray-600 border-gray-500 text-white text-sm"
                                    autoFocus
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') saveEdit();
                                      if (e.key === 'Escape') cancelEdit();
                                    }}
                                  />
                                  <Button
                                    onClick={saveEdit}
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700 p-1"
                                  >
                                    <Save className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    onClick={cancelEdit}
                                    size="sm"
                                    className="bg-gray-600 hover:bg-gray-700 p-1"
                                  >
                                    <X className="w-3 h-3" />
                                  </Button>
                                </div>
                              ) : (
                                <div
                                  className="cursor-pointer hover:bg-gray-700/50 p-1 rounded"
                                  onClick={() => startEditing(rowIndex, col)}
                                >
                                  {row[col] !== undefined ? String(row[col]) : ''}
                                </div>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
