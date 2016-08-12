import React from 'react';
import NumberBox from './common/NumberBox';

const QuestionRow = (props)=>{
	const titleStyle = {
		'display':'inline-block',
		'position':'absolute',
		'top':'10px',
		'fontWeight':'600',
		'fontSize':'1.5rem',
		'marginLeft':'15px'
    };
	return (
		<div>
		<NumberBox title="votes" value={props.num_votes} />
		<NumberBox title="answers" value={props.num_answers} />
		<NumberBox title="views" value={props.num_views} />
		<div style={titleStyle}>{props.title}</div> 
		</div>
	);
} 


export default QuestionRow;

