// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'

export default function Dashboard() {
  if (typeof window === 'undefined') {
    console.log('window is undefined')
    return <></>
  } else {
    return (
      <ApexChartWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Trophy />
          </Grid>
          <Grid item xs={12} md={8}>
            <StatisticsCard />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <WeeklyOverview />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <SalesByCountries />
          </Grid>
          <Grid item xs={12}>
            <Table />
          </Grid>
        </Grid>
      </ApexChartWrapper>
    )
  }
}
