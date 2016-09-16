import React from 'react';
import {Link} from 'react-router';
import {PageHeader} from 'react-bootstrap';
import {BASE_URL} from '../constants';
import AddButton from './AddButton';

const PageTitle = (props) => {
    return (
	    <PageHeader style={props.style}>
	    <Link to={BASE_URL+props.model+'/'} style={{color:'inherit'}}>{props.title}</Link>
	    <small style={{marginLeft:'20px', marginTop:'3px'}}><AddButton item={props.title} style={{color:'black'}} src={props.src} /></small>
	    </PageHeader>
    );
};

export default PageTitle;


	 
