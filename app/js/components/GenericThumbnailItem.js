import React from 'react';
import {Thumbnail, Label, Button,Panel, Media} from 'react-bootstrap';
import {Link} from 'react-router';
import {pure} from 'recompose';
import {browserHistory} from 'react-router';
import Timestamp from './Timestamp';
import UserThumb from './UserThumb';
import Markdown from './Markdown';
import NumberBox from'./common/NumberBox';
import TagList from'./common/TagList';
import {getViewPortWidth} from '../utils';
import * as constants from '../constants';
import UserName from './UserName';

const GenericThumbnailItem = React.createClass({render(){
    const rowStyle= {
	border:'1px solid',
	borderColor: constants.COLOURS[this.props.bsStyle]
    }; 
    const maxHeight = {
	maxHeight:'120px',
	overflow:'hidden'
    };
    const pk = this.props.id;
    const uri = this.props.uri+ pk + '/';
    const tags = <TagList tag_names={this.props.tag_names} bsStyle={this.props.bsStyle} />;
    if(getViewPortWidth() < constants.md)
    return (
	    <Thumbnail src={this.props.image} style={{maxWidth:'300px', ...rowStyle, width:'100%', overflow:'hidden'}} alt="project image">
            <h3 style={{display:'inline-block', color:constants.COLOURS[this.props.bsStyle]}}>{this.props.title}</h3>{tags}<br/> 
            <div style={maxHeight}><Markdown>{this.props.text}</Markdown></div>
	    <Link to={uri}>more</Link><br/>
	    <span className="pull-right">
	    <Timestamp title='posted' datetime={this.props.created}/> by <UserName id={this.props.created_by} name={this.props.created_by_name}/>
	    </span> 
      </Thumbnail>);
    else return(
	    <Media style={{height:'235px'}}>
	    <Media.Left align="middle">
	    <img style={{border: '1px solid', borderColor:constants.COLOURS[this.props.bsStyle]}}  alt="project image" src={this.props.image} />
	    </Media.Left>
	    <Media.Body>
	    <Media.Heading style={{padding:'5px', width:'100%', fontWeight:'800', fontSize:'2rem', color:constants.COLOURS[this.props.bsStyle]}}>
	    {this.props.title}
	</Media.Heading>
            <div style={maxHeight}><Markdown>{this.props.text}</Markdown></div>
	    <Link to={uri}>more</Link><br/>
	    {tags}<br/>
	    <span style={{position:'absolute', bottom:'5px'}}>
	    <Timestamp title='posted' datetime={this.props.created}/> by <UserName id={this.props.created_by} name={this.props.created_by_name}/>
	    </span> 
	    </Media.Body>
	    </Media>
	
    ); 
}});

GenericThumbnailItem.propTypes = {
    id:React.PropTypes.number,
    uri:React.PropTypes.string,
    fields:React.PropTypes.object,
    tags:React.PropTypes.array,
    bsStyle:React.PropTypes.string
};
    

export default pure(GenericThumbnailItem);















