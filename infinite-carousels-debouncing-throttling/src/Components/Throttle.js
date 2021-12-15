
import { render } from '@testing-library/react';
import React,{Component} from 'react';

const randomWords = ['harry','middle','books'];
class Throttle extends Component {
    constructor(props){
        super(props);
        this.state = {
            finalWord : ''
        }
    }
    findResults = ()=>{
        let randNum = Math.floor(Math.random() * randomWords.length);
        let newWord = this.state.finalWord;
        newWord = randomWords[randNum];
        this.setState({finalWord:newWord})
    }

    throttled = (fn,delay)=>{
        let shouldSelect = true;
        console.log('sjo',shouldSelect)
        return function(){
           if(shouldSelect){
            shouldSelect = false;
            fn();
            setTimeout(()=>{
            shouldSelect = true;
            console.log('Inside set timeout');
            },delay)
           }
           
        }
    }
    betterFunc = this.throttled(this.findResults,2000);
    render(){
        return(
            <div>
            <h1>See Throttling Effect</h1>
            <button onClick  = {this.betterFunc}>Find Random books</button>
            <p>{this.state.finalWord}</p>
        </div>
        )
    }
}


export default Throttle;