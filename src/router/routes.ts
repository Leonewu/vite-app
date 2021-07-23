import type { RouteProps } from 'react-router-dom'
import NotFound from '@/layout/404'
import introduction from './modules/introdution'
import vue from './modules/vue'
import react from './modules/react'
import about from './modules/about'
import docs from './modules/docs'

const modules = [...about, ...introduction, ...docs, ...react, ...vue]
export interface RouteItem extends RouteProps {
  /** menu name  */
  name?: string
  /**
   * @describtion path should start with '/', or '*'
   * */
  path?: `/${string}` | '*'
  children?: RouteItem[]
  /** menu icon  */
  icon?: React.FunctionComponent
  /** auth code  */
  auth?: string[]
  /**
   * @description redirect url
   * @notice It is a fullpath, not a relative path.
   * */
  redirect?: `/${string}`
  /** if needs hide sider, set it false. default true */
  sider?: boolean
  /** if needs hide layout, set it false. default true */
  layout?: boolean
  /** if needs hide header, set it false. default true */
  header?: boolean
  /** hidden in sider menu, default false  */
  hide?: boolean
  /** internal attribute */
  _parentPath?: string
}

export const routes: RouteItem[] = [
  {
    path: '/',
    redirect: '/introduction',
  },
  {
    path: '/home',
    hide: true,
    redirect: '/introduction',
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
