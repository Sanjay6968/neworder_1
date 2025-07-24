// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import TableDispatchOrders from 'src/views/tables/TableDispatchOrders'

const Orders = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link>
            Dispatch Orders
          </Link>
        </Typography>

        <Typography variant='body2'>You can find all orders here</Typography>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Latest Orders' titleTypographyProps={{ variant: 'h6' }} />
          <TableDispatchOrders />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Orders
