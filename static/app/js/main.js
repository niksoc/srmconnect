import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header/Header';
import QuestionList from './components/QuestionList';

class Main extends React.Component{
    constructor(){
	super();
	this.state = {
	    'loggedIn':false
	};
    }
    render(){
	return (
		<div>
		<Header />
		<div className='container'>
		<QuestionList />
		</div>
		</div>
	);
    }
};

ReactDOM.render(<Main />, document.getElementById("app"));












