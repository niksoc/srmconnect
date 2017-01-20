// almost a copy of simpleDetailViewPage, should refactor
import React from 'react';
import {pullRight} from 'react-bootstrap';
import axios from 'axios';
import Markdown from '../Markdown';
import PageTitle from '../PageTitle';
import LoadingIndicator from '../LoadingIndicator';
import UserThumb from '../UserThumb';
import Timestamp from '../Timestamp';
import CommentBox from '../CommentBox';
import LoggedInVisible from '../../visibility/LoggedInVisible';
import FormFrameModal from '../FormFrameModal';
import CommentThread from '../CommentThread';
import DetailOptions from '../DetailOptions';

class DetailView extends React.Component{
    constructor(){
	super();
	this.state = {
	    subscribed:false
	};
    }
    vote(){
	axios.get(`/app/vote/?for=${this.props.route.model}&id=${this.props.fields.id}`)
	    .then((response)=>this.setState({voted:true}));
    }
    unvote(){
	axios.get(`/app/unvote/?for=${this.props.route.model}&id=${this.props.fields.id}`)
	    .then((response)=>this.setState({voted:false}));
    }
    checkvoted(props=this.props){
	    axios.get(`/app/voted/?for=${props.route.model}&id=${props.fields.id}`) 
	    .then(({data})=> {if(!this.ignoreLastFetch) this.setState({voted:data.voted});})
	    .catch((error)=> console.error(error)); 
    }
    init(props = this.props, context = this.context){
	if(props.route.votes && context.isLoggedIn){
	    this.checkvoted();
	}
    }
    componentDidMount(){
	this.init();
    } 
    componentWillUnmount(){
	this.ignoreLastFetch = true; 
    }
    componentWillReceiveProps(newProps, newContext){
	if(newProps.fields.id !== this.props.fields.id || this.context.isLoggedIn!=newContext.isLoggedIn){ 
	    this.init(newProps, newContext);
	}
    } 
    render(){ 
	const fields = this.props.fields;
	if(fields){
	    const style = {
		position:'relative',
		top:'10px'
	    };
	    const borderBottom = {
		borderBottom: '1px solid #e5e5e5',
		paddingBottom:'10px',
		paddingTop:'10px'
	    };
	    const modified_ut = fields.modified_by!==fields.created_by?	<UserThumb user={fields.modified_by} />:null;
	    const modified_by = (fields.modified !== fields.created)? (<div className="pull-right">
								       <Timestamp style={style} title='last edited' datetime={fields.modified} />
								       {modified_ut}
								       </div>) : null; 
	    let viewAll = null; 
	    let vote = null;
	    if(this.props.route.votes){
		let votelink = null;
		if(this.state.voted)
		    votelink = <a style={{marginRight:'5px'}} onClick={this.unvote.bind(this)}>unvote</a>;
		else votelink = <a style={{marginRight:'5px'}} onClick={this.vote.bind(this)}>vote</a>;
		vote = <span>{fields.num_votes} votes <LoggedInVisible element={votelink}/></span>;
	    } 
	    const options = (<DetailOptions owner={fields.created_by} item={this.props.route.model} edit_src={`/api/edit/${this.props.route.model}/${fields.id}/`} delete_src={`/api/delete/${this.props.route.model}/${fields.id}/`}/>);
	    let comments = null;
	    if(this.props.route.comments){
		comments = <CommentThread for={this.props.route.model} id={this.props.fields.id}/>;
	    }
	    return( 
		    <div style={{...borderBottom, paddingBottom:'30px', marginBottom:'20px'}}> 
		    <div>
		    <div style={{display:'inline-block'}}><span style={{fontWeight:700}}>{vote}</span>{options}</div>
		    <div style={{...borderBottom,overflow:'hidden',width:'100%'}}>
		    <Markdown>{fields.text}</Markdown>
		    <div className="pull-right" style={{marginLeft:'10px'}}><Timestamp style={style} title='created' datetime={fields.created} /><UserThumb user={fields.created_by} /></div>
		    {modified_by} 
		</div>
		    {comments}
		</div>
		    </div>
	    );
	}
	else return (<LoadingIndicator />);
	
    } 
}

DetailView.contextTypes = {
  isLoggedIn: React.PropTypes.bool
};

export default DetailView;










