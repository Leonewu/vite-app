import loadable from '@loadable/component'
import type { RouteItem } from '../routes'
import { ReactComponent as Icon } from './logo/vue.svg'

const PerfScreen = loadable(() => import('@/pages/perf-screen'))

const routes: RouteItem[] = [
  {
    name: 'vue',
    path: '/vue',
    logo: Icon,
    children: [
      {
        name: 'perf-screen📺',
        path: '/perf-screen',
        component: PerfScreen,
        layout: false,
      },
    ],
  },
]

export default routes
