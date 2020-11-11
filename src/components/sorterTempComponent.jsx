import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar } from 'react-bootstrap';
import {ButtonGroup} from 'react-bootstrap';

class Sorter extends Component {
    state = {
        width: 1,
        height: 0,
        values: null
    };

    render(){
        return (
            <React.Fragment>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>
                        Sorting Visualiser (WIP)
                    </Navbar.Brand>
                    <Button className="ml-1" variant="secondary" onClick={this.genNewArray}>
                        Randomise Array
                    </Button>
                    <ButtonGroup className="ml-3" aria-label="Sorting Options">
                        <Button variant="primary">BubbleSort</Button>
                        <Button className="ml-1" variant="secondary">Merge Sort</Button>
                        <Button className="ml-1" variant="secondary">Quick Sort</Button>
                    </ButtonGroup>
                    <Button className="ml-3" variant="secondary">
                        Sort
                    </Button>
                </Navbar>
                {this.createColumns()}
                <div style={{display: "inline-block", width: this.state.width, height: this.state.height, backgroundColor: 'skyblue'}}>
                </div>
            </React.Fragment>
            );
    }

    componentDidMount(){
        this.genNewArray()
        this.genNewArray=this.genNewArray.bind(this)
    }

    genNewArray(){
        var values = new Array(800)
        for (var i=0; i<values.length; i++){
            values[i]=Math.random()*800
        }
        this.setState({values: values})
    }

    createColumns(){
        if (this.state.values != null){
            var columns = []
            var vals = this.state.values
            for (var i=0; i<vals.length; i++){
                columns.push(<div style={{display: "inline-block", width: this.state.width, height: vals[i], backgroundColor: 'skyblue'}}></div>)
            }
            return columns
        }
        
    }

}

export default Sorter;