import React from 'react';

const NumberBox = (props)=>{
    const style = {
        'display': 'inline-block',
        'minWidth': '51px',
        'fontSize': '1.05rem',
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
            <div style={{...style, ...props.style}}>
	         <div style={valueStyle}>{props.value}</div>
             <div style={titleStyle}>{props.title}</div>
        </div>
    );
};

export default NumberBox;
