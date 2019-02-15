export const routesConfig = [{
  name: 'RouterA',
  path: '/react-router',
  exact: true,
  component: () => import('./RouterA'),
},
{
  name: 'RouterB',
  path: '/react-router/router-b',
  component: () => import('./RouterB'),
},{
  name: 'RouterC',
  path: '/react-router/router-c',
  component: () => {
    return import('./RouterC')
  },
}]