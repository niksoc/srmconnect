import React from 'react';
import AddButton from './AddButton';

const PageTitle = (props) => {
    return (
	    <h1 style={props.style}>{props.title} <AddButton item={props.title} src={props.src} /> </h1>
    );
};

export default PageTitle;


	 
