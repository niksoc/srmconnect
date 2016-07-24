import React from 'react';
import Header from './components/header/Header';
import FeatureNav from './components/FeatureNav';

class Layout extends React.Component{
    constructor(){
	super();
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

export default Layout;











