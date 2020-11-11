import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

class Counter extends Component {
    state = {
        width: 5,
        height: Math.random()*500
    };

    render(){
        return (
            <React.Fragment>
                
                <div style={{display: "inline-block", width: this.state.width, height: this.state.height, backgroundColor: 'skyblue'}}>
                </div>
                <div>
                Hell orld
                </div>
                <Button>This is a button</Button>
                
            </React.Fragment>
            );
    }
}

export default Counter;