import React from 'react';
import {Panel, Label, Badge} from 'react-bootstrap';
 
const GenericPanelItem = (props)=>{
    const margin = {
	marginLeft:'5px' 
    };
    const labels = props.labels.map((label,i)=>(<Label key={i} bsStyle="info" style={margin}>{label}</Label>)); 
    const badges = props.badges.map((badge,i)=>(<Badge key={i} style={margin}>{badge}</Badge>));
    const title = (<span>{props.title} {badges}</span>);
    return (
	    <Panel header={title} footer={labels} bsStyle={props.bsStyle}>
	    {props.content}
	</Panel>
    );
};

export default GenericPanelItem;















