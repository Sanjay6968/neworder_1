import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const ItemDetailsDialog = ({
  open,
  onClose,
  item,
  sortBy
}: {
  open: boolean
  onClose: () => void
  item: any
  sortBy?: string
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Item Details</DialogTitle>
      <DialogContent>
        <DialogContentText component="div">
          <Typography><strong>SKU:</strong> {item.sku}</Typography>
          <Typography><strong>Name:</strong> {item.itemName}</Typography>
          <Typography><strong>Category:</strong> {item.category}</Typography>
          <Typography><strong>Quantity in Stock:</strong> {item.quantityInStock}</Typography>
          <Typography><strong>Reorder Level:</strong> {item.reorderLevel}</Typography>
          <Typography><strong>Price per Unit:</strong> ${item.pricePerUnit}</Typography>
          <Typography><strong>Supplier:</strong> {item.supplier}</Typography>
        </DialogContentText>

        {/* Show sortBy info if provided */}
        {sortBy && (
          <Typography
            sx={{ marginTop: 4, fontStyle: 'italic', color: 'text.secondary' }}
          >
            Currently Sorted By: <strong>{sortBy}</strong>
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ItemDetailsDialog
