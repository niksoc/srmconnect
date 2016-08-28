import React from 'react';
import NumberBox from './common/NumberBox';
import {pure} from 'recompose';
import {Label,ListGroup,ListGroupItem} from 'react-bootstrap';
import {Link} from 'react-router';
import Timestamp from './Timestamp';
import TagList from'./common/TagList';
import UserThumb from './UserThumb';
import * as constants from '../constants';
import UserName from './UserName';

const QuestionRow=React.createClass({render(){
    const maxHeight = {
	maxHeight:'120px',
	overflow:'hidden'
    };
    const styleList={
	'border':'1px solid gray'
    };
	
    const pk = this.props.id;
    const uri = this.props.uri+ pk + '/';
    const tags = <TagList tag_names={this.props.tag_names} bsStyle={this.props.bsStyle} />;
    const title = (<h4 style={{display:'inline-block'}}><Link to={uri}>{this.props.title}</Link></h4>);
    const views=(<NumberBox title='Votes' value={this.props.num_votes}/>); 
    const votes=(<NumberBox title='Answers' value={this.props.num_answers}/>); 
    const answers=(<NumberBox title='Views' value={this.props.num_views}/>); 
    return (
	    <div style={{marginBottom:'10px'}}><div style={{display:'inline-block'}}>{views}{votes}{answers}</div>
	    <div style={{display:'inline-block'}}>{title}<br/>{tags}
	    <span style={{marginLeft:'10px'}}>
	    {this.props.last_active!==null?<Timestamp title='last active' datetime={this.props.last_active} />:null}
	{' | '}<Timestamp title='posted' datetime={this.props.created}/> by <UserName id={this.props.created_by} name={this.props.created_by_name}/>
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
