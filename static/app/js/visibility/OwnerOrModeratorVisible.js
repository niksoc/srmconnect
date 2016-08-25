import React from 'react';

const OwnerOrModeratorVisible = (props, context) =>{
    if(context.isLoggedIn && (props.user===this.context.user.user || this.context.isModerator))
	return (<span>{props.element}</span>);
    else return null;
};


OwnerOrModeratorVisible.contextTypes = {
    isLoggedIn: React.PropTypes.bool,
    isModerator:React.PropTypes.bool,
    user: React.PropTypes.object 
};

export default OwnerOrModeratorVisible;













