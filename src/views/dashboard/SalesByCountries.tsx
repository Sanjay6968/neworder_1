'use client'

// ** React Imports
import { useEffect, useState, ReactNode } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Helper to get avatar initials (e.g., Telangana → TL)
const getInitials = (state: string) =>
  state
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2)

interface SalesData {
  state: string
  totalRevenue: number
  orders: number
}

const SalesByCountries = () => {
  const [data, setData] = useState<SalesData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://back.mekuva.com/api/public/sales-by-state')
        const result = await res.json()
        setData(result)
      } catch (error) {
        console.error('Failed to fetch sales by state:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader
        title='Sales by State'
        titleTypographyProps={{ sx: { lineHeight: '1.2 !important', letterSpacing: '0.31px !important' } }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />

      <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
        {data.map((item, index) => {
          const trend = item.totalRevenue > 5000 ? 'up' : 'down'
          const trendIcon =
            trend === 'up' ? (
              <ChevronUp sx={{ color: 'success.main', fontWeight: 600 }} />
            ) : (
              <ChevronDown sx={{ color: 'error.main', fontWeight: 600 }} />
            )
          const avatarColor: ThemeColor = trend === 'up' ? 'success' : 'error'

          return (
            <Box
              key={item.state}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ...(index !== data.length - 1 ? { mb: 5.875 } : {})
              }}
            >
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  marginRight: 3,
                  fontSize: '1rem',
                  color: 'common.white',
                  backgroundColor: `${avatarColor}.main`
                }}
              >
                {getInitials(item.state)}
              </Avatar>

              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 0.5, fontWeight: 600, letterSpacing: '0.25px' }}>
                      ₹{item.totalRevenue.toLocaleString()}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {trendIcon}

                      <Typography
                        variant='caption'
                        sx={{
                          fontWeight: 600,
                          lineHeight: 1.5,
                          color: trend === 'down' ? 'error.main' : 'success.main'
                        }}
                      >
                        {trend === 'up' ? '+12%' : '-8%'}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant='caption' sx={{ lineHeight: 1.5 }}>
                    {item.state}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', textAlign: 'end', flexDirection: 'column' }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.72, letterSpacing: '0.22px' }}>
                    {item.orders}
                  </Typography>

                  <Typography variant='caption' sx={{ lineHeight: 1.5 }}>
                    Orders
                  </Typography>
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default SalesByCountries
