import React from 'react';
import PageTitle from '../components/PageTitle';
import axios from 'axios';

class SimpleDetailViewPage extends React.Component{
    constructor(){
	super();
	this.state = {
	    data : {}
	};
    }
    updateData(props = this.props){
	axios.get(`/api/detail/${props.route.model}/${props.params.id}/`) 
	    .then(({data})=> {if(!this.ignoreLastFetch) this.setState({data});})
	    .catch((error)=> console.log(error)); 
    }
    componentDidMount(){
	this.updateData();
    } 
    componentWillUnmount(){
	this.ignoreLastFetch = true; 
    }
    componentWillReceiveProps(newProps){
	this.updateData(newProps);
    }
    render(){
	let str = '';
	for (var property in this.state.data.fields) {
	    if (this.state.data.fields.hasOwnProperty(property)) {
		str+= property + this.state.data.fields[property] + "\n\n\n";
	    }
	}
	return(
		<div> 
		<PageTitle title={this.props.route.title} src={`/api/create/${this.props.route.model}/`} />
		{str} 
		</div>
	);
	
    }
}

export default SimpleDetailViewPage;










