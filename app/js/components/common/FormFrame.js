import React from 'react';

const FormFrame = (props)=>{
    function autoResize(e){
	//to resize iframe based on content height
	let newheight = e.target.contentWindow.document.body.scrollHeight + 30;
	e.target.height= (newheight) + "px";
    }
    return (
	    <iframe onLoad={autoResize} src={props.src} width="100%" sandbox="allow-forms allow-same-origin allow-scripts" frameBorder="0" seamless>
	    </iframe>
    );
};

export default FormFrame;
