const routesConfig = [{
  name: 'Home',
  path: '/home',
  component: () => import('./RouterA'),
},
{
  name: 'ReactRouter',
  path: '/react-router',
  component: () => import('./RouterB'),
}]