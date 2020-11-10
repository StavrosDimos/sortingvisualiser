import React, { Component } from 'react';

class Counter extends Component {
    state = {
        count: 0
    };

    render(){
        return (
            <React.Fragment>
                <span>Hello World</span>
            </React.Fragment>
            );
    }
}

export default Counter;