import React from 'react';
import {Panel, Label, Badge,ListGroupItem,ListGroup} from 'react-bootstrap';
import {Link} from 'react-router';
import {pure} from 'recompose';
import Timestamp from './Timestamp';
import UserThumb from './UserThumb';
import Markdown from './Markdown';
 
const GenericPanelItem = React.createClass({render(){
    const margin = {
	marginLeft:'5px' 
    };
    const ellipsisStyle = {
	fontWeight:700
    };
    const maxHeight = {
	maxHeight:'70px',
	overflow:'hidden'
    };
    const pk = this.props.id;
    const uri = this.props.uri+ pk + '/';
    const tags = this.props.tag_names.map((label,i)=>(<Label key={i} 
						      bsStyle={this.props.bsStyle} style={margin}>{label}</Label>)); 
    const title = (<Link to={uri}>{this.props.title}</Link>);
    const footer = (<span>
		    {tags}
		    <span className="pull-right">
		    <Timestamp title='posted' datetime={this.props.created}/> by <Link to ={'user_profile/'+this.props.created_by}>{this.props.created_by_name}</Link>
		   </span></span>); 
    const profile=(<p></p>);    
    return ( 
	    <Panel bsStyle={this.props.bsStyle} header={title} footer={footer}>
	    <div style={maxHeight}><Markdown>{this.props.text}</Markdown></div>
	    <Link to={uri}>more</Link>
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















