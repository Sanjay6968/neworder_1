
// ** React Imports
import { ReactElement, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyInr from 'mdi-material-ui/CurrencyInr'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import Flask from 'mdi-material-ui/Flask'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

interface DataType {
  stats: string
  title: string
  color: ThemeColor
  icon: ReactElement
}

const StatisticsCard = () => {
  const [statsData, setStatsData] = useState<DataType[]>([
    {
      stats: '...',
      title: 'Orders',
      color: 'primary',
      icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: '...',
      title: 'Customers',
      color: 'success',
      icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: '...',
      title: 'Inventory',
      color: 'warning',
      icon: <Flask sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: '...',
      title: 'Revenue',
      color: 'info',
      icon: <CurrencyInr sx={{ fontSize: '1.75rem' }} />
    }
  ])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('https://back.mekuva.com/api/public/statistics-summary')
        const data = await res.json()

        setStatsData([
          {
            stats: `${data.orders}`,
            title: 'Orders',
            color: 'primary',
            icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
          },
          {
            stats: `${data.customers}`,
            title: 'Customers',
            color: 'success',
            icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
          },
          {
            stats: `${data.inventory}`,
            title: 'Inventory',
            color: 'warning',
            icon: <Flask sx={{ fontSize: '1.75rem' }} />
          },
          {
            stats: `${data.revenue.toLocaleString()}`,
            title: 'Revenue',
            color: 'info',
            icon: <CurrencyInr sx={{ fontSize: '1.75rem' }} />
          }
        ])
      } catch (error) {
        console.error('Failed to fetch statistics-summary:', error)
      }
    }

    fetchStats()
  }, [])

  const renderStats = () => {
    return statsData.map((item: DataType, index: number) => (
      <Grid item xs={12} sm={3} key={index}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 44,
              height: 44,
              boxShadow: 3,
              color: 'common.white',
              backgroundColor: `${item.color}.main`
            }}
          >
            {item.icon}
          </Avatar>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>{item.title}</Typography>
            <Typography variant='h6'>{item.stats}</Typography>
          </Box>
        </Box>
      </Grid>
    ))
  }

  return (
    <Card>
      <CardHeader
        title='Statistics Card'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Keep these numbers up !
            </Box>{' '}
            🚀 🚀
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />

      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard 
