import React from 'react';
import ReactDOM from 'react-dom';
import {Form, FormGroup, FormControl, ControlLabel, Button, Col} from 'react-bootstrap';
import PageTitle from '../components/PageTitle';
import ListView from '../components/ModelViews/ListView';

const ProfileSearchForm = React.createClass({
    submit(){
	let q = '';
	for (var item in this.refs) {
	    if(!this.refs.hasOwnProperty(item)) continue;
	    const input = ReactDOM.findDOMNode(this.refs[item]);
	    let value = input.value;
	    if(item === 'Year' && value.trim().length!==0) value += ' year';
	    q += value + ' ';
	}
	this.props.setQuery(q);
    },
    clear(){
	for (var item in this.refs) {
	    if(!this.refs.hasOwnProperty(item)) continue;
	    const input = ReactDOM.findDOMNode(this.refs[item]);
	    input.value = '';
	}
	this.props.setQuery('');
    },
    render(){
	const items = [
	    {
		label:'Registration No.',
		placeholder:'RA1411003010435' 
	    },
	    {
		label:'Name',
		placeholder:'Siddarth Kakwade' 
	    },
	    {
		label:'Year',
		placeholder:'2' 
	    },
	    {
		label:'Dept',
		placeholder:'ECE' 
	    },
	    {
		label:'Campus',
		placeholder:'KTR/NCR/VDP' 
	    },
	    {
		label:'interests',
		placeholder:'embedded systems' 
	    },
	];
	let temp = {};
	const formItems = items.map((item,i)=> 
				    <Col key={i} sm={6}>
				    <FormGroup controlId={"form_"+item.label}>
				    <ControlLabel>{item.label}</ControlLabel>
				    <FormControl type="text" placeholder={item.placeholder} ref={(ref) => {
					if(ref!==null) temp[item.label] = ref;
					this.refs=temp;}}/>
				    </FormGroup>
				    </Col>
				   );
	return(
		<Form>
		{formItems}
		<Button onClick={this.submit}>Search</Button>
		<Button onClick={this.clear} style={{marginLeft:'10px'}}>Clear</Button>
		</Form>
	);
    }
}); 

export default ProfileSearchForm; 










