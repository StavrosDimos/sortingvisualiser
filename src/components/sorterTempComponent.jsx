import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar } from 'react-bootstrap';
import {ButtonGroup} from 'react-bootstrap';

class Sorter extends Component {
    state = {
        screenHeight: null,
        screenWidth: null,
        width: 10,
        values: [],
        valueStates: [],
        bubbleIsActive: null,
        mergeIsActive: null,
        quickIsActive: null,
        sortInterval: null,
        bubbleInner: null,
        bubbleOuter: null,
    };

    render(){
        return (
            <React.Fragment>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>
                        Sorting Visualiser (WIP)
                    </Navbar.Brand>
                    <Button className="ml-1" variant="primary" onClick={this.genNewArray}>
                        Generate Array
                    </Button>
                    {this.renderButtons()}
                    <Button className="ml-3" variant="primary" onClick={this.sortOnClick}>
                        Sort
                    </Button>
                </Navbar>
                {this.renderColumns()}
            </React.Fragment>
            );
    }

    componentDidMount(){
        this.genNewArray=this.genNewArray.bind(this)
        this.mergeSortOnClick=this.mergeSortOnClick.bind(this)
        this.quickSortOnClick=this.quickSortOnClick.bind(this)
        this.bubbleSortOnClick=this.bubbleSortOnClick.bind(this)
        this.updateWindowDimensions=this.updateWindowDimensions.bind(this)
        this.bubbleStep=this.bubbleStep.bind(this)
        this.sortOnClick=this.sortOnClick.bind(this)
        this.setState({mergeIsActive: false, bubbleIsActive: true, quickIsActive: false})
        this.updateWindowDimensions()
        this.genNewArray()
        window.addEventListener('resize', this.updateWindowDimensions)
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    updateWindowDimensions(){
        this.setState({screenWidth: window.innerWidth, screenHeight: window.innerHeight})
    }

    genNewArray(){
        var screenWidth = this.state.screenWidth
        var values = new Array(parseInt(screenWidth/this.state.width))
        var states = new Array(parseInt(screenWidth/this.state.width))
        for (var i=0; i<values.length; i++){
            values[i]=Math.random()*800
            states[i]=1
        }
        this.setState({values: values, valueStates: states})
    }

    renderColumns(){
        if (this.state.screenWidth != null){
            var columns = []
            var vals = this.state.values
            var states = this.state.valueStates
            for (var i=0; i<this.state.screenWidth; i++){
                if (states[i]==1){
                    columns.push(<div style={{display: "inline-block", width: this.state.width, height: vals[i], backgroundColor: 'skyblue'}}></div>)
                }
                if (states[i]==2){
                    columns.push(<div style={{display: "inline-block", width: this.state.width, height: vals[i], backgroundColor: 'chocolate'}}></div>)
                }
                }
            return columns
        }
    }

    renderButtons(){
        if (this.state.bubbleIsActive != null){
            var bubbleIsActive = this.state.bubbleIsActive
            var mergeIsActive = this.state.mergeIsActive
            var quickIsActive = this.state.quickIsActive
            var lines = []
            if (bubbleIsActive){
                lines.push(<Button variant="primary" onClick={this.bubbleSortOnClick}>BubbleSort</Button>)
            } else {
                lines.push(<Button variant="secondary" onClick={this.bubbleSortOnClick}>BubbleSort</Button>)
            }
            if (mergeIsActive){
                lines.push(<Button className="ml-1" variant="primary" onClick={this.mergeSortOnClick}>Merge Sort</Button>)
            } else {
                lines.push(<Button className="ml-1" variant="secondary" onClick={this.mergeSortOnClick}>Merge Sort</Button>)
            }
            if (quickIsActive){
                lines.push(<Button className="ml-1" variant="primary" onClick={this.quickSortOnClick}>Quick Sort</Button>)
            } else {
                lines.push(<Button className="ml-1" variant="secondary" onClick={this.quickSortOnClick}>Quick Sort</Button>)
            }
            return (
                <ButtonGroup className="ml-3" aria-label="Sorting Options">
                    {lines}
                </ButtonGroup>
            )
        }
    }

    bubbleSortOnClick(){
        this.setState({mergeIsActive: false, bubbleIsActive: true, quickIsActive: false})
    }

    mergeSortOnClick(){
        this.setState({mergeIsActive: true, bubbleIsActive: false, quickIsActive: false})
    }

    quickSortOnClick(){
        this.setState({mergeIsActive: false, bubbleIsActive: false, quickIsActive: true})
    }

    sortOnClick(){
        clearInterval(this.state.sortInterval)
        var sortInterval = setInterval(this.bubbleStep, 1)
        this.setState({sortInterval: sortInterval, bubbleInner: 0, bubbleOuter: 0})
    }
    
    //make sure to correct bubblestep when restarting genarray
    bubbleStep(){
        var inner = this.state.bubbleInner
        var outer = this.state.bubbleOuter
        
        if (inner>this.state.values.length - 1-outer){
            inner = 0
            outer = outer+1
        }
        if (outer >this.state.values.length){
            clearInterval(this.state.sortInterval)
        }
        var states = this.state.valueStates
        var values = this.state.values
        if (states[inner]===1){
            states[inner]=2
            states[inner+1]=2
        } else {
            states[inner]=1
            states[inner+1]=1
            if (values[inner]<values[inner+1]){
                var temp = values[inner]
                values[inner]=values[inner+1]
                values[inner+1]=temp
            }
            inner = inner+1
        }
        
        this.setState({valueStates: states, bubbleInner: inner, bubbleOuter: outer})
    }
}

export default Sorter;