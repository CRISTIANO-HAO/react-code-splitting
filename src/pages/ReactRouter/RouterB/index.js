import React, { Component } from 'react'

import { NavLink } from 'react-router-dom'
import RoutesComponent from './../../../component/RoutesComponent'

class Router extends Component {
  render () {
    const { routes } = this.props
    return (<div>
      <h2 style={{textAlign: 'center', color: 'red'}}>Router_B</h2>
      <hr />
      {routes.map(route => <NavLink 
          key={route.name} 
          to={route.link} 
          exact={route.exact} 
          activeClassName={'active'}
          style={{display: 'inline-block', width: '33%', textAlign: 'center'}}
        >
        {route.name}
        </NavLink>
      )}
      <hr />
      <RoutesComponent routesConfig={routes} />
    </div>)
  }
}

export default Router