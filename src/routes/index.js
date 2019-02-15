/*
 * @Author: haotengfei 
 * @Date: 2019-02-14 11:25:32 
 * @Last Modified by: haotengfei
 * @Last Modified time: 2019-02-15 19:07:56
 */

const routes = [{
    name: 'Home',
    path: '/',
    exact: true,
    component: () => import('../pages/Home'),
  },
  {
    name: 'ReactRouter',
    path: '/react-router',
    component: () => import('../pages/ReactRouter'),
    routes: [{
        name: 'RouterA',
        path: '/react-router/router-a',
        // exact: true,
        component: () => import('./../pages/ReactRouter/RouterA'),
        routes: [{
            name: 'RouterA_AA',
            path: '/react-router/router-a/a_aa',
            exact: false,
            component: () => import('./../pages/ReactRouter/RouterA/A_AA'),
          },
          {
            name: 'RouterA_BB',
            path: '/react-router/router-a/a_bb',
            component: () => import('./../pages/ReactRouter/RouterA/A_BB'),
          }, {
            name: 'RouterA_CC',
            path: '/react-router/router-a/a_cc',
            component: () => {
              return import('./../pages/ReactRouter/RouterA/A_CC')
            },
          }
        ]
      },
      {
        name: 'RouterB',
        path: '/react-router/router-b',
        component: () => import('./../pages/ReactRouter/RouterB'),
        routes: [{
            name: 'RouterB_AA',
            path: '/react-router/router-b/b_aa',
            exact: false,
            component: () => import('./../pages/ReactRouter/RouterB/B_AA'),
          },
          {
            name: 'RouterB_BB',
            path: '/react-router/router-b/b_bb',
            component: () => import('./../pages/ReactRouter/RouterB/B_BB'),
          }, {
            name: 'RouterB_CC',
            path: '/react-router/router-b/b_cc',
            component: () => {
              return import('./../pages/ReactRouter/RouterB/B_CC')
            },
          }
        ]
      }, {
        name: 'RouterC',
        path: '/react-router/router-c',
        component: () => {
          return import('./../pages/ReactRouter/RouterC')
        },
      }
    ]
  }
]

function rewriteRoutePath (routes) {
  if (!routes || routes.length === 0) {
    return
  }
  routes.forEach(item => {
    item.link = item.path
    if(item['routes'] && item['routes'].length > 0) {
      let route = item
      let hasChild = route['routes'] && route['routes'].length > 0
      while (hasChild) {
        route = route['routes'][0]
        hasChild = route['routes'] && route['routes'].length > 0
      }
      item.link = route.path
      rewriteRoutePath(item.routes)
    }
  })
  return routes
}

export const routesConfig = rewriteRoutePath(routes)