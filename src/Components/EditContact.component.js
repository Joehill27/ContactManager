import React, { Component } from 'react';
import axios from 'axios';

export default class ContactsList extends Component {

    constructor(props)
    {
        super(props);

        this.state =
        {
            contact_name: '',
            contact_phone: '',
            contact_email: ''
        }
    }

    componentDidMount()
    {
        axios.get('http://localhost:3000/contacts'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    contact_name: response.data.contact_name,
                    contact_phone: response.data.contact_name,
                    contact_email: response.data.contact_email
                })
            })
            .catch(function(error){
                console.log(error);
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
