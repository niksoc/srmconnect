import React from 'react';
import GenericModal from './common/GenericModal';
import FormFrame from './common/FormFrame';

const FormFrameModal = (props) => {
    const formFrame = (<FormFrame src={props.src} />); 
    return ( <GenericModal {...props} children={formFrame} /> );
};

export default FormFrameModal;
	 

    
 
