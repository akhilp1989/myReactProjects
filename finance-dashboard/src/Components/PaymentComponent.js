import axios from "axios";

import React,{useState,useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";

import { actionTypes } from "../Actions/Constants";

import { utils } from "../Utils/Filter";


 const PaymentComponent = ()=>{
    const [searchTerm,setSearchTerm] = useState('');

    const dispatch = useDispatch();
    let reduxState = useSelector(state=>state.payments.slice(Math.max(state.payments.length - 25,0)).reverse());
    
    useEffect (()=>{
        const getData = async()=>{
         let resp = await axios.get('http://localhost:8080/payments');
         let res = await resp.data;
        dispatch({type:actionTypes.POST_PAYMENT,payload:res.data});
     }
        const repeatInterval = setInterval(()=>getData(),1000);
        return(()=>clearInterval(repeatInterval))

    },[dispatch])

   
   if(searchTerm){
    reduxState = utils.getFilteredData(reduxState,searchTerm.toLowerCase());
   }
    return(
        <div className="payment">
                <p>Browse Payments</p>
                Search <input
                type="text"
                onChange = {(e)=>setSearchTerm(e.target.value)}
                />
                 <table className = "table">
                    <tbody>
                    <tr>
                    <th scope = 'col'><b>Sender</b></th>
                    <th scope = 'col'><b>Receiver</b></th>
                    <th scope = 'col'><b>Amount</b></th>
                    <th scope = 'col'><b>Currency</b></th>
                    </tr>
                     {reduxState && reduxState.length ?
                    reduxState.map((d,id)=>{
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

export default PaymentComponent
