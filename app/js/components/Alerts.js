import React from 'react';
import {Button, Alert} from 'react-bootstrap';
import axios from 'axios'; 
import LoggedInVisible from '../visibility/LoggedInVisible';
import Markdown from './Markdown';
import {BASE_URL} from '../constants';

class Alerts extends React.Component {
    constructor(){
	super();
	this.state ={alerts:[]};
    }
    init(context = this.context){
	axios.get(BASE_URL + 'alerts/') 
	    .then((response)=>{this.setState({alerts:response.data});})
	    .catch(console.error); 
    }
    componentDidMount(){
	if(this.context.isLoggedIn)
	    this.init();
    }
    componentWillReceiveProps(nxtProps, nextContext){
	if(!this.context.isLoggedIn && nextContext.isLoggedIn)
	    this.init();
    }
    clearAlert(id,i,e){
	axios.get(BASE_URL + `clear_alert/${id}/`);
	let alerts = this.state.alerts;
	alerts.splice(i,1);
	this.setState({alerts});
    } 
    render(){
	let alerts = null;
	let title = 'alerts';
	const alert_list = this.state.alerts.map((n,i)=><Alert key={n.id} bsStyle="info" onDismiss={this.clearAlert.bind(this,n.id,i)}><Markdown>{n.text}</Markdown>
						 </Alert>);
	return <div>{alert_list}</div>; 
    }
};

Alerts.contextTypes = {
  isLoggedIn: React.PropTypes.bool
};

export default Alerts;





