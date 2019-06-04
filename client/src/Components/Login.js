import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// const bcrypt = require('bcryptjs');
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import ContactList from "./ContactList.component";

const encryptor = require('./PasswordEncryptor');

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }


  // TODO
  handleSubmit(e) {
    e.preventDefault();

    console.log('The form was sent with data:');
    console.log(this.state);

    // Here we need to axios.get() the database password hash

    axios.post('http://localhost:3001/api/user/login', this.state)
    .then(res => console.log(res), 
      this.props.history.push('/contactList'));

    const dbHash = "sss";
    console.log(encryptor.compare(this.state.password, dbHash));

    
  }

  render() {

    return (
      <Router>
      <div className="FormCenter">
        <form onSubmit={this.handleSubmit} className="FormFields">
          {/* Usermane */}
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Username</label>
            <input type="text" id="username" className="FormField__Input" placeholder="Enter Your Username" name="username"
            value={this.state.username} onChange={this.handleChange} />
          </div>
          {/* Password */}
          <div className="FormField">
            <label className="FormField__Label" htmlFor="password">Password</label>
            <input type="password" id="password" className="FormField__Input" placeholder="Enter Your Password" name="password"
            value={this.state.password} onChange={this.handleChange} />
          </div>
          {/* Login Button */}
          <div className="FormField">
            <button className="FormField__Button mr-20">Login</button>
            <Link  to="/" className="FormField__Link">Create an account</Link>
          </div>
        </form>
      </div>
      <Route path ="/contactList" component={ContactList} />


      </Router>
    );
  }
}

export default Login;