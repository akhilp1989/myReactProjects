var express = require('express');
var axios = require('axios');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
var PORT = 6000
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

app.get('/', async (req, resp) => {
    resp.send(phoneMap)
})
app.post('/api/call', function (req, res) {
    console.log(req.body)
   
    updatePhoneMap(req.body)
    
})

updatePhoneMap = (data) => {
   // console.log('Being called')
    phoneMap.map(k => {
       // console.log('kk-',k.id,data.id,k.status,data.status)
        if (k.id == data.id) {
            console.log('Found id')
            k.status=data.status
        }
        progressEmitter.emit('update',data) 
    })
   // console.log(phoneMap)
}

var data = {
    phone: "13018040009",
    webhookURL: 'http://localhost:6000/api/call'
}
axios.post('http://localhost:4830/call', data).
    then(resp => console.log('Resp-', resp.data))


app.listen(PORT, () => console.log(` Server running on port ${PORT}`))
