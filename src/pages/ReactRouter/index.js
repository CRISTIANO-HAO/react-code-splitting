/*
 * @Author: haotengfei 
 * @Date: 2019-02-15 14:05:00 
 * @Last Modified by: haotengfei
 * @Last Modified time: 2019-02-15 19:12:10
 */

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import RoutesComponent from './../../component/RoutesComponent'

class ReactRouter extends Component {
  render () {
    const { routes } = this.props
    return (<div>
      <h1 style={{textAlign: 'center', color: 'red'}}>React Router</h1>
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

export default ReactRouter