import axios from "axios";
import React,{Component} from "react";
import {connect} from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { actionTypes } from "../Actions/Constants";
const USERURL ='http://localhost:8080/users'
const PAYMENTURL = 'http://localhost:8080/payments'
const initialState = {
    users :[],
    senderName : '',
    recieverName : '',
    amount :0,
    currency:'USD',
    senderObj : {},
    recieverObj : {},
    memo:'',
}




class PostPayments  extends Component  {
    constructor(props){
        super();
        this.state = {...initialState,paymentSuccessful:false,payment:[]}
    
    this.fetchData = this.fetchData.bind(this);
    this.updateData = this.updateData.bind(this);
    this.setCurrency = this.setCurrency.bind(this);
    this.populateOj = this.populateOj.bind(this);
    this.clearStateFields = this.clearStateFields.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this.createPostMessage = this.createPostMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setMemo = this.setMemo.bind(this);
    this.setAmount = this.setAmount.bind(this)
    this.setRecieverName = this.setRecieverName.bind(this);
    this.setSenderName = this.setSenderName.bind(this);    
    }

    componentDidMount(){
       this.fetchData();
    }
    fetchData = ()=>{
        axios.get(USERURL)
        .then(resp =>resp.data)
        .then(data => this.updateData(data.data));
    }

    updateData = (data)=>{
        let origUsers = [...this.state.users,...data]
        this.setState({users:origUsers});
    }

    setSenderName = (e)=>{
        this.setState({senderName:e.target.value});
        this.setState({senderObj:this.populateOj('sender')})
    }
    setRecieverName = (e)=>{
        this.setState({recieverName:e.target.value})
        this.setState({recieverObj:this.populateOj('reciever')})

    }
    setAmount = (e) =>{
        this.setState({amount:e.target.value});
    }
    setMemo = (e) =>{
        this.setState({memo:e.target.value});
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        this.createPostMessage();
    }
    createPostMessage = ()=>{
        try{
            if(!this.state.senderObj[0] || !this.state.recieverObj[0]){
                alert('Sender Details or recieiver detais are incorrect');
                throw new Error('Sender Details or receiver details are incorrect');
            }else{
            const data  = {};
            data['id'] = uuidv4();
            data['date'] = new Date().toISOString();
            data['sender'] = this.state.senderObj[0];
            data['receiver'] = this.state.recieverObj[0];
            data['amount'] = this.state.amount;
            data['currency'] = this.state.currency
            data['memo'] = this.state.memo;
            this.postMessage(data)
            }
        }
        catch(err){
            console.warn(err.message);
        } 
    }
    postMessage = (results)=>{
        
        axios.post(PAYMENTURL,results,{
            'Content-type': 'application/json' 
        })
        .then(resp => {
            if(resp.status === 201 || resp.status === 409){
                this.clearStateFields();
                this.props.sendMessage(results);
            }
           
        }).catch(err=>{
            if(err.response?.status === 503){
                this.postMessage(results);
            }
            else{
                throw new Error(err.response);
            }
        });
    }

    clearStateFields = ()=>{
        this.setState({initialState,paymentSuccessful:true});     
    }

    populateOj = (payee)=>{
        let obj = {};
        if(payee === 'sender'){
        const senderName = this.state.senderName;
        obj = this.state.users.filter(u=>{
            return u['name'].toLowerCase().includes(senderName.toLowerCase());
        })
        }
        else if(payee === 'reciever'){
            const recieverName = this.state.recieverName;
        obj = this.state.users.filter(u=>{
            return u['name'].toLowerCase().includes(recieverName.toLowerCase());
        })
        }
        return obj;
    }
    setCurrency = (e)=>{
        this.setState({currency:e.target.value});
    }

    render(){
        return(
          <>
          {this.state.paymentSuccessful ? 
          <div>
              <h1>Thank you for payment</h1>
              <button type="button" onClick={()=>this.setState({paymentSuccessful:!this.state.paymentSuccessful})} className="btn btn-primary">Create More Payments</button>
          </div>:
              <form >
        <div className="mb-3">
        <label >Sender</label>
        <input type="text" className="form-control"  onChange={this.setSenderName} value ={this.state.senderName}/>
        <label  className="form-label">Reciever</label>
        <input type="text" className="form-control" onChange={this.setRecieverName} value ={this.state.recieverName} />
        <label  className="form-label">Amount</label>
        <input type="text" className="form-control" onChange={this.setAmount} value ={this.state.amount} />
        <label  className="form-label">Memo</label>
        <input type="text" className="form-control"onChange={this.setMemo} value ={this.state.memo} />
        <label>Currency :</label> 
        <select className="form-select"  onChange={this.setCurrency}>
        <option value="BTC">BTC</option>
        <option value="GBP">GBP</option>
        <option value="EUR">EUR</option>
        <option value="JPY">JPY</option>
        <option value="USD">USD</option>
        </select>
        </div>
        <button type="button" onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
       
       </form>
    }

          </>  
        )

    }
}
const mapDispatchToProps = dispatch=>({
    sendMessage : results=>dispatch({type:actionTypes.POST_PAYMENT,payload:results}),
})
 export default connect(null,mapDispatchToProps)(PostPayments)