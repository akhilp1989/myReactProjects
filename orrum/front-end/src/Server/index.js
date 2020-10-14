const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const PORT = 4000
app.use(bodyParser.json())
app.listen(PORT, () => console.log(` Server running on port ${PORT}`))
app.post('/call', (req, res) => {
    console.log(req.query)
    const data = {
        status:'ringin'
    };
    res.json(data)
    res.status(200).end()
    
})