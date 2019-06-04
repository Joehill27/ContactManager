import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from './Login';
import CreateAccount from './CreateAccount';
import ContactList from './ContactList';
import CreateContact from './CreateContact';
import EditContact from './EditContact';
import Home from '../App';

export default() => {
    return(
        <BrowserRouter>
            <div>
                <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/createAccount" component={CreateAccount} />
            <Route path="/login" component={Login} />
            <Route path="/contactList" component={ContactList} />
            <Route path="/createContact" component={CreateContact} />
            <Route path="/editContact" component={EditContact} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}