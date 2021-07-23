import type { RouteItem } from '../routes'
import { ReactComponent as About } from '@/pages/About/index.md'
import { ReactComponent as Icon } from './logo/doc.svg'

const routes: RouteItem[] = [
  {
    name: 'docs',
    path: '/docs',
    component: About,
    icon: Icon,
  },
]

export default routes
