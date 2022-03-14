import express from 'express'
import bodyParser from 'body-parser'

import 品种信息 from './接口/品种信息'

const app = express()

app.use(bodyParser.json())

品种信息(app)

app.listen(9000, () => {
    console.log('localhost:9000')
})
