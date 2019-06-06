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
        this.state = {
            userId: localStorage.getItem('userId'),
            searchParam : '',
            contacts: [],
            filtered: [] 
        };

        this.handleChange = this.handleChange.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
        this.editContactHandler = this.editContactHandler.bind(this);
        this.deleteContactHandler = this.deleteContactHandler.bind(this);
    }

    componentDidMount() {
        // this.props.history.push('/contactList');
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

        // console.log(currentContacts);

        if(searchTerm !== "") {
            currentContacts.forEach(function(arrayItem) {
                // console.log(arrayItem);
                var name = arrayItem.contact_name.toString();
                name = name.toLowerCase();
                // console.log("Here is the name: "+name);
                if(name.includes(searchTerm.toLowerCase())) {
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


    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    getContacts = async() => {
        const response = await axios.get('http://localhost:3001/api/contact/'+ this.state.userId + '/getContacts/')
        console.log(response);
        this.setState({contacts : response.data.contacts});
    }

    contactList()
    {
        return this.state.contacts.map(function(currentContact, i){
            return <Contact contact={currentContact} key={i} />;
        })
    }

    renderContact(contact, index)
    {
        return (
            <tr key={index}>
                <td color="#0FF000"><font color="#FFFFFF">{contact.contact_name}</font></td>
                <td color="#0FF000"><font color="#FFFFFF">{contact.contact_phone}</font></td>
                <td color="#0FF000"><font color="#FFFFFF">{contact.contact_email}</font></td>
                {/* <button onClick={this.editContactHandler()} className="Contact__Button" >Edit</button> */}
                <button  className="Contact__Button" >Edit</button>
                {/* <button onClick={this.deleteContactHandler(index)} className="Contact__Button" >Delete</button> */}
                <button className="Contact__Button" onClick={() => this.deleteContactHandler(index)} >Delete</button>
            </tr>
        )
    }

    deleteContactHandler(index) {
        var array = [...this.state.contacts];
        array.splice(index, 1);
        this.setState({contacts: array});
        const response = axios.get('http://localhost:3001/api/contact' + this.state.userId + 'deleteContact/' + index);
    }

    editContactHandler() {
        this.props.history.push('/editContact');
    }
	
    render()
    {
        const data = this.contactList();
        return (
            <div className="App">
                <div className="App__ContactPage">              

                    <label><font size="6">Contact Manager</font></label>
                    <div className="PageSwitcher">
                        <NavLink to="/contactList" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Contacts</NavLink>		
                        <NavLink exact to="/createContact" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Create New Contact</NavLink>
                    </div>

                    <div className="FormField">
                        <label><font size="6">Search Contacts</font></label>
                        <input type="text" id="username" className="FormField__Input" placeholder="Enter Contact Name here" name="searchParam"
                            value={this.state.searchParam} onChange={this.handleChange} />
                    </div> 
                    <div className="FormField">
                        <button onClick={this.searchHandler} className="FormField__Button mr-20">Search</button>
                     </div> 

                    <div>
                        <h3>Contacts List</h3>
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
