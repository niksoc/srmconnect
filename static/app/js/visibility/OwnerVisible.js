import React from 'react';

const OwnerVisible = (props, context) =>{
    if(context.isLoggedIn && props.user===this.context.user.user )
	return (<span>{props.element}</span>);
    else return null;
};


OwnerVisible.contextTypes = {
    isLoggedIn: React.PropTypes.bool,
    isModerator:React.PropTypes.bool,
    user: React.PropTypes.object 
};

export default OwnerVisible;













