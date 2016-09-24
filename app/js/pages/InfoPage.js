import React from 'react';
import {PageHeader} from 'react-bootstrap';
import axios from 'axios';
import Markdown from '../components/Markdown';
import * as constants from '../constants';
import {getViewPortWidth} from '../utils';


class InfoPage extends React.Component{
    constructor(){
	super();
	this.state = {
	    data:{}
	};
    }
    fetchData(props = this.props){
	axios.get(`/api/detail/app_text/${props.route.path+'_page'}`) 
	    .then(({data})=> {if(!this.ignoreLastFetch) this.setState({data});})
	    .catch((error)=> {}); 
    }
    componentWillUnmount(){
	this.ignoreLastFetch = true; 
    }
    componentDidMount(){
	this.fetchData();
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
	else {
	    return (
		    <div>
		    <PageHeader>{this.props.route.title}</PageHeader>
		    <Markdown>{this.state.data.text}</Markdown>
		    </div>
	    );
	}
    }
}
	
export default InfoPage;
