import React from 'react';
import {Button, Navbar, Nav, NavItem, MenuItem, NavDropdown, DropdownButton} from 'react-bootstrap';
import SessionInfoManager from './SessionInfoManager';

class Header extends React.Component {
    render(){
	return (
		<header> 
		<Navbar>
		<Navbar.Header>
		<Navbar.Brand>srmXchange</Navbar.Brand>
		<DropdownButton id="srmXchange option" title=""> 
		<MenuItem eventKey={1.1}>About</MenuItem>
		<MenuItem eventKey={1.2}>Feedback</MenuItem>
		<MenuItem eventKey={1.3}>Join us!</MenuItem>
		</DropdownButton> 
		<Navbar.Toggle />
		</Navbar.Header>
		<Navbar.Collapse>
		<Nav pullRight>
		<NavItem eventKey={1} href="#">Notifications</NavItem>
		<SessionInfoManager />
		</Nav>
		</Navbar.Collapse>
		</Navbar> 
		</header> 
	);
    }
};

export default Header
