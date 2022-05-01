import React from "react";
import * as io from 'socket.io-client'
const socket = io.connect('http://localhost:8088');
socket.on('connect',()=>{
  console.log('Server connected');
})
function App(){
return(
< div>
  <h1>Hello world</h1>
</div>

)
}
export default App;
