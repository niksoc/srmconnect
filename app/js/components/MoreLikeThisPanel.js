import React from 'react';
import {Nav, NavItem, PageHeader} from 'react-bootstrap';
import PageTitle from '../components/PageTitle';
import ListView from '../components/ModelViews/ListView';
import DetailView from '../components/ModelViews/DetailView';
import axios from 'axios';
import {BASE_URL} from '../constants';
import FEATURES from '../features';
import LinkItem from './LinkItem';


class MoreLikeThisPanel extends React.Component{
    constructor(){
	    super();
	    this.state = {
            data:{}
        };
    }
    construct_data_url(props = this.props, model){
	return `/api/more_like_this/${props.model}/${props.id}/?model=${model}&num=5`;
    }
    updateListData(props = this.props){
	FEATURES.forEach((feature) => {
	const model = feature.model;
    	axios.get(this.construct_data_url(props, model)) 
	        .then(({data})=> {if(!this.ignoreLastFetch){
		    let data1 = this.state.data;
		    data1[model] = data;
		    this.setState({
			data:data1
		    });
		}
				 })
		.catch((error)=> console.log(error));
    }); 
    }
    componentDidMount(){
	this.updateListData();
    } 
    componentWillUnmount(){
	this.ignoreLastFetch = true; 
    }
    componentWillReceiveProps(newProps){
	this.setState({
	    data:[]
	});
	this.updateListData(newProps);
    }
    render(){
	const inlineBlock = {
	    'display':'inline-block'
	};
	const orderingStyle = {
	    'marginTop':'20px'
	};
	const features = FEATURES.map((feature,i)=><div key={i}><h4 style={{paddingLeft:'10px'}}>{feature.title}</h4>
						   <ListView data={this.state.data[feature.model]} class={LinkItem} 
				      bsStyle={feature.bsStyle} model={feature.model} style={{paddingLeft:'20px'}}
				      detail_url={`${BASE_URL}${feature.model}/`} /></div>);
	return ( 
		<div style={{paddingLeft:'20px',border:'1px solid black', marginTop:'60px', paddingBottom:'10px'}}> 
		<h2>Related</h2>
		{features}
		</div>
	);
    }
};

export default MoreLikeThisPanel;
