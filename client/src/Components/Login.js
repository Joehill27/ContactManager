import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const bcrypt = require('bcryptjs');

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loggedIn: 'false'
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

    // console.log('The form was sent with data:');
    // console.log(this.state);

    // // Here we need to axios.get() the database password hash
    axios.post('http://localhost:3001/api/user/login', this.state)
    .then(res => {
      console.log(res.data.user.password);
      const passwordCheck = new Promise((resolve, reject) =>
      {
          bcrypt.compare(this.state.password, res.data.user.password, function(err, check)
          {
              if(err) reject(err)
              resolve(check)
          })
      })
      var correctLogin;
      passwordCheck.then(function(result)
      { 
        console.log(result)
        // if(result) this.props.history.push('/contactList');
        // if(result) 
      });
    }).catch(err => {
      console.log(err);
    });

    // axios.post('http://localhost:3001/api/user/login', this.state)
    // .then(res => console.log(res.status));

    var dbHash = "ss";
  }

  render() {

    // if(this.state.loggedIn) {
    //   this.props.history.push('/contactList');
    // }

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
