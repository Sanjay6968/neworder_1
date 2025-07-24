// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyInr from 'mdi-material-ui/CurrencyInr'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
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

          <Grid item xs={12} md={6} lg={4}>
            <WeeklyOverview />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <SalesByCountries />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <CardStatisticsVerticalComponent
                  stats='₹12000'
                  icon={<Poll />}
                  color='success'
                  trendNumber='+15%'
                  title='Total Profit'
                  subtitle='Weekly Profit'
                />
              </Grid>

              <Grid item xs={6}>
                <CardStatisticsVerticalComponent
                  stats='₹2000'
                  title='Refunds'
                  trend='negative'
                  color='secondary'
                  trendNumber='-2%'
                  subtitle='Past Month'
                  icon={<CurrencyInr />}
                />
              </Grid>

              <Grid item xs={6}>
                <CardStatisticsVerticalComponent
                  stats='62'
                  trend='positive'
                  trendNumber='+18%'
                  title='New Projects'
                  subtitle='Monthly Projects'
                  icon={<BriefcaseVariantOutline />}
                />
              </Grid>

              <Grid item xs={6}>
                <CardStatisticsVerticalComponent
                  stats='38'
                  color='warning'
                  trend='negative'
                  trendNumber='-6%'
                  subtitle='Last Week'
                  title='Sales Queries'
                  icon={<HelpCircleOutline />}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* <Grid item xs={12} md={12} lg={8}>
            <DepositWithdraw />
          </Grid> */}

          <Grid item xs={12}>
            <Table />
          </Grid>
        </Grid>
      </ApexChartWrapper>
    )
  }
}
