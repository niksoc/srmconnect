import React from 'react';
import {Panel, Col, Row} from 'react-bootstrap'; 
import GenericPanelItem from './GenericPanelItem';

const GenericPanelList = (props) => { 
    const items = props.items.map((item,i)=><GenericPanelItem key={i} labels={item.labels} badges={item.badges} content={item.content} title={item.title} bsStyle={props.bsStyle} /> );
    return (
	<div>
	{items}
	</div>
    );
};

export default GenericPanelList;
    









