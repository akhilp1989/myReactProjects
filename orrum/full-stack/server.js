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
    id:'1',
    phoneNumber: '13018040009',
    status: 'idle'
},
{   id:'2',
    phoneNumber: '19842068287',
    status: 'idle'
},
{   id:'3',
    phoneNumber: '15512459377',
    status: 'idle'
},
{   id:'4',
    phoneNumber: '19362072765',
    status: 'idle'
},
{   id:'5',
    phoneNumber: '18582210308',
    status: 'idle'
},
{   id:'6',
    phoneNumber: '13018040009',
    status: 'idle'
},
{   id:'7',
    phoneNumber: '19842068287',
    status: 'idle'
},
{   id:'8',
    phoneNumber: '15512459377',
    status: 'idle'
},
{   id:'9',
    phoneNumber: '19362072765',
    status: 'idle'
}
    
]
    
var nextId=3
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
 
app.post('/start', async (req,resp) => {
    populateAndCall(phoneMap[0].phoneNumber)
     populateAndCall(phoneMap[1].phoneNumber)
    populateAndCall(phoneMap[2].phoneNumber)
})

populateAndCall = async (phone) => {
    //console.log('calling phone-',phone)
    var data = {
        phone: phone,
        webhookURL:WEBHOOK_URL
   }
    try {
         await axios.default.post(API_URL, data)
    }
    catch(e){
        console.log('Error-',e)
    }   
   
}


app.post('/api/call', async (req, resp) => {
    console.log(req.body)
    updatePhoneData(req.body)
    if (req.body.status === 'completed') {
         callNextNumber()
    }
    resp.end("updated ")
    
})
callNextNumber = () => {
    if (nextId <phoneMap.length) {
        //console.log(phoneMap[nextId].phoneNumber)
        populateAndCall(phoneMap[nextId].phoneNumber)
    }
    nextId++    
}

updatePhoneData = (obj) => {
    phoneMap.map(k => {
        if (k.id == obj.id) {
            k.status = obj.status 
        }
    })
    progressEmitter.emit('update',obj) 
   //console.log(phoneMap)
}
app.listen(PORT, () => console.log(` Server running on port ${PORT}`))
