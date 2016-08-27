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
	    data : {}
	};
    }
    updateData(props = this.props){
	axios.get(`/api/detail/${props.route.model}/${props.params.id}/`) 
	    .then(({data})=> {if(!this.ignoreLastFetch) this.setState({data});})
	    .catch((error)=> this.setState({data:{error: 'What you\'re looking for doesn\'t exist'}})); 
    }
    fetchComments(num = '', props = this.props){
	    axios.get(`/api/list/comment/?for=${props.route.model}&id=${props.params.id}&num=${num}`) 
	    .then(({data})=> {if(!this.ignoreLastFetch) this.setState({comments: data});})
	    .catch((error)=> console.log(error)); 
    } 
    init(){
	this.updateData();
	if(this.props.route.comments){
	    this.setState({commentsExpanded:false});
	    this.fetchComments(3);
	}
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
    expandComments(){
	this.fetchComments();
	this.setState({commentsExpanded:true});
    }
    render(){ 
	const numComments = 2;
	const fields = this.state.data.fields;
	if(this.state.data.error)
	    return <h3>{this.state.data.error}</h3>;
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
		    <div style={{display:'inline-block'}} className="pull-right">{fields.num_views} views</div>
		    <div style={{...borderBottom,overflow:'hidden',width:'100%'}}>
		    <Markdown>{fields.text}</Markdown>
		    <div className="pull-right" style={{marginLeft:'10px'}}><Timestamp style={style} title='created' datetime={fields.created} /><UserThumb id={fields.created_by} /></div>
		    {modified_by} 
		</div>
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

export default SimpleDetailViewPage;










