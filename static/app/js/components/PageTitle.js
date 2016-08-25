import React from 'react';
import {PageHeader} from 'react-bootstrap';
import AddButton from './AddButton';

const PageTitle = (props) => {
    return (
	    <PageHeader style={props.style}>{props.title} <small><AddButton item={props.title} style={{color:'black'}} src={props.src} /></small> </PageHeader>
    );
};

export default PageTitle;


	 
