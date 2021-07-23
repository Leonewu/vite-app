import { ReactComponent as Intro } from '@/pages/Introduction/index.md'
import { ReactComponent as Icon } from './logo/introduction.svg'
import type { RouteItem } from '../routes'

const routes: RouteItem[] = [
  {
    name: 'introduction',
    path: '/introduction',
    component: Intro,
    icon: Icon,
  },
]

export default routes
