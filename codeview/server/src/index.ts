import express from 'express'
const bodyParser = require('body-parser')

import source from './source'

const app = express()

app.use(bodyParser.json())

source(app)

app.listen(9000, () => {
    console.log('localhost:9000')
})
