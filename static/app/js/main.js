import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header/Header';

class Main extends React.Component{
    constructor(){
	super();
	this.state = {
	    'loggedIn':false
	};
    }
    render(){
	return (
		<Header />
	);
    }
};

ReactDOM.render(<Main />, document.getElementById("app"));












