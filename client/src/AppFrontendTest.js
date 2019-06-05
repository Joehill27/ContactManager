import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
// import logo from './Components/img/Contacts.png';
import logo from './Components/img/whatsapp-logo.png';

import './App.css';
import Login from "./Components/Login";
import CreateAccount from "./Components/CreateAccount";

import CreateNew from "./Components/CreateContact";
import EditContact from "./Components/EditContact";
import ContactList from "./Components/ContactList";

axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'PATCH, DELETE, POST, GET, OPTIONS';

class App extends Component {

  // here is our UI
  render() {
    return (
      <Router>

      <div className="App">

        <div className="App__Aside">		
        </div>
		

        <div className="App__Form">
         
                <label><font size="6">Contact Manager</font></label>
          	    <div className="PageSwitcher">
            		<NavLink to="/contact.list" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Contacts</NavLink>		
            		<NavLink exact to="/create" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Create New Contact</NavLink>
          		</div>	
		
		
          <Route path="/contact.list" exact component={ContactList} />
          <Route path="/edit/:id" component={EditContact} />
          <Route path="/create" component={CreateNew} />
        </div>
      </div>
      </Router>
    );
  }
}

export default App;