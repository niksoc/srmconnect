import React from 'react';
import {Link} from 'react-router';
import {BASE_URL} from '../constants';

const Footer = (props)=>(
	<div className='footer' style={{backgroundColor:'#222222', marginTop:'20px', color:'white'}}>
	<div className='container'>
	<p className='lead' style={{marginBottom:'0px'}}><Link to={BASE_URL+'about'}>About</Link> | <Link to={BASE_URL+'join_us'}>Join Us</Link></p>
	<small>The maintainors/creators of this site are not responsible for user posted content/links</small>
	</div>
	</div>
);

export default Footer;










