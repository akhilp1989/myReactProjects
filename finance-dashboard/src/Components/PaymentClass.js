import axios from "axios";
import React,{Component} from "react";
import {utils} from '../Utils/Filter'
import {connect} from 'react-redux'
import { actionTypes } from "../Actions/Constants";
import '../Styles/basic.styles.css'


class PaymentList extends Component{
    constructor(props){
        super(props);
        this.state = {
            origData : [],
            filteredData : [],
            searchText : ''
        }
        this.fetchData = this.fetchData.bind(this);
        this.updateData = this.updateData.bind(this);
        this.setSearchText= this.setSearchText.bind(this);
    }
    
    
    componentDidMount(){
        this.apiTimerSecs = setInterval(this.fetchData,1000);
    }

    fetchData= ()=>{
        const paymentsURL = 'http://localhost:8080/payments';
        axios.get(paymentsURL)
        .then(resp => resp.data)
        .then(res=>{
          return  this.updateData(res.data)
        });
       
        
    }
    updateData=(data)=>{
       let updatedArr = [...this.props.payments].flat();
       updatedArr = updatedArr.slice(Math.max(updatedArr.length - 25,0)).reverse();
       let searchTerm = this.state.searchText;
       if(searchTerm.toLowerCase()){
           this.setState({filteredData:utils.getFilteredData(updatedArr,this.state.searchText)});
       }
       else{
        this.props.dispatch({type:actionTypes.POST_PAYMENT,payload:data})
           this.setState({filteredData:updatedArr})
       }
       
    }
   
    setSearchText = (e)=>{
        this.setState({searchText : e.target.value});

    }
    componentWillUnmount(){
       clearInterval(this.apiTimerSecs);
    }
      render(){

        return(
            <div className="payment">
                <p>Browse Payments</p>
                Search <input
                type="text"
                onChange = {this.setSearchText}
                
                />
                <table className = "table">
                    <tbody>
                    <tr>
                    <th scope = 'col'><b>Sender</b></th>
                    <th scope = 'col'><b>Receiver</b></th>
                    <th scope = 'col'><b>Amount</b></th>
                    <th scope = 'col'><b>Currency</b></th>
                    </tr>
                 
                   
                    {this.state.filteredData && this.state.filteredData.length ?
                    this.state.filteredData.map((d,id)=>{
                        return (
                            <tr key = {id}>
                                 <td>{d.sender.name}</td>
                                <td>{d.receiver.name}</td>
                                <td>{d.currency}</td>
                                <td>{d.amount}</td> 

                            </tr>
                        )
                    })
                    
                    : null}
                       </tbody>
                </table>
                
            
            </div>

        )

    }
}
const mapStateToProps = (state,ownProps)=>{
    const reduxState = state
   return reduxState

}
export default connect(mapStateToProps)(PaymentList);