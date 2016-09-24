import React from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import AddIcon from './AddIcon';
import FormFrameModal from './FormFrameModal';
import LoggedInVisible from '../visibility/LoggedInVisible'; 

const AddButtonBase = (props) => {
    const addButtonTooltip = <Tooltip id={'new ' + props.item}>{'New ' + props.item}</Tooltip>;
    const buttonText = <OverlayTrigger placement="right" overlay={addButtonTooltip}>{AddIcon}</OverlayTrigger>;
    return <FormFrameModal style={props.style} src={props.src} buttonText={buttonText} title={'New ' + props.item} />;
};

const AddButton = (props) => {
    return (<AddButtonBase {...props} />);
};

export default AddButton;










