import React from 'react';
import {Media} from 'react-bootstrap';
import {Link} from 'react-router';
import axios from 'axios';

export class UserThumb extends React.Component{
    constructor(){
	super();
	this.state = {
	    data:{}
	};
    }
    componentDidMount(){
	axios.get(`/api/detail/user_profile/${this.props.id}/`)
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
		<Link to={'user_profile/'+fields.user}>
		<img width={50} height={50} alt={fields.display_name} src={fields.profile_image} />
		</Link>
		</Media.Left>
		<Media.Body>
		<Media.Heading style={style}>
		<Link to={'user_profile/'+fields.user}>{fields.display_name}</Link>
		</Media.Heading>
		dept: {fields.dept? fields.dept : '-'} <br/>
		year: {fields.dept? fields.year : '-'}
	    </Media.Body>
	    </Media>
		
	);
    }
}

UserThumb.propTypes = {
    id: React.PropTypes.number
};

export default UserThumb;









