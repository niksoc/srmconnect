import React from 'react';
import {pullRight} from 'react-bootstrap';
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

class SimpleDetailViewPage extends React.Component{
    constructor(){
	super();
	this.state = {
	    data : {},
	    subscribed:false,
	    voted:false
	};
    }
    updateData(props = this.props){
	axios.get(`/api/detail/${props.route.model}/${props.params.id}/`) 
	    .then(({data})=> {if(!this.ignoreLastFetch) this.setState({data});})
	    .catch((error)=> this.setState({error: 'What you\'re looking for doesn\'t exist'})); 

	if(props.route.comments && this.context.isLoggedIn)
	    axios.get(`/app/is_subscribed/?for=${props.route.model}&id=${props.params.id}`) 
	    .then(({data})=> {if(!this.ignoreLastFetch) this.setState({subscribed:data.subscribed});})
	    .catch((error)=> console.error(error)); 
    }
    subscribe(){
	axios.get(`/app/subscribe/?for=${this.props.route.model}&id=${this.props.params.id}`)
	    .then((response)=>this.setState({subscribed:true}));
    }
    unsubscribe(){
	axios.get(`/app/unsubscribe/?for=${this.props.route.model}&id=${this.props.params.id}`)
	    .then((response)=>this.setState({subscribed:false}));
    }
    vote(){
	axios.get(`/app/vote/?for=${this.props.route.model}&id=${this.props.params.id}`)
	    .then((response)=>this.setState({voted:true}));
    }
    unvote(){
	axios.get(`/app/unvote/?for=${this.props.route.model}&id=${this.props.params.id}`)
	    .then((response)=>this.setState({voted:false}));
    }
    checkvoted(props=this.props){
	    axios.get(`/app/voted/?for=${props.route.model}&id=${props.params.id}`) 
	    .then(({data})=> {if(!this.ignoreLastFetch) this.setState({voted:data.voted});})
	    .catch((error)=> console.error(error)); 
    }
    fetchComments(num = '', force=false, props = this.props){
	if(!this.lastmodified || force)
	axios.get(`/api/list/comment/?for=${props.route.model}&id=${props.params.id}&num=${num}`)
	    .then((response)=> {this.lastmodified = response.headers['last-modified'];this.setState({comments:response.data});}) 
	    .catch((error)=> {if(error.response.status!=304) console.error(error);}); 
	else
	axios.get(`/api/list/comment/?for=${props.route.model}&id=${props.params.id}&num=${num}&cache=${new Date().getTime()}`,
		  {headers:{'If-Modified-Since':this.lastmodified}}) 
	    .then((response)=> {if(!this.ignoreLastFetch){
		this.lastmodified = response.headers['last-modified'];
		this.setState({comments: response.data});}})
	    .catch((error)=> {if(error.response.status!==304) console.error(error);}); 
    } 
    init(props = this.props, context = this.context){
	this.updateData(props);
	if(props.route.comments){
	    this.setState({error:false, commentsExpanded:false});
	    this.fetchComments(3);
	} 
	if(props.route.votes && context.isLoggedIn){
	    this.checkvoted();
	}
    }
    componentDidMount(){
	this.init();
    } 
    componentWillUnmount(){
	this.ignoreLastFetch = true; 
	if(this.interval)
	    window.clearInterval(this.interval);
    }
    componentWillReceiveProps(newProps, newContext){
	if(newProps.params.id !== this.props.params.id || this.context.isLoggedIn!=newContext.isLoggedIn){ 
	    this.init(newProps, newContext);
	} 
    } 
    expandComments(){
	this.fetchComments('',true);
	if(!this.interval){
	    this.interval = window.setInterval(this.fetchComments.bind(this), 10000);
	}
	this.setState({commentsExpanded:true});
    }
    render(){ 
	const numComments = 2;
	const fields = this.state.data.fields; 
	if(this.state.error)
	    return <h3>{this.state.error}</h3>;
	if(fields && (!this.props.comments || this.state.comments)){
	    const style = {
		position:'relative',
		top:'10px'
	    };
	    const borderBottom = {
		borderBottom: '1px solid #e5e5e5',
		paddingBottom:'10px',
		paddingTop:'10px'
	    };
	    const modified_ut = fields.modified_by!==fields.created_by?	<UserThumb id={fields.modified_by} />:null;
	    const modified_by = (fields.modified !== fields.created)? (<div className="pull-right">
								       <Timestamp style={style} title='last edited' datetime={fields.modified} />
								       {modified_ut}
								       </div>) : null; 
	    let viewAll = null; 
	    let commentBoxes = null;
	    let addCommentModal = null;
	    let subscribe = null;
	    let vote = null;
	    if(this.props.route.comments){
		if(this.state.subscribed)
		    subscribe = <a style={{marginRight:'5px'}} onClick={this.unsubscribe.bind(this)}>unsubscribe</a>;
		else
		    subscribe = <a style={{marginRight:'5px'}} onClick={this.subscribe.bind(this)}>subscribe</a>;
	    }
	    if(this.props.route.votes){
		let votelink = null;
		if(this.state.voted)
		    votelink = <a style={{marginRight:'5px'}} onClick={this.unvote.bind(this)}>unvote</a>;
		else votelink = <a style={{marginRight:'5px'}} onClick={this.vote.bind(this)}>vote</a>;
		vote = <span>{fields.num_votes} votes <LoggedInVisible element={votelink}/></span>;
	    } 
	    const options = (<DetailOptions owner={fields.created_by} item={this.props.route.model} edit_src={`/api/edit/${this.props.route.model}/${this.state.data.pk}/`} delete_src={`/api/delete/${this.props.route.model}/${this.state.data.pk}/`}/>);
	    if(this.props.route.comments && this.state.comments){
		let comments = null;
		if(!this.state.commentsExpanded && this.state.comments.length>numComments){
		    comments = this.state.comments.slice(0,numComments).reverse();
		    viewAll = <a onClick={this.expandComments.bind(this)}>view all comments</a>;
		}
		else{ 
		    comments = this.state.comments;
		    addCommentModal = <FormFrameModal title="Add Comment" buttonText="add comment" src={`/api/create/comment/?for=${this.props.route.model}&id=${this.props.params.id}`}/>;
		}
		commentBoxes = comments.map((fields,i)=><CommentBox style={borderBottom} key={i} for={this.props.route.model} fields={fields} />); 
	    }
	    return( 
		    <div style={{marginBottom:'40px'}}> 
		    <PageTitle title={this.props.route.title} src={`/api/create/${this.props.route.model}/`} />
		    <div>
		    <h3 style={borderBottom}>{fields.title}<span>{options}</span></h3>
		    <div style={{display:'inline-block'}} className="pull-right">{fields.num_views} views {vote}</div>
		    <div style={{...borderBottom,overflow:'hidden',width:'100%'}}>
		    <Markdown>{fields.text}</Markdown>
		    <div className="pull-right" style={{marginLeft:'10px'}}><Timestamp style={style} title='created' datetime={fields.created} /><UserThumb id={fields.created_by} /></div>
		    {modified_by} 
		</div>
		    <LoggedInVisible element={subscribe} />
		    {commentBoxes}
		{viewAll}
<LoggedInVisible element={addCommentModal}/>
		</div>
		    </div>
	    );
	}
	else return (<LoadingIndicator />);
	
    } 
}

SimpleDetailViewPage.contextTypes = {
  isLoggedIn: React.PropTypes.bool
};

export default SimpleDetailViewPage;










