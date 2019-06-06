import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';
import axios from 'axios';
// import logo from './Contacts.png';

// console.log(logo);

// var localHosting = 'http://localhost:3001';
var localHosting = '';

export default class CreateNew extends Component {
    constructor(props)
    {
        super(props);

        this.state =
        {
            contact_name: '',
            contact_phone: '',
            contact_email: ''
        }

        this.onChangeContactName = this.onChangeContactName.bind(this);
        this.onChangeContactPhone = this.onChangeContactPhone.bind(this);
        this.onChangeContactEmail = this.onChangeContactEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeContactName = e => {
        this.setState({
            contact_name: e.target.value
        });
    }

    onChangeContactPhone = e => {
        this.setState({
            contact_phone: e.target.value
        });
    }

    onChangeContactEmail = e => {
        this.setState({
            contact_email: e.target.value
        });
    }

    onSubmit = e => {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Contact Name: ${this.state.contact_name}`);
        console.log(`Contact Phone: ${this.state.contact_phone}`);
        console.log(`Contact Email: ${this.state.contact_email}`);

        const newContact = {
            contact_name: this.state.contact_name,
            contact_phone: this.state.contact_phone,
            contact_email: this.state.contact_email
        }

        //TODO get userID from somewhere......
        var userId = localStorage.getItem('userId');

        axios.post('/api/contact/' + userId + '/addContact/', newContact)
            .then(res => console.log(res.data));
        
        this.setState({
            contact_name: '',
            contact_phone: '',
            contact_email: ''
        })

        this.props.history.push('/contactList');
    }

    render() {
        return (
			<div className="App__ContactPage" height="auto">

                    <div className="PageSwitcher">
                        <NavLink to="/contactList" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Contacts</NavLink>		
                        <NavLink exact to="/createContact" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Create New Contact</NavLink>
                    </div>

                <label className="FormTitle"><font size="6">Create New Contact</font></label>
                <form onSubmit={this.onSubmit}>
                    <div className="FormField"> 
                        <label className="FormField__Label">Name</label>
                        <input  type="text"
                                className="FormField__Input"
                                placeholder="Enter Name"
                                value={this.state.contact_name}
                                onChange={this.onChangeContactName}
                        />
                    </div>
                    <div className="FormField">
                        <label className="FormField__Label">Phone</label>
                        <input 
                                type="text" 
                                className="FormField__Input"
                                placeholder="Enter Phone Number"
                                value={this.state.contact_phone}
                                onChange={this.onChangeContactPhone}
                                />
                    </div>
                    <div className="FormField">
                        <label className="FormField__Label">Email</label>
                        <input 
                                type="email" 
                                className="FormField__Input"
                                placeholder="Enter Email"
                                value={this.state.contact_email}
                                onChange={this.onChangeContactEmail}
                                />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Contact" className="FormField__Button" />							
					</div>
                </form>

			</div>
																						
        )
    }
}
