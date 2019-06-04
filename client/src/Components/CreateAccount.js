import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const bcrypt = require('bcryptjs');

class CreateAccount extends Component {

  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      email: ''
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

  handleSubmit(e) {
    e.preventDefault();

    console.log('The form was sent with data:');
    console.log(this.state);

    // Saves the result from the promise generated by the Encrypt function
    // encryptor.Encrypt().then(function(result) { encryptedPassword = result; });
    var hashed = {
      username: this.state.username,
      password: "",
      email: this.state.email
    };
    bcrypt.hash(this.state.password, 10, function(err, hash)
    {
      hashed.password = hash;
      axios.post('http://localhost:3001/api/user/createAccount', hashed)
        .then(res => console.log(res));
    })
    
    // axios.post('http://localhost:3001/api/user/createAccount', this.state)
    //   .then(res => console.log(res));
  }


  render() {
    return (
      <div className="FormCenter">
        <form className="FormFields" onSubmit={this.handleSubmit}>
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
          {/* Email */}
          <div className="FormField">
            <label className="FormField__Label" htmlFor="password">E-mail</label>
            <input type="email" id="email" className="FormField__Input" placeholder="Enter Your E-mail" name="email" 
            value={this.state.email} onChange={this.handleChange} />
          </div>
          {/* Create Account Button */}
          <div className="FormField">
            <button className="FormField__Button mr-20">Create Account</button>
            <Link to="/login" className="FormField__Link">I already have an account</Link>
          </div>
          
        </form>
      </div>
    );
  }
}

export default CreateAccount;
