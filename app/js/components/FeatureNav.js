import React from 'react';
import {Col, Row, Glyphicon, Nav, NavItem} from 'react-bootstrap'; 
import {Link, browserHistory} from 'react-router';
import GenericModal from './common/GenericModal';
import FormFrame from './common/FormFrame';
import * as constants from '../constants';

class FeatureNav extends React.Component{
    constructor(){
	super();
	this.state = {
	    'activeFeature':''
	};
    }
    handleSelect(key) {
	const url = constants.BASE_URL + key;
	this.setState({activeFeature:key});
	browserHistory.push(url);
    } 
    componentWillMount(){
	const initFeature = window._SRMXCHANGE_INIT_ROUTE_.slice(0, window._SRMXCHANGE_INIT_ROUTE_.indexOf('/')+1);
	this.setState({activeFeature:initFeature.toLowerCase()});
    }
    render() {
	return (
		<div> 
		<Nav bsStyle="pills" justified activeKey={this.state.activeFeature} onSelect={this.handleSelect.bind(this)}>
		<NavItem eventKey={''}>Latest</NavItem>
		<NavItem eventKey={'question/'}>Q&A</NavItem>
		<NavItem eventKey={'wanted/'}>Wanted</NavItem>
		<NavItem eventKey={'available/'}>Available</NavItem>
		<NavItem eventKey={'story/'}>Experience Speaks</NavItem>
		<NavItem eventKey={'project/'}>Project</NavItem>
		</Nav>
		</div>
	);
    }
}

export default FeatureNav;










