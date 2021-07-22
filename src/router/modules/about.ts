import type { RouteItem } from '../routes'
import { ReactComponent as About } from '@/pages/About/index.md'

const routes: RouteItem[] = [
  {
    name: 'about me',
    path: '/about',
    component: About,
    hide: true,
    sider: false,
  },
]

export default routes
