import React from 'react';
import {Nav, NavItem, PageHeader} from 'react-bootstrap';
import PageTitle from '../components/PageTitle';
import SimpleDetailViewPage from './SimpleDetailViewPage';
import DetailView from '../components/ModelViews/DetailView';
import axios from 'axios';
import {BASE_URL} from '../constants';
import FEATURES from '../features';

class QuestionAnswerPage extends React.Component{
    constructor(){
	    super();
	    this.state = {
		answers:[] 
        };
    }
    updateData(props = this.props){
	axios.get(`/api/list/answer/?id=${props.params.id}`) 
	    .then(({data})=> {if(!this.ignoreLastFetch) this.setState({answers:data});})
	    .catch((error)=> console.error(error)); 
    }
    init(){
	this.updateData(); 
    }
    componentDidMount(){
	this.init();
    } 
    componentWillUnmount(){
	this.ignoreLastFetch = true; 
    }
    componentWillReceiveProps(newProps){
	if(newProps.pk !== this.props.pk){
	    this.init();
	}
    } 
    render(){
	const question = <SimpleDetailViewPage route={this.props.route} params={this.props.params}/>;
	const answers = this.state.answers.map((ans,i)=><DetailView key={i} route={{votes:true, comments:true, model:'answer'}} fields={ans}/>);
	return (<div>{question}
		    <PageTitle title='Answer' src={`/api/create/answer/?id=${this.props.params.id}`} />
		{answers}</div>);
    }
};

export default QuestionAnswerPage;
