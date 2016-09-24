import React from 'react';
import {Media, Label} from 'react-bootstrap';
import {Link} from 'react-router';
import axios from 'axios';
import * as constants from '../constants';

export class UserThumb extends React.Component{
    constructor(){
	super();
	this.state = {
	    data:{}
	};
    }
    componentDidMount(){
	axios.get(`/api/detail/user_profile/${this.props.user}/`)
	    .then(({data})=>{if(!this.ignoreLastFetch) this.setState({data});})
	    .catch((error)=>console.error(error));
    }
    componentWillUnmount(){
	this.ignoreLastFetch = true;
    }
    render(){
	if(Object.keys(this.state.data).length === 0 && this.state.data.constructor === Object)
	    return null;
	const fields=this.state.data.fields;
	const style = {
	    fontSize:'1.4rem'
	};
	return(
		<Media>
		<Media.Left align="middle">
		<Link to={constants.BASE_URL + 'profile/'+ fields.user+'/'}>
		<img width={50} height={50} alt={fields.display_name} src={fields.profile_image} />
		</Link>
		</Media.Left>
		<Media.Body style={{maxWidth:'110px'}}>
		<Media.Heading style={style}>
		<Link to={constants.BASE_URL
 + 'profile/'+fields.user}>{fields.display_name}</Link>
		</Media.Heading>
		dept: {fields.dept_name? fields.dept_name : '-'} <br/>
		year: {fields.year? fields.year : '-'}
		{fields.isModerator?<Label bsStyle='info' style={{marginLeft:'5px', padding:'0px 2px'}}>mod</Label>:null}
	    </Media.Body>
	    </Media>
		
	);
    }
}

UserThumb.propTypes = {
    id: React.PropTypes.number
};

export default UserThumb;









