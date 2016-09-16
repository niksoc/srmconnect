import React from 'react';
import {Link} from 'react-router';
import {pure} from 'recompose';
import Timestamp from './Timestamp';

const LinkItem = React.createClass({render(){
    const pk = this.props.id;
    const uri = this.props.uri+ pk + '/';
    const title = (<Link to={uri}>{this.props.title}</Link>);
    const timestamp = this.props.created?<span> - <Timestamp title='posted' datetime={this.props.created}/></span>:null;
    return <span>{title} {timestamp}</span>;
}}); 

export default pure(LinkItem);









