import React from 'react';
import {Thumbnail, Label, Badge, Button,Media} from 'react-bootstrap';
import {Link} from 'react-router';
import {pure} from 'recompose';
import {browserHistory} from 'react-router';
import Timestamp from './Timestamp';
import UserThumb from './UserThumb';
import Markdown from './Markdown';
 
const GenericMediaItem = React.createClass({render(){

     
  
    const pk = this.props.id;
    const uri = this.props.uri+ pk + '/';
    
    const title = (<span><Link to={uri}>{this.props.title}</Link></span>);
    
    const footer = (<span>
		    <Timestamp title='created' datetime={this.props.created}/><br/>
		    <UserThumb id={this.props.created_by}/></span>); 
    return (
	    <Media>
       
      <Media.Left align="top">
        <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
      </Media.Left>
      <Media.Body>
        <Media.Heading>{title}</Media.Heading>
        <Markdown>{this.props.text}</Markdown>
        <Button onClick={()=>browserHistory.push(uri)} bsStyle="success">more</Button><br />
      </Media.Body>
      <h5>{footer}</h5>
     
    </Media>
    );
}});

GenericMediaItem.propTypes = {
    id:React.PropTypes.number,
    uri:React.PropTypes.string,
    fields:React.PropTypes.object,
    tags:React.PropTypes.array,
    bsStyle:React.PropTypes.string
};
    

export default pure(GenericMediaItem);















