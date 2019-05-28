import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Contact = props => (
    <tr>
        <td>{props.contact.contact_name}</td>
        <td>{props.contact.contact_number}</td>
        <td>{props.contact.contact_email}</td>

        <td>
            <Link to={"/edit/"+props.contact._id}>Edit</Link>
        </td>
    </tr>
)

export default class ContactsList extends Component {
    constructor(props)
    {
        super(props);
        this.state = {contacts: []};
    }

    componentDidMount()
    {
        axios.get('http://localhost:3000/contacts/')
            .then(response => {
                this.setState({ contacts: response.data});
            })
            .catch(function (error){
                console.log(error);
            })
    }

    contactList()
    {
        return this.state.contacts.map(function(currentContact, i){
            return <Contact contact={currentContact} key={i} />;
        })
    }

    render()
    {
        return (
            <div>
                <h3>Contacts List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Number</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.contactList() }
                    </tbody>
                </table>
                        
            </div>
        )
    }
}
