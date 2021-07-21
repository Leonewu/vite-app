import loadable from '@loadable/component'
import type { RouteItem } from '../routes'

const Donut = loadable(() => import('@/pages/Donut'))
const Child = loadable(() => import('@/pages/Donut/child'))

const routes: RouteItem[] = [
  {
    name: 'donut🍩',
    path: '/donut',
    component: Donut,
    auth: [],
    children: [
      {
        name: 'donut-child',
        path: '/donut-child',
        component: Child,
      },
    ],
  },
]

export default routes
