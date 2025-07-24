// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'

// ** Demo Components Imports
import TableInventory from 'src/views/tables/TableInventory'

const Inventory = () => {
  const [sortBy, setSortBy] = useState('')

  const handleSortChange = (event: any) => {
    setSortBy(event.target.value)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link>
            Inventory
          </Link>
        </Typography>

        <Typography variant='body2'>Inventory can be managed here</Typography>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader 
            title='Inventory' 
            titleTypographyProps={{ variant: 'h6' }}
            action={
              <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    label="Sort By"
                    onChange={handleSortChange}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="sku">SKU</MenuItem>
                    <MenuItem value="itemName">Item Name</MenuItem>
                    <MenuItem value="category">Category</MenuItem>
                    <MenuItem value="quantityInStock">Quantity in Stock</MenuItem>
                    <MenuItem value="pricePerUnit">Price per Unit</MenuItem>
                    <MenuItem value="supplier">Supplier</MenuItem>
                    <MenuItem value="reorderLevel">Reorder Level</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            }
          />

          <TableInventory sortBy={sortBy} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Inventory