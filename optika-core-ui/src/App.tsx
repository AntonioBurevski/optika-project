import './App.css';
import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import {Route, Switch} from "react-router";
import {BrowserRouter as Router} from "react-router-dom"
import OptikaNavbar from "./components/layout/OptikaNavbar";
import OptikaHomeView from "./components/OptikaHomeView";
import ServicesCoreView from "./components/ServicesCoreView";
import ProductsCoreView from "./components/ProductsCoreView";

function App() {
  return (
      <div className="App">
        <Router>
          <OptikaNavbar/>
          <Switch>
            <Route exact path='/' component={OptikaHomeView}/>
              <Route exact path="/products" component={ProductsCoreView}/>
              <Route exact path="/services" component={ServicesCoreView}/>
          </Switch>
          {/*<Footer/>*/}
        </Router>
      </div>
  );
}

export default App;
