import React from 'react';
import NumberBox from './common/NumberBox';
import {pure} from 'recompose';
import {Label,ListGroup,ListGroupItem} from 'react-bootstrap';
import {Link} from 'react-router';
import Timestamp from './Timestamp';
import UserThumb from './UserThumb';
import * as constants from '../constants';

const QuestionRow=React.createClass({render(){
	 const maxHeight = {
	maxHeight:'120px',
	overflow:'hidden'
    };
    const margin = {
	marginLeft:'5px' 
    };
    const styleList={
	'border':'1px solid gray'
    };
	
    const pk = this.props.id;
    const uri = this.props.uri+ pk + '/';
    const tags = this.props.tag_names.map((label,i)=>(<Label key={i} bsStyle={this.props.bsStyle}
        style={margin}>{label}</Label>)); 
    const title = (<h4 style={{display:'inline-block'}}><Link to={uri}>{this.props.title}</Link></h4>);
    const tagsLeft=(<span style={{position:'absolute', left:'0px'}}>{tags}</span>);
    const footer = (<span>
		    <Timestamp title='created' datetime={this.props.created}/><br/>
		    </span>); 
   
    const views=(<NumberBox title='Views' value={this.props.num_views}/>); 
    const votes=(<NumberBox title='Views' value={this.props.num_views}/>); 
    const answers=(<NumberBox title='Views' value={this.props.num_views}/>); 
    return (
	    <div style={{width:'100%'}}><div style={{display:'inline-block', height:'61px', position:'relative', bottom:'10px'}}>{views}{votes}{answers}</div>
	    <div style={{display:'inline-block', width:'75%'}}>{title}<br/>{tags}
	    <span style={{float:'right'}}>
	    <Timestamp title='posted' datetime={this.props.created}/> by <Link to ={'user_profile/'+this.props.created_by}>{this.props.created_by_name}</Link>
	    </span> 
	</div></div>
    );
}});

QuestionRow.propTypes = {
    pk:React.PropTypes.number,
    uri:React.PropTypes.string,
    fields:React.PropTypes.object,
    tags:React.PropTypes.array,
    bsStyle:React.PropTypes.string
};

export default pure(QuestionRow);
