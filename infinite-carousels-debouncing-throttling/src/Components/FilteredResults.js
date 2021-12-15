import React,{Component} from "react";

class FilteredResults extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterarr : this.props.data,
            pageIndex : 0,
            activeIndex : 0
        }
        this.paginationLen = 3;
        this.getNextItems = this.getNextItems.bind(this);
    }
    componentDidMount(){
        let newIndex = this.state.pageIndex;
        if(this.state.filterarr && this.state.filterarr.length){
            newIndex =  Math.ceil(this.state.filterarr.length / this.paginationLen);
        }
            
        this.setState({pageIndex:newIndex})
    }
    componentDidUpdate(prevProps){
        if(prevProps.data.join('-') != this.props.data.join('-')){
            console.log('component should update')
            this.setState({filterarr:this.props.data,activeIndex:0})
        }
    }
    getNextItems = (e)=>{
      let currentValue = this.state.activeIndex;
      let newVal = parseInt(e.target.value) - 1;
      currentValue = newVal * this.paginationLen;
      this.setState({activeIndex:currentValue});
    }
    render(){
        let endIndex = this.state.pageIndex;
        let paginationNumbers = [];
        let newArr = [];
        let startIndex = this.state.activeIndex;
       if(this.state.filterarr && this.state.filterarr.length > 0){
            newArr = this.state.filterarr.slice(startIndex,startIndex + this.paginationLen);
       }
       for(let i = 1; i <= endIndex;i++){
        paginationNumbers.push(i)
       }
      
        return(
            <div>
                {newArr && newArr.length > 0 ? newArr.map((d,id)=>{
                    return <li key = {id}>{d}</li>
                }) : null}
                <br/>
                <div>{paginationNumbers.length > 0 ?paginationNumbers.map((i,id)=>{
                   return <span key = {id}><button value = {i}  onClick = {this.getNextItems}>{i}</button> </span>
               }):null}</div>
               
            </div>
        )
    }
}

export default FilteredResults