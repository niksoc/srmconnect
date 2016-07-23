import React from 'react';
 
const QuestionRow = (props)=>(
	<tr>
	<td>{props.num_votes}</td>
	<td>{props.num_answers}</td>
	<td>{props.num_views}</td>
	<td>{props.title}</td> 
	</tr>
); 


export default QuestionRow;

