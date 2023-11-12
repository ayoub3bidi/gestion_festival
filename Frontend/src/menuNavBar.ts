import {
  mdiAccount,
  mdiCogOutline,
  mdiThemeLightDark,
} from '@mdi/js'
import { MenuNavBarItem } from './interfaces'

const menuNavBar: MenuNavBarItem[] = [
  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: 'My Profile',
        href: '/profile',
      },
      {
        isDivider: true,
      },
      {
        icon: mdiCogOutline,
        label: 'Settings',
      },
    ],
  },
  {
    icon: mdiThemeLightDark,
    label: 'Light/Dark',
    isDesktopNoLabel: true,
    isToggleLightDark: true,
  },
]

export default menuNavBar
