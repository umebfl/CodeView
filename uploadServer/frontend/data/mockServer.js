const express = require('express')
const app = express()

const uploadServerData = require('./json/uploadServer3.json')
const getDisksInfoData = require('./json/get_disks_info.json')
const getUploadRecordsData = require('./json/disk_management/get_upload_records.json')
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

app.get('/data_center/get_diskPAURecords_list', function (req, res) {
    console.log('/data_center/get_diskPAURecords_list')
    res.json({
        code: 0,
        msg: 'success',
        data: {
            diskPAURecords: [
                {
                    id: 1,
                    seq: 1,
                },
            ],
        },
    })
})

app.get('/disk_management/get_disks_info', function (req, res) {
    console.log('/disk_management/get_disks_info')
    res.json(getDisksInfoData)
})

app.post('/disk_management/upsert_disk_info', function (req, res) {
    console.log('/disk_management/get_disks_info')
    res.json({
        code: 0,
        msg: 'success',
    })
})

app.get('/disk_management/get_upload_records', function (req, res) {
    console.log('/disk_management/get_disks_info')
    res.json(getUploadRecordsData)
})

app.listen(8000)
