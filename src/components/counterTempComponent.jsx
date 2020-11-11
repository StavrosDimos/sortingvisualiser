import React, { Component } from 'react';

class Counter extends Component {
    state = {
        width: 5,
        height: Math.random()*500
    };

    render(){
        return (
            <React.Fragment>
                <div>
                <div style={{display: "inline-block", width: this.state.width, height: this.state.height, backgroundColor: 'skyblue'}}>
                </div>
                Hell orld
                </div>
                
            </React.Fragment>
            );
    }
}

export default Counter;