import React from 'react';
import {Nav, NavItem, PageHeader} from 'react-bootstrap';
import PageTitle from '../components/PageTitle';
import ListView from '../components/ModelViews/ListView';
import DetailView from '../components/ModelViews/DetailView';
import axios from 'axios';
import {BASE_URL} from '../constants';

class ListViewPage extends React.Component{
    constructor(){
	    super();
	    this.state = {
            data:{}
        };
    }
    construct_data_url(props = this.props, model){
	const ordering = '-created';
	return `/api/list/${model}/?page=1&ordering=${ordering}`;
    }
    updateListData(props = this.props){
    this.props.route.features.forEach((feature) => {
	const model = feature.model;
    	axios.get(this.construct_data_url(props, model)) 
	        .then(({data})=> {
                let data1 = this.state.data;
                data1[model] = data.slice(0,2); 
                if(!this.ignoreLastFetch) this.setState({
                 data:data1
            });
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
    const latestFeatures = this.props.route.features.map((feature,i)=><div key={i}><PageTitle title={feature.title} style={inlineBlock} 
			src={`/api/create/${feature.model}/`} />
		<ListView data={this.state.data[feature.model]} class={feature.class} 
			bsStyle={feature.bsStyle} model={feature.model}
			 detail_url={`${BASE_URL}${feature.model}/`} /></div>);
	return ( 
		<div> 
		<PageHeader>{this.props.route.mainTitle}</PageHeader>
		{latestFeatures}
		</div>
	);
    }
};
export default ListViewPage; 
