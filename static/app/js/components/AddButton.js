import React from 'react';
import AddIcon from './AddIcon';
import FormFrameModal from './FormFrameModal';
import LoggedInVisible from '../visibility/LoggedInVisible'; 

const AddButtonBase = (props) => (
	<FormFrameModal style={props.style} src={props.src} buttonText={AddIcon} title={'New ' + props.item} />
);

const AddButton = (props) => {
    const button = (<AddButtonBase {...props} />);
    return(<LoggedInVisible element={button} /> );
};

export default AddButton;










