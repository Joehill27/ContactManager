import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const bcrypt = require('bcryptjs');

axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'PATCH, DELETE, POST, GET, OPTIONS';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loggedIn: 'false'
    };

    localStorage.setItem('userId', -1);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    // localStorage.setItem('userId', 0);
    const login = async() => {
      try {
        return await axios.post('http://localhost:3001/api/user/login', this.state);
      } catch (error) {
        console.log(error);
      }
    }

    const loginHandler = async() => {
      const response = await login();
      console.log(response);
      if(response) {
        localStorage.setItem('userId', response.data.user._id);
        localStorage.setItem('userName', response.data.user.username);
        this.props.history.push('/contactList');
        window.location.reload();
      } else {
        alert("Unable to login");
      }
      
  }


    return (
      <div className="FormCenter">
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
            <button onClick={loginHandler} className="FormField__Button mr-20">Login</button>
            <Link  to="/" className="FormField__Link">Create an account</Link>
          </div>
      </div>
    );
  }
}

export default Login;