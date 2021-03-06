import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';
import axios from 'axios';

export default class EditContact extends Component {

    constructor(props)
    {
        super(props);

        this.state =
        {
            contact_name: localStorage.getItem('contactName'),
            contact_phone: localStorage.getItem('contactPhone'),
            contact_email: localStorage.getItem('contactEmail'),
            contact_id: localStorage.getItem('contactId')
        }

        this.onChangeContactName = this.onChangeContactName.bind(this);
        this.onChangeContactPhone = this.onChangeContactPhone.bind(this);
        this.onChangeContactEmail = this.onChangeContactEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        if(this.state.contact_id === '')
        {
            alert("Attempting to access a page without valid credentials.\nReturning to login page. Please log in to a valid account.");
            this.props.history.push('/');
            return;
        }
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

        if(this.state.contact_name === '' &&
            this.state.contact_phone === '' &&
            this.state.contact_email === '')
            {
                alert("Please fill in at least one field");
                return;
            }

        const newContact = {
            contact_name: this.state.contact_name,
            contact_phone: this.state.contact_phone,
            contact_email: this.state.contact_email
        }
        
        var userId = localStorage.getItem('userId');

        axios.put('/api/contact/' + userId + '/updateContact/' + this.state.contact_id, newContact)
            .then(res => console.log(res.data));
        
        
        
        this.setState({
            contact_name: '',
            contact_phone: '',
            contact_email: ''
        })

        localStorage.removeItem('contactName');
        localStorage.removeItem('contactPhone');
        localStorage.removeItem('contactEmail');
        localStorage.removeItem('contactId');

        this.props.history.push('/contactList');
        window.location.reload();
    }   

    render() {
        return (
            <div className="App__ContactPage" height="auto">
                <div className="PageSwitcher">
                    <NavLink to="/contactList" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Contacts</NavLink>		
                    <NavLink exact to="/createContact" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Create New Contact</NavLink>
                    <NavLink exact to="/" className="PageSwitcher__Item--Logout">Logout</NavLink>
                </div>
                <h3 className="FormTitle"><font size="6">Edit Contact</font></h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <label className="FormField__Label">Name</label>
                        <input  type="text"
                                className="FormField__Input"
                                placeholder="Enter Name"
                                value={this.state.contact_name}
                                onChange={this.onChangeContactName}/>
                    </div>
                    <div className="form-group">
                        <label className="FormField__Label">Phone</label>
                        <input  type="text"
                                className="FormField__Input"
                                placeholder="Enter Phone Number"
                                value={this.state.contact_phone}
                                onChange={this.onChangeContactPhone}/>
                    </div>
                    <div className="form-group">
                        <label className="FormField__Label">Email</label>
                        <input  type="text"
                                className="FormField__Input"
                                placeholder="Enter Email"
                                value={this.state.contact_email}
                                onChange={this.onChangeContactEmail}/>
                    </div>

                    <br/>

                    <div className="form-group">
                        <input type="submit" value="Edit Contact" className="FormField__Button" />
                    </div>
                </form>
            </div>
        )
    }
}