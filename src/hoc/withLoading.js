import React from 'react';

function withLoading(Component) {

  function LoadingComponent({ isLoading, type, error, ...props }) {

    if (error) {
      return (
        <div className="error-message">
          <span>Error Occured!</span>
        </div>
      );
    }

    if (!isLoading) {
      return (<Component {...props} />)
    }

    switch (type) {
      case ('story'):
        return (
          <div className="loading-bar">
            <div className="loading-bar__heading"></div>
            <div className="loading-bar__description"></div>
          </div>
        );
      case ('comment'):
        return (
          <div className="loading-bar">
            <div className="loading-bar__description"></div>
          </div>
        );
      default:
        return (<div>Loading...</div>);
    }
  }

  return LoadingComponent;
}

export default withLoading;