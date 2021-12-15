import React,{Component} from "react";
import axios from "axios";
import FilteredResults from "./FilteredResults";
import Throttle from "./Throttle";


class Debouncer  extends  Component {
    constructor(props){
        super(props);
        this.state={
            results:[]
        }
        this.URL = "https://www.googleapis.com/books/v1/volumes?q=";
        this.dataFormat = '&jscmd=data&format=json';
       this.getData = this.getData.bind();
    }

    getData =(e) =>{
        e.preventDefault();
        let val = e.target.value;
        this.fetchData(val);
    }

    fetchData = (data) =>{
        let resultsArr = []
        try{
           fetch(this.URL + data)
            .then(resp=>resp.json())
            .then((res) =>{
                if(res){
                    resultsArr = [...res.items];
                }
            
            }).catch(e=>console.log('Heeloo',e))
            .then(()=>{
                this.setState({results:resultsArr},()=>{
                    //console.log('My results',this.state.results);
                });
            })
        }
       
        catch(e){
           throw e;
        }
    }
   
    debouceEvents(fn,delay){
        let timeoutId;
        return function(...args){
            clearTimeout(timeoutId);
            timeoutId = setTimeout(()=>{
                fn(...args);
            },delay)
        }
        
    }
  
    render(){
        let titleArr = []
        if(this.state.results){
            this.state.results.map((x)=>{
                titleArr.push(x.volumeInfo.title);
            })
        }
        return(
            <div>
                Search for cars:
                <input type ="text"  onChange ={this.debouceEvents(this.getData,500)}/>
                <div>
                <br />
                   {titleArr.length?<FilteredResults data = {titleArr} />
                   :'Fetching'}
                </div>
                <Throttle />
            </div>
           
            

        )
    }
}
export default Debouncer;
