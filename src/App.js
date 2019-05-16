import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PostUser from "./API Endpoints/User/postUser.js";
import PostContact from "./API Endpoints/Contact/postContact.js";


import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Contact Manager</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/users/PostUser" className="nav-link">Create Account</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/users/:id/" className="nav-link">Add Contact</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>

        {/* These are the routes to access the API endpoints later.
            There will be more, just need to figure them out.*/}
        <Route path="/users" exact component={PostUser} />

        <Route path="/users/:id/" exact component={PostContact} /> 
        </div>
      </Router>
        
    );
  }
}

export default App;