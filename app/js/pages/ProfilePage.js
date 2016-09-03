import React from 'react';
import {Glyphicon,PageHeader,Media,Image,Col,Well,Row} from 'react-bootstrap';
import {Link} from 'react-router';
import axios from 'axios';
import LoadingIndicator from '../components/LoadingIndicator';
import * as constants from '../constants';
import {pure} from 'recompose';
import Timestamp from '../components/Timestamp';
import FormFrameModal from '../components/FormFrameModal';
import TagList from '../components/common/TagList';
import UserThumb from '../components/UserThumb';
import MultiListViewPage from '../pages/MultiListViewPage';
import Markdown from '../components/Markdown';
import LinkItem from '../components/LinkItem';
import FEATURES from '../features';


export class ProfilePage extends React.Component{
    constructor(){
	super();
	this.state = {
	    data:{}
	};
    }
    fetchData(props = this.props){
	axios.get(`/api/detail/user_profile/${props.params.id}/`)
	    .then(({data})=>{if(!this.ignoreLastFetch) this.setState({data});})
	    .catch((error)=>console.error(error));
    }
    componentDidMount(){
	this.fetchData();
    }
    componentWillReceiveProps(newProps){
	this.setState({data:{}});
	this.fetchData(newProps);
    }
    componentWillUnmount(){
	this.ignoreLastFetch = true;
    }
    render(){
	if(Object.keys(this.state.data).length === 0 && this.state.data.constructor === Object)
	    return <LoadingIndicator />;
	const fields=this.state.data.fields;
	const profileBodyStyle={
	    'border':'gray',
	    'background':'solid gray' 
	};

	const editIcon = <Glyphicon glyph="pencil" />;
	const editButton = <FormFrameModal title="Edit Profile" buttonText={editIcon} src={`/api/edit/user_profile/${fields.user}/`} />;
	const interests = <TagList tag_names={fields.interest_names} bsStyle="primary" />;
	if(fields.profile_text === null) fields.profile_text = '';
	return(
		<div>
		<PageHeader>Profile <small>{editButton}</small></PageHeader>
		<Row>
		<Col xs={4} md={4}>
		<Image src={fields.profile_image} thumbnail responsive/>
		</Col>
		</Row>
		<br/>
		
		<h1 style={{borderBottom:'1px solid black'}}>{fields.display_name}<small style={{marginLeft:'10px'}}>{fields.num_views} views</small></h1>
		<table id='profile-table'> 
		<tbody>
		<tr><td>First Name</td><td>{fields.first_name}</td></tr>
		<tr><td>Last Name</td><td>{fields.last_name}</td></tr>
		<tr><td>Interests</td><td>{interests}</td></tr>
		<tr><td>Year</td><td>{fields.year}</td></tr>
		<tr><td>Registration Number</td><td>{fields.register_no}</td></tr>
		<tr><td>Course</td><td>{fields.course}</td></tr>
		<tr><td>Campus</td><td>{fields.campus}</td></tr>
		<tr><td>Department</td><td>{fields.dept_name}</td></tr>
		<tr><td>Profile text:</td><td><Markdown>{fields.profile_text}</Markdown></td></tr>
		</tbody>
		</table>
		<MultiListViewPage  route={{mainTitle:"Activity", features:FEATURES, created_by:fields.user, class:LinkItem}} />
		</div>
		
	);
    }
}

export default ProfilePage;
