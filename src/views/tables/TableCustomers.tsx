import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import CustomerDetailsDialog from '../../pages/customers/CustomerDetailsDialog';

const columns: GridColDef[] = [
  { field: 'companyName', headerName: 'Company Name', flex: 1 },
  { field: 'contactPerson', headerName: 'Contact Person Name', flex: 1 },
  { field: 'email', headerName: 'Email', flex: 1 },
  { field: 'phone', headerName: 'Phone', flex: 1 },
];

const rows = [
  { id: 1, companyName: 'Maker Global', contactPerson: 'Kamal', email: 'kamal@gmail.com', phone: '1234567890', address: '203, Imperial Plaza, Punjagutta' },
  { id: 2, companyName: 'Skyroot', contactPerson: 'Pawan Kumar', email: 'pawan@gmail.com', phone: '0987654321', address: 'Hive Space, Kondapur' },
];

export default function TableCustomers() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    
    const handleRowClick = (params: GridRowParams) => {
        setSelectedCustomer(params.row);
        
        setDialogOpen(true);
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                disableRowSelectionOnClick
                onRowClick={handleRowClick}
            />
            {selectedCustomer && (
                <CustomerDetailsDialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    customer={selectedCustomer}
                />
            )}
        </div>
    );
}
