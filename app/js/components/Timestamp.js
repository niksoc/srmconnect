import React from 'react';
import {pure} from 'recompose';

const Timestamp = (props) => {
    const monthStrings = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const datetime = props.datetime.replace('T',' ');
    const date = datetime.split(' ')[0].split('-');
    const day = date[2];
    const month = monthStrings[Number(date[1])];
    const year = "'" + date[0].slice(2); 
    const time = datetime.split(' ')[1].slice(0,-3);
    const datetime_str = [day, month, year, 'at', time].join(' ');
    const style = {
	fontSize:'1.1rem',
	...props.style
    };
    return (<span style={style}>{props.title}: <time dateTime={datetime}>{datetime_str}</time></span>);
};

Timestamp.propTypes = {
    title: React.PropTypes.string,
    datetime: React.PropTypes.string
};

export default pure(Timestamp);
