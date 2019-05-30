import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const encryptor = require('./PasswordEncryptor');

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

    const salt = 10;
    //const salt = encryptor.Salt(10);
    //console.log("salt: ");
    //console.log(salt);
    //console.log("\n");
    console.log("encryption: ");
    console.log(encryptor.Encrypt(this.state.password, salt));
    
    // axios.post()
  }


  render() {

      return(
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