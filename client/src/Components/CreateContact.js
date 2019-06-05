import React, { Component } from 'react';
import axios from 'axios';
// import logo from './Contacts.png';

// console.log(logo);

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

        axios.post('http://localhost:3001/api/contact/' + userId + '/addContact/', newContact)
            .then(res => console.log(res.data));
        
        this.setState({
            contact_name: '',
            contact_phone: '',
            contact_email: ''
        })
    }

    render() {
        return (
			
            <div style={{marginTop: 10}}>
                <h3>Create New Contact</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Contact Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.contact_name}
                                onChange={this.onChangeContactName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Contact Phone: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.contact_phone}
                                onChange={this.onChangeContactPhone}
                                />
                    </div>
                    <div className="form-group">
                        <label>Contact Email: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.contact_email}
                                onChange={this.onChangeContactEmail}
                                />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Contact" className="btn btn-primary" />							
					</div>
                </form>
			</div>
																						
        )
    }
}
