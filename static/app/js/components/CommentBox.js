import React from 'react';
import {pure} from 'recompose';
import {Link} from 'react-router';
import LoadingIndicator from '../components/LoadingIndicator';
import Timestamp from '../components/Timestamp';
import * as constants from '../constants';

const CommentBox = (props) => {
    const fields = props.fields;
    const modified = (fields.modified !== fields.created)? <Timestamp title='edited' datetime={fields.modified} /> : null;
    const created_by = <Link to={constants.BASE_URL + 'user_profile/'+fields.created_by}>{fields.created_by_name}</Link>;
    return <div style={props.style}>{fields.text} - {created_by} <Timestamp title='' datetime={fields.created}/> {modified}</div>;
};

CommentBox.propTypes = {
    fields:React.PropTypes.object,
    style:React.PropTypes.object
};

export default pure(CommentBox);








