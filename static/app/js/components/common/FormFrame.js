import React from 'react';

const FormFrame = (props)=>{
	const formframeStyle = {
	    'width':'100%',
	    'height':'500px'
	};
	return (
		<iframe src={props.src} sandbox="allow-forms allow-same-origin allow-scripts" frameBorder="0" seamless style={formframeStyle}>
		</iframe>
	);
};

export default FormFrame;
