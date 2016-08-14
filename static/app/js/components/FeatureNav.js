import React from 'react';
import {Col, Row, Glyphicon} from 'react-bootstrap'; 
import {Link} from 'react-router';
import LatestFeaturesPanel from './LatestFeaturesPanel'; 
import GenericModal from './common/GenericModal';
import FormFrame from './common/FormFrame';

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










