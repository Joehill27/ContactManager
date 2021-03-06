import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';
import axios from 'axios';

const Contact = props => (
    <tr>
        <td>{props.contact.contact_name}</td>
        <td>{props.contact.contact_number}</td>
        <td>{props.contact.contact_email}</td>
        <td>{props.contact.id}</td>

        <td>
            <Link to={"/edit/"+props.contact._id}>Edit</Link>
        </td>
    </tr>
);

class ContactList extends Component {
    constructor() {
        super();
        if(localStorage.getItem('userId') == -1)
            alert("Attempting to access a page without valid credentials.\nReturning to login page. Please log in to a valid account.");
        
        this.state = {
            userId: localStorage.getItem('userId'),
            searchParam : '',
            contacts: [],
            filtered: [] 
        };

        this.handleChange = this.handleChange.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
        this.refresh = this.refresh.bind(this);
        this.editContactHandler = this.editContactHandler.bind(this);
        this.deleteContactHandler = this.deleteContactHandler.bind(this);
    }

    componentDidMount() {
        if(this.state.userId == -1)
        {
            this.props.history.push('/');
            return;
        }
        this.getContacts();
    }


    checkNameContact(contact, filter) {
        let name = contact.contact_name;
        if(name.contains(filter))
            return true;
    }

    searchHandler() {
        let currentContacts = [];
        currentContacts = this.state.contacts;
        let filteredContacts = [];
        let searchTerm = this.state.searchParam.toLowerCase();
        if(searchTerm !== "") {
            currentContacts.forEach(function(arrayItem) {
                // console.log(arrayItem);
                var name = arrayItem.contact_name.toString();
                var phone = arrayItem.contact_phone.toString();
                var email = arrayItem.contact_email.toString();
                name = name.toLowerCase();
                email = email.toLowerCase();
                // console.log("Here is the name: "+name);
                if(name.includes(searchTerm) || phone.includes(searchTerm) || email.includes(searchTerm)) {
                    filteredContacts.push(arrayItem);
                    // console.log(name);
                }
            });
            // console.log(filteredContacts);
            this.setState({
                contacts: filteredContacts,
                searchParam : ""
            });
        } 
        else {
            alert('Search term is empty!');
        }
    }

    refresh() {
        window.location.reload();
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    getContacts = async() => {
        const response = await axios.get('/api/contact/'+ this.state.userId + '/getContacts/')
        console.log(response);
        this.setState({contacts : response.data.contacts});
    }

    contactList()
    {
        try {
            return this.state.contacts.map(function(currentContact, i){
                return <Contact contact={currentContact} key={i} />;
            })
        } catch(error) {
            console.log(error);
        }
    }

    renderContact(contact, index)
    {
        return (
            <tr key={index}>
                <td color="#0FF000"><font color="#FFFFFF">{contact.contact_name}</font></td>
                <td color="#0FF000"><font color="#FFFFFF">{contact.contact_phone}</font></td>
                <td color="#0FF000"><font color="#FFFFFF">{contact.contact_email}</font></td>
                <td><button  className="Contact__Button ml-15" onClick={() => this.editContactHandler(contact)} >Edit</button></td>
                <td><button className="Contact__Button__Red ml-15" onClick={() => this.deleteContactHandler(index)} >Delete</button></td>
            </tr>
        )
    }

    deleteContactHandler = async(index) => {
        var array = [...this.state.contacts];
        var contactToDelete = array[index];
        var contactId = contactToDelete._id;
        console.log(contactToDelete);
        console.log(contactId);
        array.splice(index, 1);
        this.setState({contacts: array});
        const response = await this.deleteContact(contactId);
        console.log(response);
    }

    deleteContact = async(contactId) => {
        try {
            return await axios.delete('/api/contact/' + this.state.userId + '/deleteContact/' + contactId);
        } catch(error) {
            console.log(error);
        }
    }

    editContactHandler(contact) {

        localStorage.setItem('contactId', contact._id);
        localStorage.setItem('contactName', contact.contact_name);
        localStorage.setItem('contactPhone', contact.contact_phone);
        localStorage.setItem('contactEmail', contact.contact_email);

        this.props.history.push('/editContact');
    }
	
    render()
    {
        return (
            <div className="App">
                <div className="App__ContactPage" height = "auto">
                    <div className="PageSwitcher">
                        <NavLink to="/contactList" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Contacts</NavLink>		
                        <NavLink exact to="/createContact" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Create New Contact</NavLink>
                        <NavLink exact to="/" className="PageSwitcher__Item--Logout">Logout</NavLink>
                    </div>

                    <h3 className="FormTitle__mb-10"><font size="6">Contacts</font></h3>
                    
                    <div className="FormField">
                        <input type="text" id="username" className="FormField__Input" placeholder="Search Contacts" name="searchParam"
                            value={this.state.searchParam} onChange={this.handleChange} />
                    </div> 
                    
                    <div className="FormField">
                        <button onClick={this.searchHandler} className="FormField__Button mr-20">Search</button>
                        <button onClick={this.refresh} className="FormField__Button mr-20">All Contacts</button>
                     </div> 

                    <div>
                        <table className="table table-striped" style={{ marginTop: 20 }}>
                            <thead>
                                <tr>
                                    <th color="#FFFFFF"><font color="#FFFFFF">Name</font></th>
                                    <th color="#FFFFFF"><font color="#FFFFFF">Number</font></th>
                                    <th color="#FFFFFF"><font color="#FFFFFF">Email</font></th>
                                    <th color="#FFFFFF"><font color="#FFFFFF">Action</font></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.contacts.map(this.renderContact.bind(this))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactList;
