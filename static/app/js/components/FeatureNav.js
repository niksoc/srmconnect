import React from 'react';
import {Col, Row} from 'react-bootstrap'; 
import {Link} from 'react-router';
import LatestFeaturesPanel from './LatestFeaturesPanel'; 

class FeatureNav extends React.Component{
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
	return (
		<div> 
		<Row id="FeatureNav">
		<Col sm={4}><Link to={'experience_speaks'} className="featureNavLink">Experience Speaks</Link></Col>
		<Col sm={4}><Link to={'wanted'} className="featureNavLink">Wanted</Link></Col> 
		<Col sm={4}><Link to={'available'} className="featureNavLink">Available</Link><span className="pull-right" onClick={this.togglePanel.bind(this)}><span className="hidden-sm">Latest</span><span className="caret"></span></span></Col>
		</Row>
		<LatestFeaturesPanel isExpanded={this.state.panelExpanded} />
		</div>
	);
    }
};

export default FeatureNav;










