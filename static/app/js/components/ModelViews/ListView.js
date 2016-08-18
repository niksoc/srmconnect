import React from 'react';
import LoadingIndicator from '../LoadingIndicator';
import {pure} from 'recompose';
 
const ListView = (props) => {
    if(props.data.length == 0){
	const items = this.state.data.map((entry,i)=>
					  React.createElement(props.class,
							      {...entry,
							       bsStyle:props.bsStyle,
							       uri:props.detail_url}));
	return (<div>{items}</div>);
    }
    else return (<LoadingIndicator />);
};

ListView.propTypes = {
    model:React.PropTypes.string,
    class:React.PropTypes.object,
    bsStyle:React.PropTypes.string,
    detail_url:React.PropTypes.string,
    data:React.PropTypes.array
};

export default pure(ListView);
	
    
