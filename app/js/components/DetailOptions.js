import React from 'react';
import {Glyphicon, DropdownButton, MenuItem} from 'react-bootstrap';
import OwnerVisible from '../visibility/OwnerVisible';
import OwnerOrModeratorVisible from '../visibility/OwnerOrModeratorVisible';
import FormFrameModal from './FormFrameModal';

const DetailOptions = (props)=>{
    const icon = <Glyphicon glyph="menu-down" />;
    const editButton = (<MenuItem eventKey="1">
			<FormFrameModal style={props.style} src={props.edit_src} buttonText='Edit' title={'Edit ' + props.item} />
			</MenuItem>);
    const id = props.edit_src.split('/').slice(3).join(' ').replace(/[\&\?=]/g, ' ');
    const button = (
	    <DropdownButton bsStyle='link' title={icon} noCaret id={`edit and delete options for ${id}`}>
	    <span><OwnerVisible element={editButton} owner={props.owner} /></span>
	    <span><MenuItem eventKey="2">
			<FormFrameModal style={props.style} src={props.delete_src} buttonText='Delete' title={'Delete ' + props.item} />
	    </MenuItem></span>
	    </DropdownButton>
    );   
    
    return <OwnerOrModeratorVisible element={button} owner={props.owner} />;
};

DetailOptions.propTypes = {
    item:React.PropTypes.string,
    delete_src:React.PropTypes.string,
    edit_src:React.PropTypes.string,
    owner:React.PropTypes.number
};

export default DetailOptions;












