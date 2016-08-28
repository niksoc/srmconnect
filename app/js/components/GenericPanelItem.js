import React from 'react';
import {Panel, Label, Badge,ListGroupItem,ListGroup} from 'react-bootstrap';
import {Link} from 'react-router';
import {pure} from 'recompose';
import Timestamp from './Timestamp';
import TagList from'./common/TagList';
import UserThumb from './UserThumb';
import Markdown from './Markdown';
import UserName from './UserName';

const GenericPanelItem = React.createClass({render(){
    const ellipsisStyle = {
	fontWeight:700
    };
    const maxHeight = {
	maxHeight:'70px',
	overflow:'hidden'
    };
    const pk = this.props.id;
    const uri = this.props.uri+ pk + '/';
    const tags = <TagList tag_names={this.props.tag_names} bsStyle={this.props.bsStyle} />;
    const title = (<Link to={uri}>{this.props.title}</Link>);
    const footer = (<span>
		    {tags}
		    <span className="pull-right">
		    <Timestamp title='posted' datetime={this.props.created}/> by <UserName id={this.props.created_by} name={this.props.created_by_name}/>
		   </span></span>); 
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















