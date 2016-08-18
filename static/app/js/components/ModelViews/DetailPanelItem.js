import React from 'react';
import {Panel, Label, Badge} from 'react-bootstrap';
import {Link} from 'react-router';
import {pure} from 'recompose';

const DetailPanelItem = React.createClass({render(){
    const margin = {
	marginLeft:'5px' 
    };
    console.log(this.props);
    const pk = this.props.params.id;
    const fields = this.props.fields;
    const tags = fields.tags.map((label,i)=>(<Label key={i} bsStyle="info" style={margin}>{label}</Label>)); 
    const title = (<h2>{fields.title}</h2>);
    return ( 
	    <Panel header={title} footer={tags} bsStyle={this.props.bsStyle}>
	    {fields.text}
	</Panel> 
    );
}});

DetailPanelItem.propTypes = {
    uri:React.PropTypes.string,
    fields:React.PropTypes.array,
    tags:React.PropTypes.array,
    bsStyle:React.PropTypes.string
};
    

export default pure(DetailPanelItem);
