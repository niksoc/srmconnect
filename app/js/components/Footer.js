import React from 'react';
import {Col} from 'react-bootstrap';
import {Link} from 'react-router';
import {BASE_URL} from '../constants';

const Footer = (props)=>{
    const fbPlugin = (
	    <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fsrmconnectme&tabs&width=300&height=180&small_header=false&adapt_container_width=true&hide_cover=true&show_facepile=true&appId=187076368372427" height="180" style={{border:'none',overflow:'hidden', marginTop:'5px', float:'right'}} scrolling="no" frameBorder="0" allowTransparency="true"></iframe>);

    return (<div className='footer' style={{backgroundColor:'#222222', marginTop:'20px', color:'white', overflow:'hidden'}}>
	<div className='container'>
	    <Col sm={6}>
	    <p className='lead' style={{marginBottom:'0px', display:'inline-block'}}><Link to={BASE_URL+'about'}>About</Link> | <Link to={BASE_URL+'join_us'}>Join Us</Link></p>
	    <p><small>&copy;<a href="https://raw.githubusercontent.com/niksoc/srmconnect/master/LICENSE.md">license</a>. The maintainors/creators of this site are not responsible for user posted content/links</small></p>
	    </Col>
	    {fbPlugin}
	</div>
	    </div>);
};

export default Footer;










