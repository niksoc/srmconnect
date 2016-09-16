import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {pure} from 'recompose';
import LoadingIndicator from '../LoadingIndicator';
 
const ListView = (props) => {
    const itemsPerRow = 1;
    if(props.data){
	if(props.data.length===0) return <span style={props.style}>no items</span>;
	const items = props.data.map((entry)=>
					  React.createElement(props.class,
							      {...entry,
							       bsStyle:props.bsStyle,
							       uri:props.detail_url}));
	const arrangedItems = items.map((entry,i)=><Col key={i} sm={12/itemsPerRow}>{entry}</Col>);
	let rows = [];
	for(var i=0;i+itemsPerRow<arrangedItems.length;i+=itemsPerRow){
	    let slice = arrangedItems.slice(i,i+itemsPerRow); 
	    rows = rows.concat(<Row key={i}>{slice}</Row>);
	}
	let slice = arrangedItems.slice(i,arrangedItems.length); 
	rows = rows.concat(<Row key={i}>{slice}</Row>);
	return (<div style={props.style}>{rows}</div>);
    }
    else return (<LoadingIndicator />);
};

ListView.propTypes = {
    model:React.PropTypes.string,
    class:React.PropTypes.func,
    bsStyle:React.PropTypes.string,
    detail_url:React.PropTypes.string,
    data:React.PropTypes.array
};

export default pure(ListView);
	
    





