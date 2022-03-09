import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { actionTypes } from "../Actions/Constants";
const USERURL ='http://localhost:8080/users'
const PAYMENTURL = 'http://localhost:8080/payments'
const updateUsers = async()=>{
    let resp = await axios.get(USERURL);
    let res = await resp.data;
    return res.data
}

const PostPaymentComponent = ()=>{
    const [users,setUsers] = useState([]);
    const [senderName,setSenderName] = useState('');
    const [receiverName,setReceiverName] = useState('');
    const [currency,setCurrency] = useState('USD');
    const [amount,setAmount] = useState(0);
    const [memo,setMemo] = useState('');
    const [senderObj,setSenderObj] = useState({});
    const [receiverObj,setReceiverObj] = useState({});
    const [paymentSuccessful,setPaymentSuccessful] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
       updateUsers()
       .then(res=>setUsers(res));
    },[])
    const handleSubmit = (e)=>{
        e.preventDefault();
        createPaymentObj();
    }

    const setReceiverValues =(val)=>{
        setReceiverName(val);
        setReceiverObj(receiverObj=>populateObj('receiver'))
    }
    const setSenderValues =(val)=>{
        setSenderName(val);
        setSenderObj(senderObj=>populateObj('sender'));
    }

   const  populateObj = (payee)=>{
        let obj = {};
        if(payee === 'sender'){
        const sName = senderName;
        obj = users.filter(u=>{
            return u['name'].toLowerCase().includes(sName.toLowerCase());
        })
        }
        else if(payee === 'receiver'){
            const rName = receiverName;
        obj = users.filter(u=>{
            return u['name'].toLowerCase().includes(rName.toLowerCase());
        })
        }
        return obj
    }

    const  createPaymentObj = ()=>{
        try{
            if(!senderObj[0] || !receiverObj[0]){
                alert('Sender Details or recieiver detais are incorrect');
                throw new Error('Sender Details or receiver details are incorrect');
            }else{
            const data  = {};
            data['id'] = uuidv4();
            data['date'] = new Date().toISOString();
            data['sender'] = senderObj[0];
            data['receiver'] = receiverObj[0];
            data['amount'] = amount;
            data['currency'] = currency
            data['memo'] = memo;
            //console.log(data);
            postMessage(data)
            }
        }
        catch(err){
            console.warn(err.message);
        } 
    }

    const postMessage = (results)=>{
        axios.post(PAYMENTURL,results,{
            'Content-type': 'application/json' 
        })
        .then(resp => {
            if(resp.status === 201 ){
                dispatch({type:actionTypes.POST_PAYMENT,payload:results});
                clearFields();
            }
           
        }).catch(err=>{
            //console.log(err);
            if(err.response?.status === 503){
                postMessage(results);
            }
        }).catch(err=>{
            if(err.response?.status === 409){
                console.warn('Payment already made');
            }
        })
    }

    const clearFields = ()=>{
        setSenderName('');
        setReceiverName('');
        setSenderObj({});
        setReceiverObj({});
        setCurrency('USD');
        setAmount(0);
        setMemo('');
       // setPaymentSuccessful(true);
    }

    return(
        <>
        {paymentSuccessful ? 
        <div>
             <h1>Thank you for payment</h1>
              <button type="button" onClick={setPaymentSuccessful(!paymentSuccessful)} className="btn btn-primary">Create More Payments</button>
        </div> :
        <form >
        <div className="mb-3">
        <label >Sender</label>
        <input type="text" className="form-control"  onChange={(e)=>setSenderValues(e.target.value)} value ={senderName}/>
        <label  className="form-label">Reciever</label>
        <input type="text" className="form-control" onChange={(e)=>setReceiverValues(e.target.value)} value ={receiverName} />
        <label  className="form-label">Amount</label>
        <input type="text" className="form-control" onChange={(e)=>setAmount(e.target.value)} value ={amount} />
        <label  className="form-label">Memo</label>
        <input type="text" className="form-control"onChange={(e)=>setMemo(e.target.value)} value ={memo} />
        <label>Currency :</label> 
        <select className="form-select"  onChange={(e)=>setCurrency(e.target.value)}>
        <option value="BTC">BTC</option>
        <option value="GBP">GBP</option>
        <option value="EUR">EUR</option>
        <option value="JPY">JPY</option>
        <option value="USD">USD</option>
        </select>
        </div>
        <button type="button" onClick={handleSubmit} className="btn btn-primary">Submit</button>
       
       </form>
}
        </>
        
    )

}

export default PostPaymentComponent
