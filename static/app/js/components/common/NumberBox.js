import React from 'react';

const NumberBox = (props)=>{
    const style = {
        'display': 'inline-block',
        'minWidth': '51px',
        'margin': '0 3px 0 0',
        'fontSize': '1.05rem',
        'padding': '8px 5px',
        'lineHeight': '1',
        'textAlign': 'center'
    };
    const valueStyle = {
        'fontSize': '17px',
        'fontWeight': 300,
        'marginBottom': '2px'
    };
    const titleStyle = {

    };
    return (
        <div style={style}>
	         <div style={valueStyle}>{props.value}</div>
             <div style={titleStyle}>{props.title}</div>
        </div>
    );
} 

export default NumberBox