const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.get('te', (req, res) => {
    console.log('te', req.body)
    res.json({
        ok: true,
        // msg: JSON.stringify(req.body),
    })
})

app.post('te', (req, res) => {
    console.log('te', req.body)
    res.json({
        ok: true,
        // msg: JSON.stringify(req.body),
    })
})

app.listen(5000, () => {
    console.log('localhost:5000')
})
