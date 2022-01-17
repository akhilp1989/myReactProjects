import React  from "react";
import ChatWindow from "./ChatWindow";

const header = ()=>{
    return(
        <div>
            <h1>Hello from header</h1>
            <span>Your name:</span>
            <span> </span>
            <span>Your room name</span>
            <ChatWindow />
        </div>
    )
}
export default header