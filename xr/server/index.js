const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.get('/search', (req, res) => {
    console.log('/search', req.body)
    res.json({
        dir: [
            {
                childCount: '2',
                lastModifiedTimestamp: 1618481963,
                name: 'playback/byd-cn-007/',
                sizeByte: '6133421978',
            },
            {
                childCount: '2',
                lastModifiedTimestamp: 1618481963,
                name: 'playback/byd-cn-009/',
                sizeByte: '6133421978',
            },
        ],
        failedReason: '',
        file: [],
        ok: true,
        prefix: 'playback/',
    })
})

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
