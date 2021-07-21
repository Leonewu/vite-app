import Ramen from '@/pages/Ramen'
import type { RouteItem } from '../routes'

const routes: RouteItem[] = [
  {
    name: 'ramen🍜(without sider)',
    path: '/ramen',
    sider: false,
    component: Ramen,
  },
]

export default routes
