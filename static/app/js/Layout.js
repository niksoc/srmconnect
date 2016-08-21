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











