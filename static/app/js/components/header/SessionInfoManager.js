import React from 'react';
import {Navbar, Nav, NavItem, MenuItem, NavDropdown} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import GenericModal from '../common/GenericModal';
import {BASE_URL} from '../../constants';
import LoginForm from './LoginForm';

class SessionInfoManager extends React.Component{
    onSelectHandler(eventkey){
	if(eventkey===1) browserHistory.push(BASE_URL + 'profile/' + this.context.user.id);
	if(eventkey===2) location.pathname = 'app/logout';
    }
    render(){
	if(this.context.isLoggedIn)
	    return ( 
		    <NavDropdown onSelect={this.onSelectHandler.bind(this)} title={this.context.user.display_name} id="user-details-dropdown">
		<MenuItem eventKey={1}>Profile</MenuItem>
		<MenuItem divider />
		<MenuItem eventKey={2}>Logout</MenuItem>
		</NavDropdown>
	    );
	else return (
		<Nav>
		<NavItem><GenericModal buttonText='Login/SignUp' title='Login/SignUp' children={LoginForm} /></NavItem>
		</Nav>
	);
    } 
}

SessionInfoManager.contextTypes = {
    isLoggedIn: React.PropTypes.bool,
    user: React.PropTypes.object 
};

export default SessionInfoManager;
 








