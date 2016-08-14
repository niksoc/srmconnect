import React from 'react';
import {Modal} from 'react-bootstrap';

class GenericModal extends React.Component {
    constructor() {
	super();
	this.state = { showModal: false };
    } 

    close() {
	this.setState({ showModal: false });
    } 

    open() {
	this.setState({ showModal: true });
    } 
    render() {
	const style = {
	    'display':'inline-block'
	};
	return ( 
	        <div style={style} onClick={this.open.bind(this)}> 
		<span>{this.props.buttonText}</span> 
		<Modal show={this.state.showModal} onHide={this.close.bind(this)}>
		<Modal.Header closeButton>
		<Modal.Title>{this.props.title}</Modal.Title>
		</Modal.Header>
		<Modal.Body>
		{this.props.children}
		</Modal.Body>
		<Modal.Footer>
		{this.props.footer}
		</Modal.Footer>
		</Modal>
		</div>
	);
    }
} 

GenericModal.defaultProps = {
    'footer':'',
    'title':''
};

export default GenericModal;









