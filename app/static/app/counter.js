import React from 'react';
class Counter extends React.Component {
    constructor(){
        super();
    }
    render(){
        let count = 3;
        return <h1>{count}</h1>
    }
}

export default Counter