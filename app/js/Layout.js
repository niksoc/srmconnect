import React from 'react';
import {Col} from 'react-bootstrap';
import axios from 'axios';
import Header from './components/header/Header';
import FeatureNav from './components/FeatureNav';
import UserThumb from './components/UserThumb';
import InfoPanel from './components/InfoPanel';
import {BASE_URL} from './constants';

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
	let path = this.props.location.pathname.replace(BASE_URL,'');
	path = path.replace(/\d+/g, 'id');
	path = path===''? 'latest':path.slice(0,-1);
 	return (
		<div> 
		<Header />
		<div className='container'>
		<FeatureNav />
		<Col className="info-panel" sm={4}>
		<InfoPanel title={path} />
		</Col>
		<Col sm={8}>
		{this.props.children}
	    </Col>
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











