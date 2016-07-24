import React from 'react';
import {Panel, Col, Row, ListGroup, ListGroupItem} from 'react-bootstrap'; 
import GenericPanelList from './GenericPanelList';

class LatestFeaturesPanel  extends React.Component{
    render(){
	const wantedData = [{ 
	    title:'Hot girl needed!',
	    content:'I need your help to save the world',
	    badges:['new','urgent'],
	    labels:['reactjs','python']
	},{ 
	    title:'Teammate for coding competition',
	    content:'400rs cash prize, 50-50 split',
	    badges:['new'],
	    labels:['c++']
	}];
	const availableData = [{ 
	    title:'Business mentor',
	    content:'I can guide you if you have an idea, look at my profile for details, enterpreneurship ftw!',
	    badges:['new'], 
	    labels:['entrepreneurship','business']
	},{ 
	    title:'Robotics Expert',
	    content:'I can give advice on what to learn, email only guys',
	    badges:[],
	    labels:['robotics','electronics']
	}]; 
	return ( 
		<Panel collapsible expanded={this.props.isExpanded}>
		<Row> 
		<Col sm={4}>
		<h4 className="hidden-sm">Experience Speaks</h4>
		<ListGroup>
		<ListGroupItem href="#">My experience preparing for GRE - Amitav Gupta</ListGroupItem>
		<ListGroupItem href="#">How I got a job at Microsoft - Kumar K</ListGroupItem>
		</ListGroup>
		</Col> 
		<Col sm={4}>
		<h4 className="hidden-sm">Wanted</h4>
		<GenericPanelList items={wantedData} bsStyle="info" /> 
		</Col> 
		<Col sm={4}>
		<h4 className="hidden-sm">Available</h4>
		<GenericPanelList items={availableData} bsStyle="success" /> 
	    </Col> 
		</Row>
		</Panel>);
    }
};

export default LatestFeaturesPanel;
