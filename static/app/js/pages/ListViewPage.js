import React from 'react';
import {Col, Pagination, Nav, NavItem} from 'react-bootstrap';
import PageTitle from '../components/PageTitle';
import ListView from '../components/ModelViews/ListView';
import InfoPanel from '../components/InfoPanel';
import axios from 'axios';
import {BASE_URL} from '../constants';

class ListViewPage extends React.Component{
    constructor(){
	super();
	this.state = {
	    page:1,
	    ordering:0,
	    tags:[],
	    num_pages:1
	};
    }
    construct_data_url(props = this.props){
	const tags = this.state.tags.length>0? this.state.tags.join(','):'';
	const ordering = props.route.orderings[this.state.ordering];
	return `/api/list/${props.route.model}/?page=${this.state.page}&ordering=${ordering}&tags=${tags}`;
    }
    getPageCount(props = this.props){
	axios.get(`/api/count/${props.route.model}/?tags=${this.state.tags}`) 
	    .then(({data})=> {if(!this.ignoreLastFetch) this.setState({num_pages:Math.floor(data.count/15)+1});})
	    .catch((error)=> console.log(error)); 
    }
    updateListData(props = this.props){
	axios.get(this.construct_data_url(props)) 
	    .then(({data})=> {if(!this.ignoreLastFetch) this.setState({data});})
	    .catch((error)=> console.log(error)); 
    }
    componentWillUnmount(){
	this.ignoreLastFetch = true; 
    }
    componentDidMount(){
	this.getPageCount();
	this.updateListData();
    }
    componentWillReceiveProps(newProps){
	this.setState({
	    data:[],
	    page:1,
	    ordering:0,
	    tags:[],
	    num_pages:1
	});
	this.getPageCount(newProps);
	this.updateListData(newProps);
    }
    handlePageSelect(eventKey){
	if(!(eventKey>this.state.num_pages)){
	    this.setState({
		page: eventKey
	    });
	    this.state.page = eventKey;
	    this.updateListData();
	}
    }
    handleOrderingSelect(eventKey){
	    this.setState({
		ordering: eventKey,
		page: 1
	    });
	    this.state.ordering = eventKey;
	    this.state.page = 1;
	    this.updateListData();
    }	
    render(){
	const inlineBlock = {
	    'display':'inline-block'
	};
	const orderingStyle = {
	    'marginTop':'65px'
	};
	const orderingButtons = this.props.route.orderings.map((name, i)=>
							    <NavItem eventKey={i} key={i}>
							       {this.props.route.orderings[i].slice(1,this.props.route.orderings[i].length)}
							    </NavItem>);
	return ( 
		<div> 
		<Col className="info-panel" sm={4}>
		<InfoPanel title='latest' />
		</Col>
		<Col sm={8}>
		<PageTitle title={this.props.route.title} style={inlineBlock} src={`/api/create/${this.props.route.model}/`} />
		<Nav style={orderingStyle} bsStyle="tabs" activeKey={this.state.ordering} onSelect={this.handleOrderingSelect.bind(this)} pullRight>
		{orderingButtons}
		</Nav> 
		<ListView data={this.state.data} class={this.props.route.class} bsStyle={this.props.route.bsStyle} model={this.props.route.model} detail_url={`${BASE_URL}${this.props.route.title}/`} />
		<Pagination
	    prev
	    next
	    first
	    last
	    ellipsis
	    boundaryLinks
	    items={this.state.num_pages}
	    maxButtons={3}
	    activePage={this.state.page}
	    onSelect={this.handlePageSelect.bind(this)} />
		</Col>
		</div>
	);
    }
};
export default ListViewPage; 
