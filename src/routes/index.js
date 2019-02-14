/*
 * @Author: haotengfei 
 * @Date: 2019-02-14 11:40:19 
 * @Last Modified by: haotengfei
 * @Last Modified time: 2019-02-14 15:27:52
 */

import React, { Component, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import propTypes from 'proptypes'

import { routesConfig } from './config'
import AsyncComponent from './../component/AsyncComponent'
import Placeholder from './../component/Placeholder'

// 目前lazy方法会报警告，暂无解决方案
// Warning: Failed prop type: Invalid prop `component` of type `object` supplied to `Route`, expected `function`.
function getLazyRoutes(routesConfig) {
  return (<Suspense fallback={Placeholder}>
    {routesConfig.map(route => {
      route.component = lazy(route.component)
      return <Route key={route.name} {...route} />
    })}
  </Suspense>)
}

// 按需加载代码分割点
function getDynamicRoutes(routesConfig) {
  return routesConfig.map(route => {
    const component = route.component
    route.component = (props) => <AsyncComponent loader={component} Placeholder={Placeholder} {...props} />
    return <Route key={route.name} {...route} />
  })
}

const RouteType = 'Dynamic'

class RoutesComponent extends Component{
  render() {
    const { routeType = RouteType } = this.props
    return (<Router>
      <Switch>
        {<Redirect exact from='/' to='/home'/>}
        { routeType === RouteType ? getDynamicRoutes(routesConfig) : getLazyRoutes(routesConfig)}
      </Switch>
    </Router>)
  }
}

RoutesComponent.propTypes = {
  routeType: propTypes.string
}

export default RoutesComponent