import React from 'react';
import { Link } from 'react-router-dom';

function withContainer(Component) {

  function containerComponent(props) {

    
    return (
      <div className="main-wrapper">
        <header className="header">
          <div className="container">
            <h1>
              <Link to="/">HackerNews</Link>
            </h1>
          </div>
        </header>
        <main>
          <div className="container">
            <Component {...props} />
          </div>
        </main>
        <footer className="footer">
          <div className="container">
            <span className="footer__text">
              Built using <a href="https://github.com/HackerNews/API" target="_new" title="HackerNews API">HackerNews API</a>
            </span>
          </div>
        </footer>
      </div>
    );
  }
  

  return containerComponent;
  
}

export default withContainer;





