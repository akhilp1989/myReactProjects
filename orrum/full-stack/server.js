var express = require('express');
var axios = require('axios');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
var PORT = 5000
var events = require('events');
var progressEmitter = new events.EventEmitter();
var phoneMap = [{
    phoneNumber: '13018040009',
    status: 'idle'
},
{   
    phoneNumber: '19842068287',
    status: 'idle'
},
{   
    phoneNumber: '15512459377',
    status: 'idle'
},
{   
    phoneNumber: '19362072765',
    status: 'idle'
},
{   
    phoneNumber: '18582210308',
    status: 'idle'
},
{   
    phoneNumber: '13018040009',
    status: 'idle'
},
{   
    phoneNumber: '19842068287',
    status: 'idle'
},
{   
    phoneNumber: '15512459377',
    status: 'idle'
},
{   
    phoneNumber: '19362072765',
    status: 'idle'
}
    
]
var phoneId=[]
var nextId=1
var WEBHOOK_URL='http://localhost:5000/api/call'
var API_URL = 'http://localhost:4830/call'
app.get('/', async (req, resp) => {
    resp.send(phoneMap)
})
app.get('/getData', function (req, resp) {
    resp.writeHead(200, {'Content-Type': 'text/event-stream'});
    progressEmitter.on('update',function(phoneMap){
         //console.log('update event fired for : ' + JSON.stringify(phoneMap));
         resp.write("event: update\n");
         resp.write("data: "+JSON.stringify(phoneMap)+"\n\n");
    });
        
    })
 
app.post('/start', async (req, resp) => {
    for (var i = 0; i <= 2; i++){
        populateAndCall(phoneMap[i].phoneNumber)
        nextId++
    }
    resp.send('done')
})

populateAndCall = async (phone) => {
    var data = {
        phone: phone,
        webhookURL:WEBHOOK_URL
   }
    try {
        axios.default.post(API_URL, data)
            .then(resp=>createPhoneId(resp.data.id,phone))
       }
    catch(e){
        console.log('Error-',e)
    }   
    
}

createPhoneId=(id, phone)=>{
    phoneId.push({'id':id,'phone':phone})
}
removeId = (id) => {
    for (var i = 0; i < phoneId.length;i++) {
        if (phoneId[i].id == id) {
            phoneId.splice(i,1)
        }
    }
   // console.log(phoneId)
}
app.post('/api/call', async (req, resp) => {
    console.log(req.body)
    updatePhoneData(req.body)
    if (req.body.status === 'completed') {
        removeId(req.body.id)
         callNextNumber()
    }
    resp.end("updated ")
    
})
callNextNumber = () => {
    //console.log(nextId)
    if (nextId <phoneMap.length) {
        //console.log(phoneMap[nextId].phoneNumber)
        populateAndCall(phoneMap[nextId].phoneNumber)
    }
    nextId++    
}

updatePhoneData = (obj) => {
   // console.log(phoneId)
    phoneId.map(k => {
        if (k.id == obj.id) {
    
            phoneMap.map(x => {
      
                if (k.phone == x.phoneNumber) {
               
                   x.status=obj.status
               }
           })
       }
   })
    progressEmitter.emit('update',phoneMap) 
  
}
app.listen(PORT, () => console.log(` Server running on port ${PORT}`))
