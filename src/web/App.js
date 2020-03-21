import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/**
 * TODO:
 * > Pages:
 *   - database
 *   - discord page
 *   - api
 *   - roadmap
 */

// Page elements
import ElementMenu from './components/header';

// Pages
import PageHome from './pages/home';
import PageDB from './pages/database';
//import PageStats from './pages/stats';

function App() {
  return (
    <Router>
      <div className="App">
        <ElementMenu />
        <Switch>
          <Route exact path="/" component={PageHome} />
          <Route path="/db" component={PageDB} />
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
