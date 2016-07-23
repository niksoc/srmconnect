import React from 'react';
import {Navbar, Nav, NavItem, MenuItem, NavDropdown, DropdownButton} from 'react-bootstrap';
import GenericModal from '../common/GenericModal';
import LoginForm from './LoginForm';

class SessionInfoManager extends React.Component{
    render(){
	if(false)
	    return (
		<Dropdown eventKey={3} title="Nikhil Satish" id="basic-dropdown">
		<MenuItem eventKey={3.3}>Manage Account</MenuItem>
		<MenuItem divider />
		<MenuItem eventKey={3.3}>Logout</MenuItem>
		</Dropdown>
	    );
	else return (
		<Nav>
		<NavItem><GenericModal title='Register' /></NavItem>
		<NavItem><GenericModal title='Login' children={LoginForm} /></NavItem>
		</Nav>
	);
    } 
}

export default SessionInfoManager;
 








