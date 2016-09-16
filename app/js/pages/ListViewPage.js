import React from 'react';
import {Col, Pagination, Nav, NavItem} from 'react-bootstrap';
import PageTitle from '../components/PageTitle';
import ListView from '../components/ModelViews/ListView';
import InfoPanel from '../components/InfoPanel';
import SearchBox from '../components/SearchBox';
import axios from 'axios';
import {BASE_URL} from '../constants';

class ListViewPage extends React.Component{
    constructor(){
	super();
	this.state = {
	    page:1,
	    ordering:0,
	    num_pages:1,
	    tags:[],
	    q:null
	};
    }
    resetState(){
	this.state = {
	    page:1,
	    ordering:0,
	    num_pages:1,
	    tags:[],
	    q:null
	};
	this.state.page = 1;
    }	
    construct_data_url(props = this.props){
	const tags = this.state.tags.length>0? this.state.tags.join(','):'';
	const ordering = props.route.orderings[this.state.ordering];
	const q = this.state.q? this.state.q:'';
	return `/api/list/${props.route.model}/?page=${this.state.page}&ordering=${ordering}&tags=${tags}&q=${q}`;
    }
    getPageCount(props = this.props){
	const q = this.state.q? this.state.q:'';
	axios.get(`/api/count/${props.route.model}/?tags=${this.state.tags}&q=${q}`) 
	    .then(({data})=> {if(!this.ignoreLastFetch) this.setState({num_pages:Math.floor(data.count/15)+1});})
	    .catch((error)=> console.log(error)); 
    }
    updateListData(props = this.props){
	this.getPageCount(props);
	axios.get(this.construct_data_url(props)) 
	    .then(({data})=> {if(!this.ignoreLastFetch) this.setState({data});})
	    .catch((error)=> console.log(error)); 
    }
    componentWillUnmount(){
	this.ignoreLastFetch = true; 
    }
    componentDidMount(){
	this.updateListData();
    }
    componentWillReceiveProps(newProps){
	this.resetState();
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
    setQuery(q){
	this.resetState();
	this.setState({q});
	this.state.q=q;
	this.updateListData();
    }
    render(){
	const inlineBlock = {
	    'display':'inline-block'
	};
	const orderingButtons = this.props.route.orderings.map((name, i)=>
							    <NavItem eventKey={i} key={i}>
							       {this.props.route.orderings[i].slice(1,this.props.route.orderings[i].length)}
							    </NavItem>);
	return ( 
		<div> 
		<PageTitle model={this.props.route.model} title={this.props.route.title} src={`/api/create/${this.props.route.model}/`} />
		<span style={{position:'relative', bottom:'20px'}}>sort by:</span> <Nav bsStyle="pills" style={{...inlineBlock, marginBottom:'10px'}} activeKey={this.state.ordering} onSelect={this.handleOrderingSelect.bind(this)}>
		{orderingButtons}
		</Nav> 
		<SearchBox setQuery={this.setQuery.bind(this)}/>
		<ListView data={this.state.data} class={this.props.route.class} bsStyle={this.props.route.bsStyle} model={this.props.route.model} detail_url={`${BASE_URL}${this.props.route.model}/`} />
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
		</div>
	);
    }
};
export default ListViewPage; 
