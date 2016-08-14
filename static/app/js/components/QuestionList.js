import React from 'react';
import axios from 'axios';
import {Table} from 'react-bootstrap';
import QuestionRow from './QuestionRow';

class QuestionList extends React.Component {
    constructor(){
	super();
	var self = this;
	this.state = {questions:[]};
	   /* {'num_votes': 34,
	     'num_answers': 4,
	     'num_views': 100,
	     'title': 'Who let the dogs out?'},
	    {'num_votes': 4,
	     'num_answers': 1,
	     'num_views': 11,
	     'title': 'Is global warming real?'}]};
	    */
	axios.get('question/')
	    .then(function (response) {
		self.setState({questions:response.data});
	    })
	    .catch(function (error) {
		console.log(error);
	    });

    } 
	
    render(){ 
	const QuestionRows = this.state.questions.map((q,i)=> <QuestionRow key={i} title={q.title} num_votes={q.num_votes} num_answers={q.num_answers} num_views={q.num_views} />);
	return (
		<Table striped>
		<thead>
		<tr>
		<th>Votes</th>
		<th>Answers</th>
		<th>Views</th>
		<th>Question</th>
		</tr>
		</thead>
		<tbody>
		{QuestionRows}
	    </tbody>
	    </Table>
	);
    }
};

export default QuestionList;
    









