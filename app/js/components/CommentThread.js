import React from 'react';
import {pullRight, Image} from 'react-bootstrap';
import axios from 'axios';
import Markdown from '../components/Markdown';
import PageTitle from '../components/PageTitle';
import LoadingIndicator from '../components/LoadingIndicator';
import UserThumb from '../components/UserThumb';
import Timestamp from '../components/Timestamp';
import CommentBox from '../components/CommentBox';
import LoggedInVisible from '../visibility/LoggedInVisible';
import FormFrameModal from '../components/FormFrameModal';
import DetailOptions from '../components/DetailOptions';
import TagList from '../components/common/TagList';

class CommentThread extends React.Component{
    constructor(){
	super();
	this.state = {
	    data : {},
	    subscribed:false,
	    voted:false
	};
    }
    is_subscribed(props = this.props){
	if(this.context.isLoggedIn)
	    axios.get(`/app/is_subscribed/?for=${props.for}&id=${props.id}`) 
	    .then(({data})=> {if(!this.ignoreLastFetch) this.setState({subscribed:data.subscribed});})
	    .catch((error)=> console.error(error)); 
    }
    subscribe(){
	axios.get(`/app/subscribe/?for=${this.props.for}&id=${this.props.id}`)
	    .then((response)=>this.setState({subscribed:true}));
    }
    unsubscribe(){
	axios.get(`/app/unsubscribe/?for=${this.props.for}&id=${this.props.id}`)
	    .then((response)=>this.setState({subscribed:false}));
    }
    fetchComments(num = '', force=false, props = this.props){
	if(!this.lastmodified || force)
	    axios.get(`/api/list/comment/?for=${props.for}&id=${props.id}&num=${num}`)
	    .then((response)=> {this.lastmodified = response.headers['last-modified'];this.setState({comments:response.data});}) 
	    .catch((error)=> {if(error.response.status!=304) console.error(error);}); 
	else
	    axios.get(`/api/list/comment/?for=${props.for}&id=${props.id}&num=${num}&cache=${new Date().getTime()}`,
		      {headers:{'If-Modified-Since':this.lastmodified}}) 
	    .then((response)=> {if(!this.ignoreLastFetch){
		this.lastmodified = response.headers['last-modified'];
		this.setState({comments: response.data});}})
	    .catch((error)=> {if(error.response.status!==304) console.error(error);}); 
    } 
    init(props = this.props, context = this.context){
	this.is_subscribed(props);
	this.setState({error:false, commentsExpanded:false,comments:[]});
	this.fetchComments(3,true,props);
	if(!this.interval){ 
	    this.interval = window.setInterval(this.fetchComments.bind(this), 10000);
	} 
    }
    componentDidMount(){
	this.init();
    } 
    componentWillUnmount(){
	this.ignoreLastFetch = true; 
	if(this.interval){
	    window.clearInterval(this.interval);
	    this.interval = false;
	}
    }
    componentWillReceiveProps(newProps, newContext){
	if(newProps.id !== this.props.id || this.context.isLoggedIn!=newContext.isLoggedIn){ 
	    this.init(newProps, newContext);
	} 
    } 
    expandComments(){
	this.fetchComments('',true);
	this.setState({commentsExpanded:true});
    }
    render(){ 
	const numComments = 2;
	const borderBottom = {
	    borderBottom: '1px solid #e5e5e5',
	    paddingBottom:'10px',
	    paddingTop:'10px'
	};
	let viewAll = null; 
	let commentBoxes = null;
	let addCommentModal = null;
	let subscribe = null;
	let vote = null;
	if(this.state.subscribed)
	    subscribe = <a style={{marginRight:'5px'}} onClick={this.unsubscribe.bind(this)}>unsubscribe</a>;
	else
	    subscribe = <a style={{marginRight:'5px'}} onClick={this.subscribe.bind(this)}>subscribe</a>;
	if(this.state.comments){
	    let comments = null;
	    if(!this.state.commentsExpanded && this.state.comments.length>numComments){
		comments = this.state.comments.slice(0,numComments).reverse();
		viewAll = <a onClick={this.expandComments.bind(this)}>view all comments</a>;
	    }
	    else{ 
		comments = this.state.comments;
		addCommentModal = <FormFrameModal title="Add Comment" buttonText="add comment" src={`/api/create/comment/?for=${this.props.for}&id=${this.props.id}`}/>;
	    }
	    commentBoxes = comments.map((fields,i)=><CommentBox style={borderBottom} key={i} for={this.props.for} fields={fields} />); 
	    return( 
		    <div style={{marginBottom:'40px'}}> 
		    <LoggedInVisible element={subscribe} />
		    {commentBoxes}
		{viewAll}
		{addCommentModal} 
		</div>
	    );
	}
	else return (<LoadingIndicator />);
	
    } 
}

CommentThread.contextTypes = {
    isLoggedIn: React.PropTypes.bool
};

export default CommentThread;
