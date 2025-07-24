import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const CustomerDetailsDialog = ({ open, onClose, customer }: { open: boolean, onClose: () => void, customer: any }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Customer Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Company Name: {customer.companyName}<br />
          Contact Person: {customer.contactPerson}<br />
          Email: {customer.email}<br />
          Phone: {customer.phone}<br />
          Address: {customer.address}
        </DialogContentText>
      </DialogContent>

      <DialogTitle>Customer Orders</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {/* Insert orders details here */}
          Order details or a listing orders can be placed here.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomerDetailsDialog;
