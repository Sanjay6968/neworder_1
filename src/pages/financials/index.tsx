// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

import TableFinancials from 'src/views/tables/TableFinancials'

const Financials = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='https://mui.com/components/tables/' target='_blank'> 
            Financials
          </Link>
        </Typography>

        <Typography variant='body2'>Manage and view financial records here</Typography>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Financial Summary' titleTypographyProps={{ variant: 'h6' }} />

          <TableFinancials />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Financials
