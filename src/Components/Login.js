import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {

  constructor() {
    super();

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

  handleSubmit(e) {
    e.preventDefault();

    console.log('The form was sent with data:');
    console.log(this.state);

    // axios.post()
  }

  render() {

    return (
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
            <Link exact to="/" className="FormField__Link">Create an account</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;