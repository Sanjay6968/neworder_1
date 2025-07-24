import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import AccountOutlineIcon from 'mdi-material-ui/AccountOutline';
import EmailOutlineIcon from 'mdi-material-ui/EmailOutline';
import PhoneOutlineIcon from 'mdi-material-ui/PhoneOutline';
import MapMarkerOutlineIcon from 'mdi-material-ui/MapMarkerOutline';
import TruckIcon from 'mdi-material-ui/Truck';
import DownloadIcon from 'mdi-material-ui/Download';
import IconButton from '@mui/material/IconButton';
import { CircularProgress, Grid, Typography, TextField, Card, CardContent, FormControl, useMediaQuery, useTheme, Switch, FormControlLabel } from '@mui/material';
import ColorBox from 'src/@core/layouts/components/shared-components/ColorBox';

const colorOptions = [
  { label: 'White', value: 'White', color: '#FFFFFF' },
  { label: 'Black', value: 'Black', color: '#000000' },
  { label: 'Grey', value: 'Grey', color: '#808080' },
  { label: 'Dark Grey', value: 'Dark Grey', color: '#A9A9A9' },
  { label: 'Silver', value: 'Silver', color: '#C0C0C0' },
  { label: 'Gold', value: 'Gold', color: '#FFD700' },
  { label: 'Skin', value: 'Skin', color: '#FFDAB9' },
  { label: 'Natural', value: 'Natural', color: '#F5DEB3' },
  { label: 'Brown', value: 'Brown', color: '#A52A2A' },
  { label: 'Pink', value: 'Pink', color: '#FFC0CB' },
  { label: 'Red', value: 'Red', color: '#FF0000' },
  { label: 'Orange', value: 'Orange', color: '#FFA500' },
  { label: 'Yellow', value: 'Yellow', color: '#FFFF00' },
  { label: 'Lime Green', value: 'Lime Green', color: '#32CD32' },
  { label: 'Green', value: 'Green', color: '#008000' },
  { label: 'Sky Blue', value: 'Sky Blue', color: '#87CEEB' },
  { label: 'Blue', value: 'Blue', color: '#0000FF' },
  { label: 'Purple', value: 'Purple', color: '#800080' },
  { label: 'Glow in Dark', value: 'Glow in Dark', color: '#FFFF00' },
  { label: 'Glitter Green', value: 'Glitter Green', color: '#008000' },
  { label: 'Rainbow', value: 'Rainbow', color: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)' },
  { label: 'Carbon Fiber', value: 'Carbon Fiber', color: '#333333' },
];

const getColorByLabel = (label: string) => {
  const colorOption = colorOptions.find(option => option.label === label);
  return colorOption ? colorOption.color : '#FFFFFF';
};

interface ApiOrderDetails {
  customization: {
    technology: string;
    material: string;
    colorFinish: string;
  };
  deliveryInstructions: {
    deliveryType: string;
    cname: string;
    address: string;
    pincode: string;
    expertAssistance: string;
    email: string;
    phone: string;
    shippingMethod: string;
  };
  dimensions: {
    breadth: number;
    height: number;
    length: number;
    volume: number;
  };
  printPrices: {
    unitProductionPrice: number;
    unitPostProductionPrice: number;
    subtotal: number;
    taxAmount: number;
    totalFinalAmount: number;
    shippingPrice: number;
  };
  _id: string;
  orderId: string;
  filePath: string;
  originalFileName: string;
  quantity: number;
  status: string;
  progress: string;
  tokenUsed: boolean;
  __v: number;
  uploadToken: string;
  statusNotes: string[];
  createdAt: string;
  updatedAt: string;
}

interface ProductionOrderDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  orderId: string;
  updateOrderStatus: (orderId: string, newStatus: string) => void;
}

