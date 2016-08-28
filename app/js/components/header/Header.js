import React from 'react';
import {Button, Navbar, Nav, NavItem, MenuItem, NavDropdown, DropdownButton} from 'react-bootstrap';
import axios from 'axios';
import SessionInfoManager from './SessionInfoManager';
import Timestamp from '../Timestamp';
import LoggedInVisible from '../../visibility/LoggedInVisible';
import {BASE_URL} from '../../constants';
import {Link, browserHistory} from 'react-router';

class Header extends React.Component {
    constructor(){
	super();
	this.state ={notifications:[]};
    }
    init(context = this.context){
	if(context.isLoggedIn)
	axios.get(BASE_URL + 'notifications/') 
	    .then(({data})=> this.setState({notifications:data}))
	    .catch((error)=> console.error(error)); 
    }
    componentDidMount(){
	this.init();
    }
    clearNotifications(){
	axios.get(BASE_URL + 'clear_notifications/');
	this.setState({notifications:[]});
    }
    componentWillReceiveProps(nextProps, nextContext){
	this.init(nextContext);
    }
    render(){
	let notifications = null;
	let title = 'Notifications';
	let clearButton = null;
	if(this.state.notifications.length>0){
	    title = 'Notifications !';
	    clearButton = <MenuItem key={0} eventKey={1} onSelect={this.clearNotifications.bind(this)}>clear</MenuItem>; 
	}
	const notif_list = this.state.notifications.map((n,i)=><MenuItem key={i+1} onClick={()=>browserHistory.push(BASE_URL+n.url)}>{n.message} - <Timestamp title='' datetime={n.created}/></MenuItem>);
	notifications = (
		<NavDropdown id="Notifications" title={title}> 
		{clearButton}
		{notif_list}
		</NavDropdown> 
	);
	return (
		<header> 
		<Navbar>
		<Navbar.Header>
		<Navbar.Brand>SRM | Connect</Navbar.Brand>
		<DropdownButton id="srm connect option" title=""> 
		<MenuItem eventKey={1.1}>About</MenuItem>
		<MenuItem eventKey={1.2}>Feedback</MenuItem>
		<MenuItem eventKey={1.3}>Join us!</MenuItem>
		</DropdownButton> 
		<Navbar.Toggle />
		</Navbar.Header>
		<Navbar.Collapse>
		<Nav pullRight>
		<LoggedInVisible element={notifications}/>
		<SessionInfoManager />
		</Nav>
		</Navbar.Collapse>
		</Navbar> 
		</header> 
	);
    }
};

Header.contextTypes = {
  isLoggedIn: React.PropTypes.bool
};

export default Header;
