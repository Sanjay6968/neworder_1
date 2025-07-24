// ** React Imports
import { ReactNode } from 'react'

// ** Clerk Import
import { SignIn } from "@clerk/nextjs"

// ** MUI Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'


// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  maxWidth: 'auto',
  margin: 'auto',
  boxSizing: 'border-box',
  [theme.breakpoints.up('sm')]: {
    width: '100%',
    maxWidth: '32rem'
  }
}))

const Page = () => {
 
  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="60" height="70" viewBox="0 0 284 321" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_dd_92_4)">
                  <path d="M142 9L14 82.6667V230.333L142 304.333L270 230.333V82.6667L142 9ZM205 118L144 82.6667V16.879L264.333 84L205 118ZM80.6667 123.667L140 158V226.333L80.6667 192V123.667ZM144 157.667L203.333 123.333V191.667L144 226.333V157.667ZM142 154.333L112.333 137.333L82.6667 120.333L142 86L201.333 120.333L142 154.333ZM140 82.6667L79 118L19.6667 84L140 16.879V82.6667ZM77 121.333V192L19.6667 225L17.6667 87L77 121.333ZM78.6667 195.333L140 230.667V297L21 229.5L78.6667 195.333ZM144 230.667L205.333 195.333L264.5 229L144 297V230.667ZM207 192V121.333L266.333 87L264.667 225L207 192Z" fill="#FED700"/>
                  <path d="M142 9L14 82.6667V230.333L142 304.333L270 230.333V82.6667L142 9ZM205 118L144 82.6667V16.879L264.333 84L205 118ZM80.6667 123.667L140 158V226.333L80.6667 192V123.667ZM144 157.667L203.333 123.333V191.667L144 226.333V157.667ZM142 154.333L112.333 137.333L82.6667 120.333L142 86L201.333 120.333L142 154.333ZM140 82.6667L79 118L19.6667 84L140 16.879V82.6667ZM77 121.333V192L19.6667 225L17.6667 87L77 121.333ZM78.6667 195.333L140 230.667V297L21 229.5L78.6667 195.333ZM144 230.667L205.333 195.333L264.5 229L144 297V230.667ZM207 192V121.333L266.333 87L264.667 225L207 192Z" stroke="#FED700" stroke-width="15"/>
                </g>
                <g filter="url(#filter1_d_92_4)">
                  <path d="M14 228.481V81.078L82.6667 120.043L112.333 137.043L142 154.043L201.333 120.043L270 81.078V230.043M146.5 160L80.6667 123.377L17.6667 86.71V228.481M137 160L203.333 123.377L266.333 86.71V230.043" stroke="#123CB4" stroke-width="20"/>
                </g>
                <path d="M267.163 81.4221L263.533 81.7403L264.974 84.6494L267.572 83.026L267.163 81.4221Z" fill="#123CB4" stroke="#123CB4"/>
                <path d="M20.461 81.7403L16.8635 81.4286L16.5908 83.026L19.1882 84.3247L20.461 81.7403Z" fill="#123CB4" stroke="#123CB4"/>
                <defs>
                  <filter id="filter0_dd_92_4" x="0.428711" y="0.346619" width="283.284" height="320.65" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_92_4"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="effect1_dropShadow_92_4" result="effect2_dropShadow_92_4"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_92_4" result="shape"/>
                  </filter>
                  <filter id="filter1_d_92_4" x="0" y="63.9056" width="284" height="174.138" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_92_4"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_92_4" result="shape"/>
                  </filter>
                </defs>
              </svg>

            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>

          <div className="flex flex-col items-center mb-6 font-bold">
          <Typography variant='h5'>
            Staff Login
          </Typography>
          </div>
          <Typography variant='body2' className="text-center">
            Please sign-in to your Mekuva authorized account.
          </Typography>
          <SignIn path="/sign-in" routing="path" appearance={{
            
            elements: {
              footerAction: { display: "none"  },
            },
           }} />
        </CardContent>
      </Card>

      <FooterIllustrationsV1 />
    </Box>
  )
}

Page.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Page
