import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import RoutesComponent from './component/RoutesComponent'
import { routesConfig } from './routes'

class App extends Component {
  render() {
    return (<Router>
      <Switch>
        <RoutesComponent routesConfig={routesConfig} />
      </Switch>
    </Router>
    );
  }
}

export default App;
