import React from 'react';
import GenericModal from './common/GenericModal';
import FormFrame from './common/FormFrame';

const FormFrameModal = (props) => {
    const formFrame = <FormFrame src={props.src} />; 
    const tagForm = <FormFrame height="200px" src="/api/create/tag" />;
    const form = <div>{formFrame}<hr/><p><strong>Can't find the tag you're looking for?<br/>Create it here and then add it to your post (note:not all posts (eg. answers) can have tags) Rarely used tags may be deleted.</strong></p>{tagForm}</div>;
    return ( <GenericModal {...props} children={form} /> );
};

export default FormFrameModal;
	 

    
 










