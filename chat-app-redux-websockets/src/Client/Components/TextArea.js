import React from 'react';
import { connect } from 'react-redux';

const TextArea = (props)=>{
    function sendMessage(e) {
        if(e.which && e.which == 13){
            console.log(e.target.value);
        }
      
    }
    return(
        <label >
            Enter:
           <textarea onKeyPress = {sendMessage} />
        </label>
            
        
    )
}

export default TextArea