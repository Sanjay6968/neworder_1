import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'date', headerName: 'Date', flex: 1 },
  { field: 'company', headerName: 'Company', flex: 1 },
  { field: 'customer', headerName: 'Customer', flex: 1 },
  { field: 'reference', headerName: 'Reference', flex: 1 },
  { field: 'paid', headerName: 'Paid', flex: 1 },
  { field: 'due', headerName: 'Due', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 1 },
];

const rows = [
  { id: 1, date: '2023-01-01', company: 'Maker Global', customer: 'Kamal', reference: 'INV1001', paid: '5000', due: '0', status: 'Paid' },
  { id: 2, date: '2023-01-15', company: 'Skyroot', customer: 'Pawan Kumar', reference: 'INV1002', paid: '3000', due: '2000', status: 'Partial' },
];

export default function TableFinancials() {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </div>
    );
}
