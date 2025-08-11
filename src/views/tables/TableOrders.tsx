when i click on eye icon import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Chip, IconButton } from '@mui/material';
import EyeIcon from 'mdi-material-ui/Eye';
import OrderDetailsDialog from 'src/pages/admin/orders/OrderDetailsDialog';
import NotesDialog from 'src/pages/admin/orders/NotesDialog';

interface ApiOrder {
    orderId: string;
    name: string;
    mobileNo: string;
    deliveryType: string;
    totalFinalAmount: number;
    status: string;
}

interface Order {
    id: string;
    orderId: string;
    customer: string;
    phone: string; 
    totalFinalAmount: number;
    delivery_type: string;
    status: string;
}

interface TableOrdersProps {
    orders: Order[];
    updateOrderStatus: (id: string, newStatus: string) => void;
}

const DataTable = ({ orders, updateOrderStatus }: TableOrdersProps) => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [notesDialogOpen, setNotesDialogOpen] = useState<boolean>(false);
    const [selectedOrderNotes, setSelectedOrderNotes] = useState<any[]>([]);

    const handleRowClick = (params: GridRowParams) => {
        setSelectedOrderId(params.row.orderId);
        setDialogOpen(true);
    };

    const handleShowNotesClick = async (orderId: string, event: React.MouseEvent) => {
        event.stopPropagation();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_MEKUVA_BACKEND_API_BASE_URL}/api/private/orders/status-notes/${orderId}`);
            
            // Check if the response is successful
            if (!response.ok) {
                if (response.status === 401) {
                    console.error('Unauthorized: Please check your authentication token');
                    // You might want to redirect to login or refresh token here
                    alert('You are not authorized to view notes. Please log in again.');
                    return;
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            }

            // Check if the response is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Response is not JSON');
            }

            const data = await response.json();
            setSelectedOrderNotes(data.statusNotes || []);
            setNotesDialogOpen(true);
        } catch (error) {
            console.error('Error fetching notes:', error);
            
            // More user-friendly error handling
            if (error instanceof SyntaxError) {
                alert('Failed to load notes: Invalid server response');
            } else if (error instanceof TypeError) {
                alert('Failed to load notes: Network error');
            } else {
                alert('Failed to load notes: Please try again later');
            }
        }
    };

    const columns: GridColDef[] = [
        { field: 'orderId', headerName: 'Order ID', flex: 1 },
        { field: 'customer', headerName: 'Customer Name', flex: 1 },
        { field: 'phone', headerName: 'Mobile No.', flex: 1 },
        { field: 'totalFinalAmount', headerName: 'Final Amount', flex: 1 },
        { field: 'delivery_type', headerName: 'Delivery', flex: 1 },
        {
            field: 'status',
            headerName: 'Order Status',
            flex: 1,
            renderCell: (params) => {
                // Add null check to prevent errors
                const status = params.value;
                if (!status) {
                    return <Chip label="Unknown" color="default" />;
                }

                const statusColors: { [key: string]: 'error' | 'success' | 'warning' | 'info' } = {
                    confirmed: 'warning',
                    printingscheduled: 'info',
                    inproduction: 'info',
                    postprocessing: 'info',
                    dispatch: 'info',
                    shipped: 'success',
                    cancelled: 'error',
                };
                
                // Safe toLowerCase with null check
                const color = statusColors[status.toLowerCase()] || 'default';

                return <Chip label={status} color={color} />;
            },
        },
        {
            field: 'notes',
            headerName: 'Notes',
            flex: 1,
            renderCell: (params) => (
                <IconButton
                    color="secondary"
                    size="small"
                    onClick={(event) => handleShowNotesClick(params.row.orderId, event)}
                >
                    <EyeIcon />
                </IconButton>
            ),
        },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={orders}
                columns={columns}
                // Removed checkboxSelection to eliminate checkbox selection
                disableRowSelectionOnClick
                onRowClick={handleRowClick}
            />

            {selectedOrderId && (
                <OrderDetailsDialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    orderId={selectedOrderId}
                    updateOrderStatus={updateOrderStatus}
                />
            )}

            {notesDialogOpen && (
                <NotesDialog
                    open={notesDialogOpen}
                    onClose={() => setNotesDialogOpen(false)}
                    notes={selectedOrderNotes}
                />
            )}
        </div>
    );
};

export default DataTable;
