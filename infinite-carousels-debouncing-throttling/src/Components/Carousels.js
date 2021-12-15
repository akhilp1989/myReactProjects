import React,{Component} from 'react'; 
import data from '../Utils/data';

class Carousels extends Component{
    constructor(props){
        super(props);
        this.state ={
            filterdList : [],
            list : data,
            startIndex : 0,
            filteredVal : ''
        }
        this.MAX_LEN = 3;
        this.showNext= this.showNext.bind();
        this.showPrev = this.showPrev.bind();
        this.filterCars = this.filterCars.bind();
    }

    componentDidMount(){
        let origList = [...this.state.list];
         origList = origList.slice(this.state.startIndex,this.MAX_LEN);
        this.setState({filterdList:origList})
    }
    showNext = (e)=>{
        e.stopPropagation && e.stopPropagation();
        console.log('show next is clicked',this.state.startIndex);
         let origList = [...this.state.list];
        let curIndex = this.state.startIndex;
        if(curIndex + this.MAX_LEN > this.state.list.length){
            curIndex = 0;
        }
        let endIndex = curIndex + this.MAX_LEN;
        //console.log(curIndex,endIndex)
        origList = origList.slice(curIndex,endIndex);
        this.setState({filterdList:origList,startIndex:curIndex + this.MAX_LEN},()=>console.log(this.state.startIndex));
    }
    //  choosePos = (currentPos, chooseFromArr) => {
    //     const i = chooseFromArr.indexOf(currentPos)+1
    //     const n = chooseFromArr.length
    //     return chooseFromArr[(i % n + n) % n]
    // }
    showPrev = (e) =>{
        e.stopPropagation && e.stopPropagation();
        console.log('show prev is clicked',this.state.startIndex);
        let origList = [...this.state.list];
        let curIndex = this.state.startIndex;
         if(curIndex + this.MAX_LEN > this.state.list.length){
            curIndex = 0;
        }
        else if(curIndex < 0 ){
            //curIndex = Math.floor(this.state.list.length/2);
            curIndex  = this.state.list.length - this.MAX_LEN -1;
        }
        let endIndex = curIndex + this.MAX_LEN;
        //console.log(curIndex,endIndex);
        origList = origList.slice(curIndex,endIndex);
        this.setState({filterdList:origList,startIndex:curIndex - this.MAX_LEN},()=>console.log(this.state.startIndex));
   
    }
    filterCars = (e) =>{
        e.preventDefault();
       let origList = [...this.state.list];
       let val = e.target.value;
       if(!Number(val)){
           alert('Please enter a number');
           val = ''
       }
       else if(Number(val) >= this.state.list.length){
            alert('Value is more than number of items');
            val = '';
       }
       if(Number(val) > 0)
        origList = origList.slice(0,Number(val));
       this.setState({filteredVal:val,filterdList:origList});
    }
    render(){
        return(
            <div>
                <div>Search for cars : <input onChange={this.filterCars} type = 'text' value={this.state.filteredVal} /></div>
               {(this.state.filterdList && this.state.filterdList.length > 0) ?this.state.filterdList.map((li,i)=>{
                   return <img alt = 'alt text' key = {i} src = {li}/>
               }):null}
               <br/>
               <button onClick = {this.showNext}> Show Next</button>
            <button onClick = {this.showPrev}>Show Prev</button>
            </div>
        )
    }
}

export default Carousels