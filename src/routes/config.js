/*
 * @Author: haotengfei 
 * @Date: 2019-02-14 11:25:32 
 * @Last Modified by: haotengfei
 * @Last Modified time: 2019-02-14 15:20:16
 */

export const routesConfig = [
  {
    name: 'Home',
    path: '/home',
    component: () => import('./../pages/Home'),
  },
  {
    name: 'ReactRouter',
    path: '/react-router',
    component: () => import('./../pages/ReactRouter'),
  }
]