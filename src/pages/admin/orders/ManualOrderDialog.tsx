import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, FormControl, InputLabel, Box, SelectChangeEvent, Typography, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { TechnologyDropdown } from 'src/layouts/components/TechnologyDropdown';
import { MaterialDropdown, getMaterialOptions } from 'src/layouts/components/MaterialDropdown';
import { ColorFinishDropdown, colorOptions } from 'src/layouts/components/ColorFinishDropdown';

interface ManualOrderDialogProps {
  open: boolean;
  onClose: () => void;
}

const layerThicknessOptions = [
  { label: 'Ultra Fine - 0.12mm', value: 'ULTRAFINE' },
  { label: 'Fine - 0.16mm', value: 'FINE' },
  { label: 'Normal - 0.2mm', value: 'NORMAL' },
  { label: 'Draft - 0.3mm', value: 'DRAFT' },
];

const statuses = [
  "Confirmed",
  "Printing Scheduled",
  "In Production",
  "Post Processing",
  "Dispatch",
  "Shipped",
  "Cancelled"
];

const ManualOrderDialog: React.FC<ManualOrderDialogProps> = ({ open, onClose }) => {
  const [orderData, setOrderData] = useState({
    cname: '',
    phone: '',
    totalFinalAmount: '', 
    deliveryType: 'Standard',
    shippingMethod: 'DTDC',
    expertAssistance: 'Not Required',
    email: '',
    address: '',
    pincode: '',
    status: '',
    technology: 'FDM',
    material: 'PLA',
    layerThickness: 'NORMAL',
    printer: 'STANDARD 220x200x220mm',
    infill: 10,
    colorFinish: 'White',
    quantity: 1,
    gstNumber: '',
    originalFileName: '',
  });

  useEffect(() => {
    if (orderData.deliveryType === 'Standard') {
      setOrderData(prevState => ({ ...prevState, shippingMethod: 'DTDC' }));
    } else if (orderData.deliveryType === 'Express') {
      setOrderData(prevState => ({ ...prevState, shippingMethod: 'BlueDart Express Air' }));
    }
  }, [orderData.deliveryType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };

  const handleDeliveryTypeChange = (event: React.MouseEvent<HTMLElement>, newDeliveryType: string) => {
    if (newDeliveryType !== null) {
      setOrderData({ ...orderData, deliveryType: newDeliveryType });
    }
  };

  const handleTechnologyChange = (event: React.MouseEvent<HTMLElement>, newTechnology: string) => {
    if (newTechnology !== null) {
      setOrderData({ ...orderData, technology: newTechnology });
    }
  };

  const handleCreateOrder = async () => {
    const { cname, phone, totalFinalAmount, deliveryType, shippingMethod, expertAssistance, email, address, pincode, status, technology, material, layerThickness, printer, infill, colorFinish, quantity, gstNumber, originalFileName } = orderData;
    
    const payload = {
      customization: {
        technology,
        material,
        layerThickness,
        printer,
        infill,
        colorFinish,
        originalFileName,
        quantity,
      },
      deliveryInstructions: {
        deliveryType,
        cname,
        address,
        pincode,
        expertAssistance,
        email,
        phone,
        shippingMethod,
      },
      printPrices: {
        totalFinalAmount,
      },
      status,
      gstNumber,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_MEKUVA_BACKEND_API_BASE_URL}/api/private/order/createManualOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Order created successfully:', data);
      onClose();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>Create Manual Order</DialogTitle>
      <DialogContent>
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>Customer Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="cname"
                label="Customer Name"
                type="text"
                placeholder="Enter the full name"
                fullWidth
                value={orderData.cname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                placeholder="Enter a valid email address"
                fullWidth
                value={orderData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="phone"
                label="Phone Number"
                type="text"
                placeholder="Enter the phone number"
                fullWidth
                value={orderData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="totalFinalAmount"
                label="Price"
                type="number"
                placeholder="Enter the price"
                fullWidth
                value={orderData.totalFinalAmount}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="dense" variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={orderData.status}
                  onChange={handleSelectChange}
                  name="status"
                  label="Status"
                >
                  {statuses.map(status => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Box mt={2}>
          <Typography variant="h6" gutterBottom>Customization</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="originalFileName"
                label="File Name"
                type="text"
                placeholder="Enter the file name"
                fullWidth
                value={orderData.originalFileName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Technology</Typography>
              <ToggleButtonGroup
                value={orderData.technology}
                exclusive
                onChange={handleTechnologyChange}
                aria-label="technology"
              >
                {['FDM', 'SLA', 'SLS', 'DLP', 'MJF'].map(option => (
                  <ToggleButton key={option} value={option}>
                    {option}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense" variant="outlined">
                <InputLabel>Material</InputLabel>
                <Select
                  value={orderData.material}
                  onChange={handleSelectChange}
                  name="material"
                  label="Material"
                >
                  {getMaterialOptions(orderData.technology).map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense" variant="outlined">
                <InputLabel>Layer Thickness</InputLabel>
                <Select
                  value={orderData.layerThickness}
                  onChange={handleSelectChange}
                  name="layerThickness"
                  label="Layer Thickness"
                >
                  {layerThicknessOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense" variant="outlined">
                <InputLabel>Printer</InputLabel>
                <Select
                  value={orderData.printer}
                  onChange={handleSelectChange}
                  name="printer"
                  label="Printer"
                >
                  {['STANDARD 220x200x220mm', 'MEDIUM 400x400x400mm', 'LARGE 600x600x600mm'].map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="infill"
                label="Infill"
                type="number"
                placeholder="Enter infill percentage"
                fullWidth
                value={orderData.infill}
                onChange={handleChange}
                InputProps={{ inputProps: { min: 0, max: 100, step: 10 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense" variant="outlined">
                <ColorFinishDropdown
                  options={colorOptions.getColorFinishOptions(orderData.technology, orderData.material)}
                  value={orderData.colorFinish}
                  onChange={(value) => setOrderData({ ...orderData, colorFinish: value })}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Box mt={2}>
          <Typography variant="h6" gutterBottom>Delivery Options</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">Delivery Type</Typography>
              <ToggleButtonGroup
                value={orderData.deliveryType}
                exclusive
                onChange={handleDeliveryTypeChange}
                aria-label="delivery type"
              >
                {['Standard', 'Express'].map(option => (
                  <ToggleButton key={option} value={option}>
                    {option}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="address"
                label="Address"
                type="text"
                placeholder="Enter delivery address"
                fullWidth
                value={orderData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="shippingMethod"
                label="Shipping Method"
                type="text"
                placeholder="Shipping Method"
                fullWidth
                value={orderData.shippingMethod}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="pincode"
                label="Pincode"
                type="text"
                placeholder="Enter pincode"
                fullWidth
                value={orderData.pincode}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>

        <Box mt={2}>
          <Typography variant="h6" gutterBottom>Checkout Options</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="quantity"
                label="Quantity"
                type="number"
                placeholder="Enter quantity"
                fullWidth
                value={orderData.quantity}
                onChange={handleChange}
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="gstNumber"
                label="GST Number"
                type="text"
                placeholder="Enter GST number"
                fullWidth
                value={orderData.gstNumber}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleCreateOrder} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManualOrderDialog;
