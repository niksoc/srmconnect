import React from 'react';
import NumberBox from './common/NumberBox';
import {pure} from 'recompose';
import {Panel,Label,ListGroup,ListGroupItem,Image,Col,circle,Row,responsive,Media} from 'react-bootstrap';
import {Link} from 'react-router';
import Timestamp from './Timestamp';
import UserThumb from './UserThumb';
import Markdown from './Markdown';
import {COLOURS} from'../constants';


const ExperienceRow = React.createClass({render(){
    const margin = {
	marginLeft:'5px' 
    };
     const rowStyle={
       'height':'120' 
     };
     const viewStyle={
         'padding':'22px 0px 0px 0px'

     };
    const pk = this.props.id;
    const uri = this.props.uri+ pk + '/';
    const title = <Link style={{color:'black', fontWeight:400}} to={uri}>{this.props.title}</Link>;
    const footer = <Timestamp title='created' datetime={this.props.created}/>; 
    const profile=(<UserThumb id={this.props.created_by}/>);
    const views=<NumberBox style={{borderRight:'1px solid black'}} title='Views' value={this.props.num_views}/>;
    
    return(
	    <Row style={{borderBottom:'1px solid black', padding:'10px'}}>
	    <Col sm={1} style={viewStyle}>{views}</Col>
	    <Col sm={7}>
	    <h3>{title}</h3></Col>
	    <Col sm={4}>{profile}{footer}</Col>
	    </Row>
    );

}});

ExperienceRow.propTypes = {
    id:React.PropTypes.number,
    uri:React.PropTypes.string,
    fields:React.PropTypes.object,
    tags:React.PropTypes.array,
    bsStyle:React.PropTypes.string
};


export default pure(ExperienceRow);
