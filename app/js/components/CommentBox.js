import React from 'react';
import {pure} from 'recompose';
import {Link} from 'react-router';
import LoadingIndicator from '../components/LoadingIndicator';
import Timestamp from '../components/Timestamp';
import DetailOptions from '../components/DetailOptions';
import UserName from '../components/UserName';
import * as constants from '../constants';

const CommentBox = (props) => {
    const fields = props.fields;
    const modified = (fields.modified !== fields.created)? <Timestamp title='edited' datetime={fields.modified} /> : null;
    const created_by = <UserName id={fields.created_by} name={fields.created_by_name}/>;
    const options = (<DetailOptions owner={fields.created_by} item='comment' edit_src={`/api/edit/comment/${fields.id}/?for=${props.for}&id=${fields.id}`}
		     delete_src={`/api/delete/comment/${fields.id}/?for=${props.for}&id=${fields.id}`} />);
    return <div style={{paddingRight:'30px', ...props.style}}>{fields.text} - {created_by} <Timestamp title='' datetime={fields.created}/> {modified}<span style={{position:'absolute', right:'25px'}} >{options}</span></div>;
};

CommentBox.propTypes = {
    fields:React.PropTypes.object,
    style:React.PropTypes.object,
    for:React.PropTypes.string 
};

export default pure(CommentBox);








