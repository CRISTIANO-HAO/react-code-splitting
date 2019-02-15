/*
 * @Author: haotengfei 
 * @Date: 2019-02-14 11:40:19 
 * @Last Modified by: haotengfei
 * @Last Modified time: 2019-02-15 18:17:34
 */

import React, { Component, Suspense, lazy } from 'react'
import { Route } from "react-router-dom";
import PropTypes from 'proptypes'

import AsyncComponent from './AsyncComponent'
import Placeholder from './Placeholder'

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
    const { name, routes } = route
    const loader = route.component
    const component = (props) => <AsyncComponent routes={routes || []} loader={loader} Placeholder={Placeholder} {...props} />
    return <Route key={name} {...route} component={component} />
  })
}

// 默认使用动态路由
const RouteType = 'Dynamic'

class RoutesComponent extends Component{
  render() {
    const { routeType = RouteType, routesConfig = [] } = this.props
    return (
      routeType === RouteType ? getDynamicRoutes(routesConfig) : getLazyRoutes(routesConfig)
    )
  }
}

RoutesComponent.propTypes = {
  routeType: PropTypes.string,
  routesConfig: PropTypes.array
}

export default RoutesComponent