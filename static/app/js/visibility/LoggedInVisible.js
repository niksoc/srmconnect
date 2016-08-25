import React from 'react';

const LoggedInVisible = (props, context) =>{
    if(context.isLoggedIn)
	return (<span>{props.element}</span>);
    else return null;
};


LoggedInVisible.contextTypes = {
    isLoggedIn: React.PropTypes.bool,
    user: React.PropTypes.object 
};

export default LoggedInVisible;









