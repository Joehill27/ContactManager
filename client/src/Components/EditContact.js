import React, { Component } from 'react';
import axios from 'axios';

export default class EditContact extends Component {

    constructor(props)
    {
        super(props);

        this.state =
        {
            contact_name: '',
            contact_phone: '',
            contact_email: '',
            contact_id: ''
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
        
        console.log("56");
        //TODO get userID from somewhere......
        var userId = localStorage.getItem('userId');
        var contactId = this.state.contact_id;

        axios.put('http://localhost:3001/api/contact/' + userId + '/updateContact/' + contactId, newContact)
            .then(res => console.log(res.data));
        
        this.setState({
            contact_name: '',
            contact_phone: '',
            contact_email: ''
        })

        this.props.history.push('/contactList');
    }

    componentDidMount()
    {
        this.updateContact();
    }
        updateContact = async() => {
            console.log("78");
            //TODO get the contactId from somewhere
            const response = 
                await axios.put(
                    'http://localhost:/3001/api/contact/'+ 
                    localStorage.getItem('userId') + "/updateContact/"+ this.state.contact_id);
            this.setState({
                contact_name: response.contact.contact_name,
                contact_phone: response.contact.contact_name,
                contact_email: response.contact.contact_email
            })

        }

    render() {
        return (
            <div className="App__ContactPage" height="auto">
                <h3>Update Contact</h3> 
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <label>Name</label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.contact_name}
                                onChange={this.onChangeContactName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.contact_phone}
                                onChange={this.onChangeContactPhone}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.contact_email}
                                onChange={this.onChangeContactPhone}
                        />
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Contact" className="FormField__Button" />
                    </div>
                </form>
            </div>
        )
    }
}
