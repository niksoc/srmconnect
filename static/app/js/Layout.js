import React from 'react';
import Header from './components/header/Header';
import FeatureNav from './components/FeatureNav';
import axios from 'axios';
import UserThumb from './components/UserThumb';

class Layout extends React.Component{
    constructor(){
	super();
	this.state = {
	    isLoggedIn:false,
	    isModerator:false,
	    user:{} 
	};
    }
    componentDidMount(){
	axios.get('/app/user/')
	    .then(({data})=>
		this.setState({isLoggedIn:true, user:data}) 
		 )
	    .catch(function (error) {

	    });
	axios.get('/app/moderator/')
	    .then(({data})=>
		  this.setState({isModerator:true}) 
		 )
	    .catch(function (error) {

	    });
    } 
    getChildContext() {
	return {
	    isLoggedIn: this.state.isLoggedIn,
	    isModerator: this.state.isModerator,
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
    isModerator: React.PropTypes.bool,
    user: React.PropTypes.object 
};

export default Layout;











