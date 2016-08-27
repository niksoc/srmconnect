import React from 'react';

const OwnerVisible = (props, context) =>{
    if(context.isLoggedIn && props.owner===context.user.user )
	return props.element;
    else return null;
};


OwnerVisible.contextTypes = {
    isLoggedIn: React.PropTypes.bool,
    isModerator:React.PropTypes.bool,
    user: React.PropTypes.object 
};

export default OwnerVisible;













