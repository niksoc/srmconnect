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
import CommentThread from '../components/CommentThread';
import TagList from '../components/common/TagList';

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
	    .catch(console.error); 
    }
    init(props = this.props, context = this.context){
	if(props.route.votes && context.isLoggedIn){
	    this.checkvoted();
	}
	this.updateData(props);
    }
    componentDidMount(){
	this.init();
    } 
    componentWillUnmount(){
	this.ignoreLastFetch = true; 
    }
    componentWillReceiveProps(newProps, newContext){
	if(newProps.params.id !== this.props.params.id || this.context.isLoggedIn!=newContext.isLoggedIn){ 
	    this.init(newProps, newContext);
	} 
    } 
    render(){ 
	const fields = this.state.data.fields; 
	if(this.state.error)
	    return <h3>{this.state.error}</h3>;
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
	    const tags = <TagList tag_names={fields.tag_names} bsStyle={this.props.route.bsStyle} />;
	    let viewAll = null; 
	    let vote = null;
	    let comments = null;
	    if(this.props.route.comments){
		comments = <CommentThread for={this.props.route.model} id={this.props.params.id}/>;
	    }
	    if(this.props.route.votes){
		let votelink = null;
		if(this.state.voted)
		    votelink = <a style={{marginRight:'5px'}} onClick={this.unvote.bind(this)}>unvote</a>;
		else votelink = <a style={{marginRight:'5px'}} onClick={this.vote.bind(this)}>vote</a>;
		vote = <span>{fields.num_votes} votes <LoggedInVisible element={votelink}/></span>;
	    } 
	    const options = (<DetailOptions owner={fields.created_by} item={this.props.route.model} edit_src={`/api/edit/${this.props.route.model}/${this.state.data.pk}/`} delete_src={`/api/delete/${this.props.route.model}/${this.state.data.pk}/`}/>);
	    const image = fields.image? <Image src={fields.image} responsive/> : null;
	    return( 
		    <div style={{marginBottom:'40px'}}> 
		    <PageTitle model={this.props.route.model} title={this.props.route.title} src={`/api/create/${this.props.route.model}/`} />
		    <div>
		    <h3 style={borderBottom}>{fields.title}<span>{options}</span></h3>
		    <div style={{display:'inline-block'}} className="pull-right">{fields.num_views} views {vote}</div>
		    <div style={{...borderBottom,overflow:'hidden',width:'100%'}}>
		    {image}
		    <Markdown>{fields.text}</Markdown>
		    {tags}
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

SimpleDetailViewPage.contextTypes = {
  isLoggedIn: React.PropTypes.bool
};

export default SimpleDetailViewPage;