const ProductionOrderDetailsDialog: React.FC<ProductionOrderDetailsDialogProps> = ({
  open,
  onClose,
  orderId,
  updateOrderStatus,
}) => {
  const [orderDetails, setOrderDetails] = useState<ApiOrderDetails | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_MEKUVA_BACKEND_API_BASE_URL}/api/private/orders/${orderId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: { order: ApiOrderDetails, thumbnailUrl: string, modelUrl: string } = await response.json();

        const validDate = isValidDate(data.order.createdAt) ? new Date(data.order.createdAt).toISOString() : 'Invalid date';

        data.order.createdAt = validDate;

        setOrderDetails(data.order);

        setThumbnailUrl(data.thumbnailUrl);

        setModelUrl(data.modelUrl);

        setStatus(data.order.status);
      } catch (error) {
        console.error('Failed to fetch order details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId && open) {
      fetchOrderDetails();
    }
  }, [orderId, open]);

  const isValidDate = (dateString: string) => {
    const date = new Date(dateString);

    return !isNaN(date.getTime());
  };

  const handleStatusToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = event.target.checked ? 'In Production' : 'Printing Scheduled';
    setStatus(newStatus);
    updateOrderStatus(orderId, newStatus);
  };

  const handleDownload = () => {
    if (modelUrl) {
      window.location.href = modelUrl;
    }
  };

  if (loading || !orderDetails) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogContent style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
          {loading ? <CircularProgress /> : "Order details not available."}
        </DialogContent>
      </Dialog>
    );
  }

  const formatCreationTime = (createdAt: string) => {
    const date = new Date(createdAt);

    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
      <DialogTitle>
        Order #{orderId}
        <Typography variant="subtitle1" color="textSecondary">
          Created on: {formatCreationTime(orderDetails.createdAt)}
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Order Item</Typography>
                    <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: isMobile ? 'column' : 'row' }}>
                      {thumbnailUrl && (
                        <img src={thumbnailUrl} alt="Thumbnail" style={{ maxWidth: '150px', height: 'auto', marginRight: isMobile ? '0' : '16px', marginBottom: isMobile ? '16px' : '0', border: '1px solid rgba(0, 0, 0, 0.1)' }} />
                      )}
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: isMobile ? '16px' : '8px' }}>
                          <Typography variant="h5" gutterBottom>{orderDetails.originalFileName}</Typography>
                          <IconButton
                            color="secondary"
                            style={{ padding: '6px', marginLeft: '8px' }}
                            onClick={handleDownload}
                          >
                            <DownloadIcon />
                          </IconButton>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                          <Typography>{orderDetails.customization?.technology}</Typography>
                          <div style={{ margin: '0 8px', width: '1px', backgroundColor: 'rgba(0, 0, 0, 0.2)', height: '16px' }}></div>
                          <Typography>{orderDetails.customization?.material}</Typography>
                          <div style={{ margin: '0 8px', width: '1px', backgroundColor: 'rgba(0, 0, 0, 0.2)', height: '16px' }}></div>
                          <ColorBox label={orderDetails.customization?.colorFinish || 'N/A'} color={getColorByLabel(orderDetails.customization?.colorFinish)} />
                        </div>
                        <div style={{ marginTop: '8px' }}>
                          <Typography variant="body1" style={{ fontWeight: 'bold' }}>Dimensions:</Typography>
                          <Typography>{orderDetails.dimensions?.length || 0} mm x {orderDetails.dimensions?.breadth || 0} mm x {orderDetails.dimensions?.height || 0} mm</Typography>
                        </div>
                        <div style={{ marginTop: '8px' }}>
                          <Typography variant="body1" style={{ fontWeight: 'bold' }}>Volume:</Typography>
                          <Typography>{orderDetails.dimensions?.volume || 0} mm³</Typography>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Order Summary</Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography>Unit Production Price:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">₹{orderDetails.printPrices?.unitProductionPrice || 0}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>Unit Post Production Price:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">₹{orderDetails.printPrices?.unitPostProductionPrice || 0}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>Subtotal:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">₹{orderDetails.printPrices?.subtotal || 0}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>Tax Amount:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">₹{orderDetails.printPrices?.taxAmount || 0}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>Shipping Price:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">₹{orderDetails.printPrices?.shippingPrice || 0}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1" fontWeight="bold">Total Final Amount:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1" align="right" fontWeight="bold">₹{orderDetails.printPrices?.totalFinalAmount || 0}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <FormControl fullWidth>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={status === 'In Production'}
                            onChange={handleStatusToggle}
                            color="primary"
                          />
                        }
                        label="In Production"
                      />
                    </FormControl>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Notes</Typography>
                    <TextField
                      label="Note"
                      multiline
                      fullWidth
                      rows={4}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      variant="outlined"
                      margin="normal"
                    />
                    <Button
                      variant="contained"
                      style={{ backgroundColor: '#FED700', color: "primary", marginTop: '8px' }}
                    >
                      Add Notes
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Customers</Typography>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <AccountOutlineIcon style={{ marginRight: '8px' }} />
                      <Typography>{orderDetails.deliveryInstructions?.cname || 'N/A'}</Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <EmailOutlineIcon style={{ marginRight: '8px' }} />
                      <Typography>{orderDetails.deliveryInstructions?.email || 'N/A'}</Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <PhoneOutlineIcon style={{ marginRight: '8px' }} />
                      <Typography>{orderDetails.deliveryInstructions?.phone || 'N/A'}</Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Contact Information</Typography>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <EmailOutlineIcon style={{ marginRight: '8px' }} />
                      <Typography>{orderDetails.deliveryInstructions?.email || 'N/A'}</Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <PhoneOutlineIcon style={{ marginRight: '8px' }} />
                      <Typography>{orderDetails.deliveryInstructions?.phone || 'N/A'}</Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Shipping Address</Typography>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <MapMarkerOutlineIcon style={{ marginRight: '8px' }} />
                      <Typography>{orderDetails.deliveryInstructions?.address || 'N/A'}</Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography style={{ marginRight: '8px' }}>Pincode:</Typography>
                      <Typography>{orderDetails.deliveryInstructions?.pincode || 'N/A'}</Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <TruckIcon style={{ marginRight: '8px' }} />
                      <Typography>Shipping Method: {orderDetails.deliveryInstructions?.shippingMethod || 'N/A'}</Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductionOrderDetailsDialog;
