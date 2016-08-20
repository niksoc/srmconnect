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
	case 7:url+='event/'; activeKey=7; break;
	}
	this.setState({activeKey:activeKey});
	browserHistory.push(url);
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
		<NavItem eventKey={7}>Event</NavItem>
		</Nav>
		</div>
	);
    }
}

class FeatureNav2 extends React.Component{
    constructor(){
	super();
	this.state = {
	    'panelExpanded':true
	};
    }
    openPanel(){
	this.setState({panelExpanded:true});
    }
    closePanel(){
	this.setState({panelExpanded:false});
    }
    togglePanel(){
	if(this.state.panelExpanded) 
	    this.setState({panelExpanded:false});
	else
	    this.setState({panelExpanded:true});
    }
    render(){
	const plusIcon = (<Glyphicon glyph='plus-sign' />);
	const wantedForm = (<FormFrame src='create/wanted/' />); 
	const storyForm = (<FormFrame src='create/story/' />); 
	const availableForm = (<FormFrame src='create/available/' />); 
	return (
		<div>
		<Row id="FeatureNav">
		<Col sm={4}>
		<Link to={'experience_speaks'} className="featureNavLink">Experience Speaks</Link>
		<GenericModal buttonText={plusIcon} title='Create Story' children={storyForm} />
		</Col>
		<Col sm={4}>
		<Link to={'wanted'} className="featureNavLink">Wanted</Link> 
		<GenericModal buttonText={plusIcon} title='Create Wanted' children={wantedForm} />
		</Col> 
		<Col sm={4}>
		<Link to={'available'} className="featureNavLink">Available</Link>
		<GenericModal buttonText={plusIcon} title='Create Available' children={availableForm} />
		<span className="pull-right" onClick={this.togglePanel.bind(this)}>Latest<span className="caret"></span></span>
		</Col>
		</Row>
		<LatestFeaturesPanel isExpanded={this.state.panelExpanded} />
		</div>
	);
    }
};

export default FeatureNav;










