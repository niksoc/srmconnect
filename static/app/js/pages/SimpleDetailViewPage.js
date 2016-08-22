import React from 'react';
import {pullRight} from 'react-bootstrap';
import axios from 'axios';
import Markdown from '../components/Markdown';
import PageTitle from '../components/PageTitle';
import LoadingIndicator from '../components/LoadingIndicator';
import UserThumb from '../components/UserThumb';
import Timestamp from '../components/Timestamp';

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
	const fields = this.state.data.fields;
	if(fields){
	    const modified_by = (fields.modified !== fields.created)? (<div pullRight>
								       last edited: <UserThumb id={fields.modified_by} />
								       </div>) : null;
	 
	return(
		<div> 
		<PageTitle title={this.props.route.title} src={`/api/create/${this.props.route.model}/`} />
		<div>
		<h3>{fields.title}</h3>
		<hr className="inset"/>
		<div>
		<Markdown>{fields.text}</Markdown>
		<hr className="inset"/>
		<Timestamp title='modified' datetime={fields.modified} />
		<Timestamp title='created' datetime={fields.created} />
		{modified_by} 
		<div pullRight>created by: <UserThumb id={fields.created_by} /></div>
		</div>
		</div>
		</div>
	);
	}
	else return (<LoadingIndicator />);
	
    }
}

export default SimpleDetailViewPage;










