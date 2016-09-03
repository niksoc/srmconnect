import React from 'react';
import {Col, Collapse, Button, Row, Glyphicon, Nav, NavItem} from 'react-bootstrap'; 
import {Link, browserHistory} from 'react-router';
import GenericModal from './common/GenericModal';
import FormFrame from './common/FormFrame';
import * as constants from '../constants';
import {getViewPortWidth} from '../utils';
import FEATURES from '../features';

class FeatureNav extends React.Component{
    constructor(){
	super();
	this.state = {
	    'activeFeature':'',
	    open:false
	};
    }
    handleSelect(key) {
	const url = constants.BASE_URL + key;
	this.setState({open:false, activeFeature:key});
	browserHistory.push(url);
    } 
    componentWillMount(){
	const initFeature = window._SRMXCHANGE_INIT_ROUTE_.slice(0, window._SRMXCHANGE_INIT_ROUTE_.indexOf('/')+1);
	this.setState({activeFeature:initFeature.toLowerCase()});
    }
    render() {
	const nav = (
		<Nav bsStyle="pills" justified activeKey={this.state.activeFeature} onSelect={this.handleSelect.bind(this)}>
		<NavItem eventKey={''}>Latest</NavItem>
		<NavItem eventKey={'question/'}>Q&A</NavItem>
		<NavItem eventKey={'wanted/'}>Wanted</NavItem>
		<NavItem eventKey={'available/'}>Available</NavItem>
		<NavItem eventKey={'story/'}>Experience Speaks</NavItem>
		<NavItem eventKey={'project/'}>Project</NavItem>
		</Nav>
	);
	if(getViewPortWidth()<constants.sm){
	    let buttonColor;
	    if(!this.state.activeFeature) buttonColor =  'black';
	    else{
		const val = FEATURES.filter((feature)=>feature.model===this.state.activeFeature.slice(0,-1))[0];
		buttonColor = (val && val.bsStyle!=='')? constants.COLOURS[val.bsStyle] : 'black';
	    }
	    return (  <div>
		      <Button style={{width:'100%',backgroundColor:buttonColor}} onClick={ ()=> this.setState({ open: !this.state.open })}>
		      menu <span className='caret'/>
		      </Button>
		      <Collapse in={this.state.open}>
		      <div>
		      {nav}
		      </div>
		      </Collapse>
		      </div>);
		   }
	else return nav;

    } 
}

export default FeatureNav;










