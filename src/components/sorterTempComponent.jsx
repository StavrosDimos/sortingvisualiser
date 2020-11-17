import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar } from 'react-bootstrap';
import {ButtonGroup} from 'react-bootstrap';

class Sorter extends Component {
    state = {
        screenHeight: null,
        screenWidth: null,
        width: 5,
        height: 849,
        values: [],
        valueStates: [],
        bubbleIsActive: null,
        mergeIsActive: null,
        quickIsActive: null,
        sortInterval: null,
        bubbleInner: null,
        bubbleOuter: null,
        mergeArrays: [],
        workingMergeArrays: [],
        mergeOuter: null,
        mergeInner: null,
        speed: 15
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
                <Navbar bg="dark" variant="dark" className="mt-0">

                </Navbar>
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
        this.mergeStep=this.mergeStep.bind(this)
        this.sortOnClick=this.sortOnClick.bind(this)
        this.setState({mergeIsActive: false, bubbleIsActive: true, quickIsActive: false})
        this.updateWindowDimensions()
        setTimeout(this.genNewArray, 10)
        this.genNewArray()
        window.addEventListener('resize', this.updateWindowDimensions)
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    updateWindowDimensions(){
        var height = window.innerHeight
        var columnHeight = height - 80
        this.setState({screenWidth: window.innerWidth, screenHeight: height, height: columnHeight})
    }

    genNewArray(){
        clearInterval(this.state.sortInterval)
        var screenWidth = this.state.screenWidth
        screenWidth = screenWidth-17
        if (screenWidth <= 0){
            screenWidth = 1
        }
        var values = new Array(Math.floor(screenWidth/this.state.width))
        var states = new Array(Math.floor(screenWidth/this.state.width))
        for (var i=0; i<values.length; i++){
            values[i]=Math.random()*(this.state.height-5)
            states[i]=1
        }
        this.setState({values: values, valueStates: states})
    }

    renderColumns(){
        if (this.state.screenWidth != null){
            var columns = []
            var vals = this.state.values
            var states = this.state.valueStates
            var height = this.state.height
            for (var i=0; i<(this.state.screenWidth-17)/this.state.width; i++){
                columns.push(<div style={{display: "inline-block", width: 1, height: height}}></div>)
                if (states[i]===1){
                    columns.push(<div style={{display: "inline-block", width: (this.state.width-1), height: vals[i], backgroundColor: 'skyblue'}}></div>)
                }
                if (states[i]===2){
                    columns.push(<div style={{display: "inline-block", width: (this.state.width-1), height: vals[i], backgroundColor: 'chocolate'}}></div>)
                }
                if (states[i]===3){
                    columns.push(<div style={{display: "inline-block", width: (this.state.width-1), height: vals[i], backgroundColor: 'forestgreen'}}></div>)
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
        clearInterval(this.state.sortInterval)
        var states = this.state.valueStates
            for(var i = 0; i < states.length; i++){
                states[i]=1
            }
        this.setState({valueStates: states})
    }

    mergeSortOnClick(){
        this.setState({mergeIsActive: true, bubbleIsActive: false, quickIsActive: false})
        clearInterval(this.state.sortInterval)
        var states = this.state.valueStates
            for(var i = 0; i < states.length; i++){
                states[i]=1
            }
        this.setState({valueStates: states})
    }

    quickSortOnClick(){
        this.setState({mergeIsActive: false, bubbleIsActive: false, quickIsActive: true})
        clearInterval(this.state.sortInterval)
        var states = this.state.valueStates
            for(var i = 0; i < states.length; i++){
                states[i]=1
            }
        this.setState({valueStates: states})
    }

    sortOnClick(){
        clearInterval(this.state.sortInterval)
        if (this.state.bubbleIsActive){
            var sortInterval = setInterval(this.bubbleStep, 1)
            this.setState({sortInterval: sortInterval, bubbleInner: 0, bubbleOuter: 0})
        }
        if (this.state.mergeIsActive){
            var sortInterval = setInterval(this.mergeStep, 500)
            var values = this.state.values
            var mergeArrays = []
            for (var i = 0; i < values.length; i++){
                var tempArray = []
                tempArray.push(values[i])
                mergeArrays.push(tempArray)
            }
            this.setState({sortInterval: sortInterval, mergeArrays: mergeArrays, workingMergeArrays: mergeArrays, mergeOuter: 0, mergeInner: 0})
        }
        if (this.state.quickIsActive){
            this.setState({sortInterval: sortInterval, bubbleInner: 0, bubbleOuter: 0})
        }
    }
    
    bubbleStep(){
        var inner = this.state.bubbleInner
        var outer = this.state.bubbleOuter
        var speed = this.state.speed
        var states = this.state.valueStates
        var values = this.state.values

        for (var i = 0; i < speed; i++){
            if (inner>this.state.values.length - 1-outer){
                states[inner-1]=3
                states[inner] = 3
                inner = 0
                outer = outer+1
            }
            if (outer >this.state.values.length){
                clearInterval(this.state.sortInterval)
            }
            
            if (states[inner]===1){
                states[inner]=2
                states[inner+1]=2
            } else {
                states[inner]=1
                states[inner+1]=1
            if (values[inner]>values[inner+1]){
                var temp = values[inner]
                values[inner]=values[inner+1]
                values[inner+1]=temp
            }
            inner = inner+1
            }
            
        }
        this.setState({valueStates: states, bubbleInner: inner, bubbleOuter: outer})
    }

    mergeStep(){
        var arrays = this.state.mergeArrays
        var newArrays = []
        var newValues = []
        for(var i = 0; i < arrays.length;i=i+2){
            var tempArray = []
            for(var g = 0; g < arrays[i].length;g++){
                tempArray.push(arrays[i][g])
            }
            if(i+1 < arrays.length){
                for(g = 0; g < arrays[i+1].length;g++){
                    tempArray.push(arrays[i+1][g])
                }
            }
            
            tempArray.sort(function(a, b) {return a - b;})
            for(g=0; g < tempArray.length; g++){
                newValues.push(tempArray[g])
            }
            newArrays.push(tempArray)
        }
        this.setState({mergeArrays: newArrays, values: newValues})
        if(newArrays.length===1){
            clearInterval(this.state.sortInterval)
            var states = this.state.valueStates
            for(i = 0; i < states.length; i++){
                states[i]=3
            }
            this.setState({valueStates: states})
        }
    }
}

export default Sorter;