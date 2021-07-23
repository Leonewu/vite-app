import type { RouteItem } from '../routes'
import { ReactComponent as Icon } from './logo/vue.svg'
import { ReactComponent as Vue } from '@/pages/Vue/index.md'

const routes: RouteItem[] = [
  {
    name: 'vue',
    path: '/vue',
    icon: Icon,
    component: Vue,
  },
]

export default routes
