import React from "react";
import PropTypes from 'proptypes'

export default class AsyncComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Component: null };
  }
  componentDidMount() {
    this.props.loader().then(
      Component => {
        setTimeout(() => this.setState({ 
          Component: Component.default
        }), 1000)
      }
    );
  }
  render() {
    const { Component } = this.state;
    const { Placeholder, routes, ...props } = this.props;
    return Component ? <Component routes={routes} {...props} /> : <Placeholder />;
  }
}

AsyncComponent.propTypes = {
  loader: PropTypes.func.isRequired,
  Placeholder: PropTypes.func.isRequired,
  routes: PropTypes.array.isRequired
};