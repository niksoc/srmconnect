import React from 'react';
import {Col, Row, Glyphicon, Nav, NavItem} from 'react-bootstrap'; 
import {Link, browserHistory} from 'react-router';
import LatestFeaturesPanel from './LatestFeaturesPanel'; 
import GenericModal from './common/GenericModal';
import FormFrame from './common/FormFrame';
import * as constants from '../constants';

class FeatureNav extends React.Component{
    constructor(){
	super();
	this.state = {
	    'activeKey':1
	};
    }
    handleSelect(key) {
	let url = constants.BASE_URL;
	let activeKey=1;
	switch(key){
	case 1:url+=''; activeKey=1; break;
	case 2:url+='qa/'; activeKey=2; break;
	case 3:url+='wanted/'; activeKey=3; break;
	case 4:url+='available/'; activeKey=4; break;
	case 5:url+='story/'; activeKey=5; break;
	case 6:url+='project/'; activeKey=6; break;
	}
	this.setState({activeKey});
	browserHistory.push(url);
    } 
    componentWillMount(){
	const features = ['','qa','wanted','available','story','project'];
	const initFeature = window._SRMXCHANGE_INIT_ROUTE_.slice(0, window._SRMXCHANGE_INIT_ROUTE_.indexOf('/'));
	this.setState({activeKey:features.indexOf(initFeature)+1});
    }
    render() {
	return (
		<div>
		<Nav bsStyle="pills" justified activeKey={this.state.activeKey} onSelect={this.handleSelect.bind(this)}>
		<NavItem eventKey={1}>Latest</NavItem>
		<NavItem eventKey={2}>Q&A</NavItem>
		<NavItem eventKey={3}>Wanted</NavItem>
		<NavItem eventKey={4}>Available</NavItem>
		<NavItem eventKey={5}>Experience Speak</NavItem>
		<NavItem eventKey={6}>Project</NavItem>
		</Nav>
		</div>
	);
    }
}

export default FeatureNav;










