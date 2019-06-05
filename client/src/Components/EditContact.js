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
    }

    componentDidMount()
    {
        this.updateContact();
    }
        updateContact = async() => {
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
            <div>
                <h3 align="center">Update Contact</h3>
                <form onSubmit={this.onSubmit}>
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
                        <input type="submit" value="Update Contact" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
