import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';
import axios from 'axios';

import CreateNew from "./CreateContact";
import EditContact from "./EditContact";

const Contact = props => (
    <tr>
        <td>{props.contact.contact_name}</td>
        <td>{props.contact.contact_number}</td>
        <td>{props.contact.contact_email}</td>

        <td>
            <Link to={"/edit/"+props.contact._id}>Edit</Link>
        </td>
    </tr>
);

class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {contacts: []};
    }

    componentDidMount()
    {
        axios.get('http://localhost:3001/contacts/')
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
            <div className="App">

    
        <div className="App__Aside">		
        </div>
		

        <div className="App__Form">
         
                <label><font size="6">Contact Manager</font></label>
          	    <div className="PageSwitcher">
            		<NavLink to="/contactList" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Contacts</NavLink>		
            		<NavLink exact to="/createContact" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Create New Contact</NavLink>
          		</div>	
        </div>
        </div>
        );
    }
}

export default ContactList;
