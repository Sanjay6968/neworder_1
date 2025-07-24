// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'

// React & Next
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// Styled components
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

const Trophy = () => {
  const theme = useTheme()
  const router = useRouter()

  const [revenue, setRevenue] = useState<number | null>(null)
  const [month, setMonth] = useState<string>('')

  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  const navigateToOrders = () => {
    router.push('/sales/orders')
  }

  useEffect(() => {
    const fetchBestMonth = async () => {
      try {
        const res = await fetch('https://back.mekuva.com/api/public/best-month-revenue')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setRevenue(data.revenue)
        setMonth(data.month)
      } catch (err) {
        console.error('Failed to load best month:', err)
      }
    }

    fetchBestMonth()
  }, [])

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>
          {month ? `Best Month: ${month}` : 'Loading...'}
        </Typography>

        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          Congratulations Rajkumar! 🚀
        </Typography>

        <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
          {revenue !== null ? `₹${revenue.toLocaleString()}` : 'Loading...'}
        </Typography>

        <Button size='small' variant='contained' onClick={navigateToOrders}>
          View Sales
        </Button>

        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        <TrophyImg alt='trophy' src='/images/misc/trophy.png' />
      </CardContent>
    </Card>
  )
}

export default Trophy
