import React from 'react';
import {pure} from 'recompose';
import {Label} from 'react-bootstrap'; 

const TagList = (props)=>{
    const tags = props.tag_names.map((label,i)=>(<Label key={i} bsStyle={props.bsStyle} 
						      style={{marginLeft:'5px'}}>{label}</Label>)); 
    return <span {...props.style}>{tags}</span>;
};

TagList.propTypes = {
    tag_names:React.PropTypes.array,
    bsStyle:React.PropTypes.string
};

export default pure(TagList);
