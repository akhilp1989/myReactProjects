import React from "react"
import PostPayments from "./PostPaymentClass"
import  PaymentComponent  from "./PaymentComponent";
import PaymentClass from "./PaymentClass";
import PostPaymentComponent from "./PostPaymentComponent";
import '../Styles/basic.styles.css'




const HomeComponent = ()=>{
    let showClassComponent = false
    return (
       <div className="parent">
           {showClassComponent ? 
            <>
            <PostPayments></PostPayments> 
            <PaymentClass ></PaymentClass> 
            </>  :
            <>
            <PostPaymentComponent></PostPaymentComponent>
              <PaymentComponent></PaymentComponent> 
            
            </>  
        }

           </div>
  
       
    )
}
export default HomeComponent;