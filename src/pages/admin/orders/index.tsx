import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
import AutorenewIcon from 'mdi-material-ui/Autorenew';

import TableOrders from 'src/views/tables/TableOrders';
import ManualOrderDialog from 'src/pages/admin/orders/ManualOrderDialog';

interface Order {
  id: string;
  orderId: string;
  customer: string;
  phone: string;
  totalFinalAmount: number;
  delivery_type: string;
  status: string;
}

const Orders = () => {
  const [manualOrderDialogOpen, setManualOrderDialogOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleOpenManualOrderDialog = () => setManualOrderDialogOpen(true);
  const handleCloseManualOrderDialog = () => setManualOrderDialogOpen(false);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_MEKUVA_BACKEND_API_BASE_URL}/api/private/orders`);
      if (!response.ok) throw new Error(`Failed to fetch orders: ${response.statusText}`);

      const data = await response.json();

      const mappedOrders = data.map((order: any) => ({
        id: order.orderId,
        orderId: order.orderId,
        customer: order.name || 'N/A',
        phone: order.mobileNo || 'N/A',
        totalFinalAmount: order.totalFinalAmount || 0,
        delivery_type: order.deliveryType || 'N/A',
        status: order.status,
      }));

      setOrders(mappedOrders);
    } catch (error: any) {
      setError(error.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = (id: string, newStatus: string) => {
    setOrders(prevOrders =>
      prevOrders.map(order => (order.id === id ? { ...order, status: newStatus } : order))
    );
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant="h5">
          <Link>Orders</Link>
        </Typography>
        <Typography variant="body2">You can find all orders here</Typography>
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleOpenManualOrderDialog}>
          Create Manual Order
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>Latest Orders</span>
                <IconButton onClick={fetchOrders} color="secondary" disabled={loading}>
                  <AutorenewIcon />
                </IconButton>
              </div>
            }
            titleTypographyProps={{ variant: 'h6' }}
          />

          {loading ? (
            <Typography sx={{ p: 4 }}>Loading orders...</Typography>
          ) : error ? (
            <Typography color="error" sx={{ p: 4 }}>
              {error}
            </Typography>
          ) : orders.length === 0 ? (
            <Typography sx={{ p: 4 }}>No orders found.</Typography>
          ) : (
            <TableOrders orders={orders} updateOrderStatus={updateOrderStatus} />
          )}
        </Card>
      </Grid>

      <ManualOrderDialog open={manualOrderDialogOpen} onClose={handleCloseManualOrderDialog} />
    </Grid>
  );
};

export default Orders;
