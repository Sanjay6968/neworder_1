// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import TableInventory from 'src/views/tables/TableCustomers'

const Customers = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link>
            Customers
          </Link>
        </Typography>

        <Typography variant='body2'>Customer details managed here</Typography>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Customers' titleTypographyProps={{ variant: 'h6' }} />

          <TableInventory />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Customers
