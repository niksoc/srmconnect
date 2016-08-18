import React from 'react';
import AddIcon from './AddIcon';
import FormFrameModal from './FormFrameModal';
import LoggedInVisible from '../LoggedInVisible';

const AddButtonBase = (props) => (
	<FormFrameModal src={props.src} buttonText={AddIcon} title={'New ' + props.item} />
);

const AddButton = (props) => {
    const button = (<AddButtonBase {...props} />);
    return(<LoggedInVisible element={button} /> );
};

export default AddButton;










