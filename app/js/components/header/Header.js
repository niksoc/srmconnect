import React from 'react';
import {Button, Navbar, Nav, NavItem, MenuItem, NavDropdown, DropdownButton} from 'react-bootstrap';
import axios from 'axios';
import SessionInfoManager from './SessionInfoManager';
import FormFrameModal from '../FormFrameModal';
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
	if(!this.lastmodified)
	    axios.get(BASE_URL + 'notifications/?cache=' + new Date().getTime()) 
	    .then((response)=>{this.lastmodified = response.headers['last-modified'];this.setState({notifications:response.data});})
	    .catch((error)=> {if(error.status!=='304') console.error(error);}); 
	else
	    axios.get(BASE_URL + 'notifications/?cache=' + new Date().getTime(),
		  {headers:{'If-Modified-Since':this.lastmodified}}) 
	    .then((response)=> {
		this.lastmodified = response.headers['last-modified'];
		this.setState({notifications: response.data});})
	    .catch((error)=> {if(error.response.status!==304) console.error(error);}); 

    }
    componentDidMount(){
	this.init();
    }
    componentWillReceiveProps(nxtProps, nextContext){
	if(nextContext.isLoggedIn && !this.interval){
	    this.interval = window.setInterval(this.init.bind(this), 10000);
	}
    }
    componentWillUnmount(){
	if(this.interval){
	    window.clearInterval(this.interval);
	    this.interval = null;
	}
    }
    clearNotifications(){
	axios.get(BASE_URL + 'clear_notifications/');
	this.setState({notifications:[]});
    }
    render(){
	let notifications = null;
	let title = 'Notifications';
	let clearButton = null;
	if(this.state.notifications.length>0){
	    title = 'Notifications !';
	    clearButton = <MenuItem key={0} eventKey={1} onSelect={this.clearNotifications.bind(this)}>clear</MenuItem>; 
	}
	const notif_list = this.state.notifications.map((n,i)=><MenuItem key={i+1} onClick={()=>browserHistory.push(BASE_URL+n.url.slice(0,-1))}>{n.message} - <Timestamp title='' datetime={n.created}/></MenuItem>);
	notifications = (
		<NavDropdown id="Notifications" title={title}> 
		{clearButton}
		{notif_list}
		</NavDropdown> 
	);
	const addTags = <NavItem><FormFrameModal src="/api/create/tag/" buttonText="Add Tag" title="Add Tag" /></NavItem>;
	return (
		<header> 
		<Navbar>
		<Navbar.Header>
		<Navbar.Brand>SRM | Connect</Navbar.Brand>
		<DropdownButton id="srm connect option" title=""> 
		<MenuItem eventKey={1.1}>About(under const.)</MenuItem>
		<MenuItem eventKey={1.3}>Join us!(under const.)</MenuItem>
		</DropdownButton> 
		<Navbar.Toggle />
		</Navbar.Header>
		<Navbar.Collapse>
		<Nav pullRight>
		<NavItem><FormFrameModal buttonText='Feedback' title='Feedback' src='/api/create/feedback/'/></NavItem>
		<LoggedInVisible element={addTags}/>
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
