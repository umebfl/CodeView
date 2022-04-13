const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.post('/api/filebrowsingv2', (req, res) => {
    console.log('/filebrowsingv2', req.body)
    res.json({
        ok: true,
        msg: JSON.stringify(req.body),
    })
})

app.listen(5000, () => {
    console.log('localhost:5000')
})
