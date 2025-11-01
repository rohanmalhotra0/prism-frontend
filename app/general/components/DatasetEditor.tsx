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
  const [showFilterBuilder, setShowFilterBuilder] = useState(false);
  const [newComputedField, setNewComputedField] = useState({ name: "", formula: "" });
  const [newFilter, setNewFilter] = useState({ column: "", operator: "equals", value: "" });
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

  // Calculate optimal column widths
  const columnWidths = useMemo(() => {
    const widths: { [key: string]: number } = {};
    
    [...columns, ...computedFields.map(f => f.name)].forEach(col => {
      // Start with header width
      let maxWidth = col.length * 8 + 20; // Approximate character width
      
      // Check data content for this column
      processedData.forEach(row => {
        const value = String(row[col] || '');
        const valueWidth = value.length * 8 + 20;
        maxWidth = Math.max(maxWidth, valueWidth);
      });
      
      // Set reasonable bounds
      widths[col] = Math.min(Math.max(maxWidth, 120), 400);
    });
    
    return widths;
  }, [columns, computedFields, processedData]);

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
    setShowFilterBuilder(true);
  };

  const addNewFilter = () => {
    if (newFilter.column && newFilter.value) {
      setFilters([...filters, { ...newFilter }]);
      setNewFilter({ column: "", operator: "equals", value: "" });
      setShowFilterBuilder(false);
    }
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Google Sheets-like Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Dataset Editor</h1>
            {data.length > 0 && (
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span>{processedData.length} rows</span>
                <span>{columns.length} columns</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {/* Upload Button */}
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
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium"
            >
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? 'Processing...' : 'Upload File'}
            </Button>

            {/* Export Button */}
            <Button
              onClick={exportToCSV}
              disabled={processedData.length === 0}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium disabled:opacity-60"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      {data.length > 0 && (
        <div className="bg-card border-b border-border px-6 py-3">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search data..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input border-input text-foreground w-64"
              />
            </div>

            {/* Filter Button */}
            <Button
              onClick={addFilter}
              className="bg-muted hover:bg-muted/80 text-foreground px-3 py-2 rounded-md text-sm"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>

            {/* Computed Fields Button */}
            <Button
              onClick={() => setShowComputedBuilder(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-2 rounded-md text-sm"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Add Formula
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No Data</h3>
              <p className="text-muted-foreground mb-4">Upload a CSV or Excel file to get started</p>
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-md"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload File
              </Button>
            </div>
          </div>
        ) : (
          <div className="h-full overflow-auto">
            {/* Google Sheets-like Table */}
            <div className="relative min-w-full">
              {/* Column Headers */}
              <div className="sticky top-0 z-10 bg-card border-b border-border">
                <div className="flex min-w-max">
                  {[...columns, ...computedFields.map(f => f.name)].map((col, colIndex) => (
                    <div
                      key={col}
                      className="px-3 py-3 border-r border-border bg-card text-sm font-semibold text-foreground flex-shrink-0"
                      style={{
                        width: `${columnWidths[col] || 150}px`,
                        minWidth: '120px'
                      }}
                    >
                      {col}
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Rows */}
              <div className="bg-background">
                {processedData.map((row, rowIndex) => (
                  <div
                    key={row._id || rowIndex}
                    className={`flex min-w-max border-b border-border hover:bg-muted/60 ${
                      rowIndex % 2 === 0 ? 'bg-background' : 'bg-muted/40'
                    }`}
                  >
                    {[...columns, ...computedFields.map(f => f.name)].map((col, colIndex) => (
                      <div
                        key={col}
                        className="px-3 py-2 border-r border-border text-sm text-foreground relative group flex-shrink-0"
                        style={{
                          width: `${columnWidths[col] || 150}px`,
                          minWidth: '120px'
                        }}
                      >
                        {editingCell?.row === rowIndex && editingCell?.col === col ? (
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="bg-input border-primary text-foreground text-sm h-8 w-full"
                            autoFocus
                            onBlur={saveEdit}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveEdit();
                              if (e.key === 'Escape') cancelEdit();
                            }}
                          />
                        ) : (
                          <div
                            className="cursor-pointer hover:bg-muted p-1 rounded min-h-[24px] flex items-center"
                            onClick={() => startEditing(rowIndex, col)}
                          >
                            {row[col] !== undefined ? String(row[col]) : ''}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filter Panel */}
      {filters.length > 0 && (
        <div className="bg-card border-t border-border p-4">
          <h3 className="text-sm font-semibold mb-3">Active Filters</h3>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter, index) => (
              <div key={index} className="bg-muted rounded-lg px-3 py-2 flex items-center gap-2">
                <span className="text-sm text-foreground">{filter.column}</span>
                <span className="text-sm text-muted-foreground">{filter.operator}</span>
                <span className="text-sm text-foreground">{filter.value}</span>
                <Button
                  onClick={() => removeFilter(index)}
                  size="sm"
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground p-1 h-5 w-5"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Computed Fields Panel */}
      {computedFields.length > 0 && (
        <div className="bg-card border-t border-border p-4">
          <h3 className="text-sm font-semibold mb-3">Computed Fields</h3>
          <div className="flex flex-wrap gap-2">
            {computedFields.map(field => (
              <div key={field.id} className="bg-muted rounded-lg px-3 py-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={field.enabled}
                  onChange={() => toggleComputedField(field.id)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-foreground">{field.name}</span>
                <span className="text-sm text-muted-foreground">= {field.formula}</span>
                <Button
                  onClick={() => removeComputedField(field.id)}
                  size="sm"
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground p-1 h-5 w-5"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter Builder Modal */}
      {showFilterBuilder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-96 border border-border">
            <h3 className="text-lg font-semibold mb-4">Add Filter</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Column</label>
                <select
                  value={newFilter.column}
                  onChange={(e) => setNewFilter({...newFilter, column: e.target.value})}
                  className="w-full bg-input border border-input text-foreground rounded-md px-3 py-2"
                >
                  <option value="">Select column</option>
                  {columns.map(col => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Operator</label>
                <select
                  value={newFilter.operator}
                  onChange={(e) => setNewFilter({...newFilter, operator: e.target.value})}
                  className="w-full bg-input border border-input text-foreground rounded-md px-3 py-2"
                >
                  <option value="equals">Equals</option>
                  <option value="contains">Contains</option>
                  <option value="greater">Greater than</option>
                  <option value="less">Less than</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Value</label>
                <Input
                  placeholder="Filter value"
                  value={newFilter.value}
                  onChange={(e) => setNewFilter({...newFilter, value: e.target.value})}
                  className="bg-input border-input text-foreground"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  onClick={() => setShowFilterBuilder(false)}
                  className="bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-md"
                >
                  Cancel
                </Button>
                <Button
                  onClick={addNewFilter}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md"
                >
                  Add Filter
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Computed Field Builder Modal */}
      {showComputedBuilder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-96 border border-border">
            <h3 className="text-lg font-semibold mb-4">Add Computed Field</h3>
            <div className="space-y-4">
              <Input
                placeholder="Field name"
                value={newComputedField.name}
                onChange={(e) => setNewComputedField({...newComputedField, name: e.target.value})}
                className="bg-input border-input text-foreground"
              />
              <Input
                placeholder="Formula (e.g., colA + colB)"
                value={newComputedField.formula}
                onChange={(e) => setNewComputedField({...newComputedField, formula: e.target.value})}
                className="bg-input border-input text-foreground"
              />
              <div className="flex gap-2 justify-end">
                <Button
                  onClick={() => setShowComputedBuilder(false)}
                  className="bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-md"
                >
                  Cancel
                </Button>
                <Button
                  onClick={addComputedField}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md"
                >
                  Add Field
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
