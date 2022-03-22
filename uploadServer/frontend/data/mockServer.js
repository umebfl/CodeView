const express = require('express')
const app = express()

const uploadServerData = require('./json/uploadServer.json')

app.get('/data_center/get_upload_server_list', function (req, res) {
    console.log('/data_center/get_upload_server_list')
    res.json(uploadServerData)
})

app.listen(8000)
