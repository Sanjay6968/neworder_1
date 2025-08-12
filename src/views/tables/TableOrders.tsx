import React, { useState } from 'react';
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
            const data = await response.json();
            setSelectedOrderNotes(data.statusNotes);
            setNotesDialogOpen(true);
        } catch (error) {
            console.error('Error fetching notes:', error);
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
                const statusColors: { [key: string]: 'error' | 'success' | 'warning' | 'info' } = {
                    confirmed: 'warning',
                    printingScheduled: 'info',
                    inProduction: 'info',
                    postProcessing: 'info',
                    dispatch: 'info',
                    shipped: 'success',
                    cancelled: 'error',
                };
                const color = statusColors[params.value.toLowerCase() as keyof typeof statusColors] || 'default';

                return <Chip label={params.value} color={color} />;
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
                checkboxSelection
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

interface TableOrdersProps {
    orders: Order[];
    updateOrderStatus: (id: string, newStatus: string) => void;
}

export default DataTable;
