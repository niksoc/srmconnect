import Remarkable from 'remarkable';
import React from 'react';
import {pure} from 'recompose';
 
const Markdown = (props) => {
    var md = new Remarkable();
    var rawMarkup = md.render(props.children.toString());
    return (
            <span dangerouslySetInnerHTML={{__html:rawMarkup}} />
    );
};

export default pure(Markdown);
