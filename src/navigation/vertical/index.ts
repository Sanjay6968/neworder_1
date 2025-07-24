import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatListBulleted from 'mdi-material-ui/FormatListBulleted'
import PackageVariant from 'mdi-material-ui/PackageVariant'
import Printer3dNozzle from 'mdi-material-ui/Printer3dNozzle'
import AccountMultiple from 'mdi-material-ui/AccountMultiple'
import CurrencyRupee from 'mdi-material-ui/CurrencyRupee'
import { useAuth } from '@clerk/nextjs'

import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  const { isLoaded, userId } = useAuth();  // Get userId from useAuth

  if (!isLoaded) {
    return [];
  }

  const userPaths: { [key: string]: string } = {
    user_2jgefoBMl5FxEaM3XIvdf2QOd6t: '/admin/orders',
    user_2h30mxeNsmKAObdfguTUZZoaj7B: '/sales/orders',
    user_2jgen6hu0iAWBEGuDXlJPuSMniR: '/production/orders',
    user_2jgeuZp4FUyEIn1OcRHN4qXamxe: '/dispatch/orders',
    user_2jgnmC3TJOIoQA52LNJMjx2XgZB: '/post-production/orders',
  };

  if (userId && userPaths.hasOwnProperty(userId)) {
    let ordersPath = userPaths[userId];

    return [
      {
        title: 'Dashboard',
        icon: HomeOutline,
        path: '/'
      },
      {
        sectionTitle: 'Navigation Menu'
      },
      {
        title: 'Orders',
        icon: FormatListBulleted,
        path: ordersPath
      },
       {
       title: 'Inventory',
         path: '/inventory',
         icon: PackageVariant
        },
        {
          title: 'Print Queue',
           icon: Printer3dNozzle,
           path: '/queue'
        },
        {
          title: 'Customers',
          icon: AccountMultiple,
          path: '/customers'
        },
        {
           icon: CurrencyRupee,
          title: 'Financials',
          path: '/financials'
        }
    ];
  }

  // If userId does not match any specified users, return no navigation items
  return [];
}

export default navigation;
