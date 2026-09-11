import React, { Component } from 'react';

/**
 * Higher-order component that logs the lifecycle of the wrapped component.
 *
 * @param {React.ComponentType} WrappedComponent
 * The component whose mount and unmount events should be logged.
 *
 * @returns {React.ComponentType}
 * A component enhanced with lifecycle logging.
 */
function WithLogging(WrappedComponent) {
  const componentName =
    WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component';

  class WithLoggingComponent extends Component {
    componentDidMount() {
      console.log(
        `Component ${componentName} is mounted`
      );
    }

    componentWillUnmount() {
      console.log(
        `Component ${componentName} is going to unmount`
      );
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithLoggingComponent.displayName =
    `WithLogging(${componentName})`;

  return WithLoggingComponent;
}

export default WithLogging;
