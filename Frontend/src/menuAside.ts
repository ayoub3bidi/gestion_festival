import {
  mdiMonitor,
  mdiDoor,
  mdiMagicStaff,
  mdiAccount,
  mdiTheater,
  mdiTicket,
} from '@mdi/js'
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard',
  },
  {
    href: '/users',
    icon: mdiAccount,
    label: 'Users'
  },
  {
    href: '/rooms',
    icon: mdiDoor,
    label: 'Rooms'
  },
  {
    href: '/showTypes',
    icon: mdiMagicStaff,
    label: 'Show types'
  },
  {
    href: '/shows',
    icon: mdiTheater,
    label: "Shows"
  },
  {
    href: '/tickets',
    icon: mdiTicket,
    label: "Tickets"
  }
  // {
  //   href: '/tables',
  //   label: 'Tables',
  //   icon: mdiTable,
  // },
]

export default menuAside
