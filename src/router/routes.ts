import type { RouteProps } from 'react-router-dom'
import NotFound from '@/layout/404'
import ramen from './modules/ramen'
import pizza from './modules/pizza'
import donut from './modules/donut'
import vue from './modules/vue'
import react from './modules/react'

const modules = [...pizza, ...donut, ...ramen, ...react, ...vue]
export interface RouteItem extends RouteProps {
  /** if needs hide sider, set it false. default true */
  sider?: boolean
  /** if needs hide layout, set it false. default true */
  layout?: boolean
  /** if needs hide header, set it false. default true */
  header?: boolean
  /** auth code  */
  auth?: string[]
  children?: RouteItem[]
  /**
   * @describtion path should start with '/'
   * */
  path?: `/${string}` | '*'
  /** internal attribute */
  _parentPath?: string
  name?: string
  /**
   * @description redirect url
   * @notice It is a fullpath, not a relative path.
   * */
  redirect?: `/${string}`
  icon?: React.FunctionComponent
}

export const routes: RouteItem[] = [
  {
    path: '/',
    redirect: '/donut',
  },
  ...modules,
  {
    path: '*',
    component: NotFound,
  },
]

export type FlatRouteItem = RouteItem & {
  /** 全路径，绝对路径 */
  fullpath?: string
  /** 父级路由 */
  parent?: FlatRouteItem
}
function flat(
  routes: FlatRouteItem[],
  parent?: FlatRouteItem
): FlatRouteItem[] {
  /* 拍平并且补上 fullpath 和 parent 属性 */
  return routes.reduce((pre, cur) => {
    const parentPath = parent?.fullpath || ''
    const fullpath = `${parentPath}${cur.path}`
    const route = { ...cur, fullpath, parent }
    pre.push(route)
    if (cur.children) {
      pre.push(...flat(cur.children, route))
    }
    return pre
  }, [] as FlatRouteItem[])
}

export const flatRoutes = flat(routes)
