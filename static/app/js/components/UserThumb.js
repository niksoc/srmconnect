import React from 'react';
import {Media} from 'react-bootstrap';
import {Link} from 'react-router';
import {pure} from 'recompose';

const UserThumb = (props) => (
	<Media>
	<Media.Left>
	<Link to={'user_profile/'+props.fields.user}>
	<img width={50} height={50} alt={props.fields.display_name} src={props.fields.profile_image} />
	</Link>
	</Media.Left>
	<Media.Body>
        <Media.Heading>
	<Link to={'user_profile/'+props.fields.user}>{props.fields.display_name}</Link>
	</Media.Heading>
	dept: {props.fields.dept? props.fields.dept : '-'} <br/>
	year: {props.fields.dept? props.fields.year : '-'}
	</Media.Body>
	</Media>	
);

UserThumb.propTypes = {
    fields: React.PropTypes.object
};

export default pure(UserThumb);

