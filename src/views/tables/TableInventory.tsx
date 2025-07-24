import React, { useEffect, useState } from 'react'
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridSortModel
} from '@mui/x-data-grid'
import ItemDetailsDialog from '../../pages/inventory/ItemDetailsDialog'

const columns: GridColDef[] = [
  { field: 'sku', headerName: 'SKU', flex: 1 },
  { field: 'itemName', headerName: 'Item Name', flex: 1 },
  { field: 'category', headerName: 'Category/Type', flex: 1 },
  {
    field: 'quantityInStock',
    headerName: 'Quantity in Stock',
    flex: 1,
    type: 'number'
  },
  {
    field: 'reorderLevel',
    headerName: 'Reorder Level',
    flex: 1,
    type: 'number'
  },
  {
    field: 'pricePerUnit',
    headerName: 'Price per Unit',
    flex: 1,
    type: 'number',
    valueFormatter: ({ value }: { value?: number }) => {
      if (typeof value === 'number') {
        return `₹${value.toFixed(2)}`
      }
    }
  },
  { field: 'supplier', headerName: 'Supplier/Manufacturer', flex: 1 }
]

const rows = [
  {
    id: 1,
    sku: 'FILPLA1KG',
    itemName: 'PLA Filament 1kg',
    category: 'Filament',
    quantityInStock: 120,
    reorderLevel: 30,
    pricePerUnit: 899.99,
    supplier: 'SolidSpace'
  },
  {
    id: 2,
    sku: 'FILABS1500G',
    itemName: 'ABS Filament 1500g',
    category: 'Filament',
    quantityInStock: 80,
    reorderLevel: 20,
    pricePerUnit: 799.99,
    supplier: 'Sunlu'
  },
  {
    id: 3,
    sku: 'NOZZLE03',
    itemName: '0.3mm Nozzle',
    category: 'Printer Parts',
    quantityInStock: 200,
    reorderLevel: 50,
    pricePerUnit: 149.99,
    supplier: 'PartsPlus'
  },
  {
    id: 4,
    sku: 'HEATBEDMK3',
    itemName: 'MK3 Heat Bed',
    category: 'Printer Parts',
    quantityInStock: 50,
    reorderLevel: 10,
    pricePerUnit: 245.99,
    supplier: 'PartsPlus'
  },
  {
    id: 5,
    sku: 'PTFE-TUBE',
    itemName: 'PTFE Tube (1m)',
    category: 'Printer Parts',
    quantityInStock: 150,
    reorderLevel: 40,
    pricePerUnit: 299.99,
    supplier: 'TechParts'
  }
]

export default function TableInventory({ sortBy }: { sortBy: string }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [sortModel, setSortModel] = useState<GridSortModel>([])

  const handleRowClick = (params: GridRowParams) => {
    setSelectedItem(params.row)
    setDialogOpen(true)
  }

  // Update sort model when sortBy from props changes
  useEffect(() => {
    if (sortBy) {
      setSortModel([{ field: sortBy, sort: 'asc' }])
    } else {
      setSortModel([])
    }
  }, [sortBy])

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        onRowClick={handleRowClick}
        sortingOrder={['asc', 'desc']}
        sortModel={sortModel}
        onSortModelChange={newModel => setSortModel(newModel)}
      />

      {selectedItem && (
        <ItemDetailsDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          item={selectedItem}
          sortBy={sortBy}
        />
      )}
    </div>
  )
}
