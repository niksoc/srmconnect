import React from 'react';
import {Col, Panel, Nav, NavItem} from 'react-bootstrap';
import axios from 'axios';
import Markdown from './Markdown';
import * as constants from '../constants';
import {getViewPortWidth} from '../utils';


class InfoPanel extends React.Component{
    constructor(){
	super();
	this.state = {
	    data:{},
	    open: false
	};
    }
    fetchData(props = this.props){
	axios.get(`/api/detail/app_text/${props.title}`) 
	    .then(({data})=> {if(!this.ignoreLastFetch) this.setState({data});})
	    .catch((error)=> console.log(error)); 
    }
    componentWillUnmount(){
	this.ignoreLastFetch = true; 
    }
    componentWillReceiveProps(newProps){
	this.setState({
	    data:{}
	});
	this.fetchData(newProps);
    }
    render(){
	if(Object.keys(this.state.data).length === 0 && this.state.data.constructor === Object)
	    return null;
	else if(getViewPortWidth() > constants.sm){
	    return (
		    <Panel style={{marginTop:'60px'}}>
		    <Markdown>{this.state.data.text}</Markdown>
		    </Panel>
	    );
	} else {
	    return (
		    <div>
		    <h4 onClick={ ()=> this.setState({ open: !this.state.open })}>
		    New to the site/this section? <small>read on<span className="caret" /></small>
		    </h4>
		    <Panel collapsible expanded={this.state.open}>
		    <Markdown>{this.state.data.text}</Markdown>
		    </Panel>
		    </div>
	    );
	}
    }
}
	
export default InfoPanel;
