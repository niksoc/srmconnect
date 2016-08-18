import React from 'react';
import AddButton from './AddButton';

const PageTitle = (props) => {
    return (
	    <h1>{props.title} <AddButton item={props.title} src={props.src} /> </h1>
    );
};

export default PageTitle;


	 
