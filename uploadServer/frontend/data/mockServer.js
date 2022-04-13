const express = require('express')
const app = express()

const uploadServerData = require('./json/uploadServer3.json')
const diskData = require('./json/disk')

app.get('/data_center/get_upload_server_list', function (req, res) {
    console.log('/data_center/get_upload_server_list')
    res.json(uploadServerData)
})

app.get('/data_center/get_disk_list', function (req, res) {
    console.log('/data_center/get_disk_list')
    res.json(diskData)
})

app.get('/data_center/change_disk_inventory_status', function (req, res) {
    console.log('/data_center/change_disk_inventory_status')
    res.json({
        code: 0,
        msg: 'success',
    })
})

app.listen(8000)
