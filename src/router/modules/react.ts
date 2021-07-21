import loadable from '@loadable/component'
import type { RouteItem } from '../routes'
import { ReactComponent as Icon } from './logo/react.svg'

const PerfScreen = loadable(() => import('@/pages/perf-screen'))

const routes: RouteItem[] = [
  {
    name: 'react',
    path: '/react',
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
