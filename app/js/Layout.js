import React from 'react';
import {Col} from 'react-bootstrap';
import axios from 'axios';
import Header from './components/header/Header';
import FeatureNav from './components/FeatureNav';
import UserThumb from './components/UserThumb';
import InfoPanel from './components/InfoPanel';
import MoreLikeThisPanel from './components/MoreLikeThisPanel';
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
		if(error.response.status !== 404) console.error(error);
	    });
	axios.get('/app/moderator/')
	    .then(({data})=>
		  this.setState({isModerator:true}) 
		 )
	    .catch(function (error) {
		if(error.response.status !== 404) console.error(error);
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
	const path = this.props.location.pathname.replace(BASE_URL,'');
	let info_path = path.replace(/\d+/g, 'id');
	let sidepanel = null;
	let pos = 'top';
	if(path.indexOf('profile')!==-1 || info_path.indexOf('\/id\/')===-1){
	    info_path = path===''? 'latest':path.slice(0,-1);
	    sidepanel = <InfoPanel title={info_path} />;
	}
	else{
	    const id = /\d+/g.exec(path)[0];
	    const model = /(\w+)\//.exec(path)[1];
	    pos='bottom';
	    sidepanel = <MoreLikeThisPanel model={model} id={id}/>;
	}
	sidepanel=(
		<Col className="side-panel" sm={4}>
		{sidepanel} 
	    </Col>);
	return (
		<div> 
		<Header />
		<div className='container'>
		<FeatureNav />
		{pos==='top'?sidepanel:null}
		<Col sm={8}>
		{this.props.children}
	    </Col>
		{pos==='bottom'?sidepanel:null}
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











