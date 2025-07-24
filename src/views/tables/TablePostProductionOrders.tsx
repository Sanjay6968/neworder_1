import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Chip } from '@mui/material';
import PostProductionOrderDetailsDialog from 'src/pages/post-production/orders/PostProductionOrdersDetailDialog';

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
    price: number;
    delivery_type: string;
    status: string;
}

const columns: GridColDef[] = [
    { field: 'orderId', headerName: 'Order ID', flex: 1 },
    { field: 'customer', headerName: 'Customer Name', flex: 1 },
    { field: 'phone', headerName: 'Mobile No.', flex: 1 },
    { field: 'price', headerName: 'Final Amount', flex: 1 },
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
];

export default function DataTable() {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_MEKUVA_BACKEND_API_BASE_URL}/api/private/orders`);
                const data: ApiOrder[] = await response.json();
                const mappedOrders: Order[] = data.map((order: ApiOrder) => ({
                    id: order.orderId,
                    orderId: order.orderId,
                    customer: order.name || 'N/A',
                    phone: order.mobileNo || 'N/A',
                    price: order.totalFinalAmount || 0,
                    delivery_type: order.deliveryType || 'N/A',
                    status: order.status,
                }));

                setOrders(mappedOrders);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleRowClick = (params: GridRowParams) => {
        setSelectedOrderId(params.row.id);
        
        setDialogOpen(true);
    };

    const updateOrderStatus = (id: string, newStatus: string) => {
        // Implement the logic to update the order status
        // This function should ideally make an API call to update the status in the backend
        // For now, it just updates the state locally
        setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
    };

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
                <PostProductionOrderDetailsDialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    orderId={selectedOrderId}
                    updateOrderStatus={updateOrderStatus}
                />
            )}
        </div>
    );
}
  