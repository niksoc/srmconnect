import React from 'react';
import {Panel, Label, Badge} from 'react-bootstrap';
import {Link} from 'react-router';
import {pure} from 'recompose';
import Timestamp from './Timestamp';
import UserThumb from './UserThumb';
 
const GenericPanelItem = React.createClass({render(){
    const margin = {
	marginLeft:'5px' 
    };
    const ellipsisStyle = {
	fontWeight:700
    };
    const pk = this.props.id;
    const uri = this.props.uri+ pk + '/';
    const tags = this.props.tag_names.map((label,i)=>(<Label key={i} bsStyle="info" style={margin}>{label}</Label>)); 
    const title = (<span><Link to={uri}>{this.props.title}</Link><br/>{tags}</span>);
    const footer = (<span>
		    <Timestamp title='created' datetime={this.props.created}/><br/>
		    <UserThumb id={this.props.created_by}/></span>); 
    return (
	    <Panel header={title} footer={footer} bsStyle={this.props.bsStyle}>
	    {this.props.text}
	    <Link to={uri} style={ellipsisStyle}> ...</Link>
    </Panel> 
    );
}});

GenericPanelItem.propTypes = {
    pk:React.PropTypes.number,
    uri:React.PropTypes.string,
    fields:React.PropTypes.object,
    tags:React.PropTypes.array,
    bsStyle:React.PropTypes.string
};
    

export default pure(GenericPanelItem);















