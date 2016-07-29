import React from 'react';
import Header from './components/header/Header';
import FeatureNav from './components/FeatureNav';
import axios from 'axios';

class Layout extends React.Component{
    constructor(){
	super();
	this.state = {
	    isLoggedIn:false,
	    user:{} 
	};
    }
    componentWillMount(){
	let self = this;
	axios.get('user')
	    .then(function (response) {
		self.setState({isLoggedIn:true, user:response.data});
	    })
	    .catch(function (error) {

	    });
    } 
    getChildContext() {
	return {
	    isLoggedIn: this.state.isLoggedIn,
	    user: this.state.user
	};
    }
    render(){
	return (
		<div> 
		<Header />
		<div className='container'>
		<FeatureNav />
		{this.props.children}
		</div>
		</div>
	);
    }
};

Layout.childContextTypes = {
    isLoggedIn: React.PropTypes.bool,
    user: React.PropTypes.object 
};

export default Layout;











