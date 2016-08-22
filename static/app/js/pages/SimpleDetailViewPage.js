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
	    const style = {
		position:'relative',
		top:'10px'
	    };
	    const borderBottom = {
		borderBottom: '1px solid #eeeeee',
		paddingBottom:'10px'
	    };
	    const modified_ut = fields.modified_by!==fields.created_by?	<UserThumb id={fields.modified_by} />:null;
	    const modified_by = (fields.modified !== fields.created)? (<div className="pull-right">
								       <Timestamp style={style} title='last edited' datetime={fields.modified} />
								       {modified_ut}
								       </div>) : null; 
	 
	return(
		<div> 
		<PageTitle title={this.props.route.title} src={`/api/create/${this.props.route.model}/`} />
		<div>
		<h3 style={borderBottom}>{fields.title}</h3>
		<div>
		<Markdown style={borderBottom}>{fields.text}</Markdown>
		<div className="pull-right" style={{marginLeft:'10px'}}><Timestamp style={style} title='created' datetime={fields.created} /><UserThumb id={fields.created_by} /></div>
		{modified_by} 
		</div>
		</div>
		</div>
	);
	}
	else return (<LoadingIndicator />);
	
    }
}

export default SimpleDetailViewPage;










