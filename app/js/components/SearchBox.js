import React from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, InputGroup, FormControl,Button, Glyphicon} from 'react-bootstrap';

class SearchBox extends React.Component{ 
    constructor(){
	super();
    }
    submit(){
	const input = ReactDOM.findDOMNode(this.inputBox);
	this.props.setQuery(input.value);
    }
    clear(){
	const input = ReactDOM.findDOMNode(this.inputBox);
	input.value = '';
	this.props.setQuery(input.value);
    }
    render(){
	return (<FormGroup>
		<InputGroup>
		<FormControl type="text" ref={(ref) => this.inputBox = ref}/>
		<InputGroup.Button>
		<Button onClick={this.submit.bind(this)}><Glyphicon glyph="search"/>
		</Button>
		</InputGroup.Button>
		<InputGroup.Button>
		<Button onClick={this.clear.bind(this)}><Glyphicon glyph="remove"/>
		</Button>
		</InputGroup.Button>
		</InputGroup>
		</FormGroup>);
    }
};

export default SearchBox;