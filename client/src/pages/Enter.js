import React from 'react';
import Home from './Home';

const Enter = () => {
  return (
    <div>
    <div className="card-body text-center">
    <p className="card-header">
      <h1>
      devFinder
      </h1>
      <h3>
        Find the help you need for that last commit!
      </h3>
    </p>
    </div>

    <div>
      <Home />
    </div>
    </div>
  );
};

export default Enter;