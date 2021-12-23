import express from 'express'

import source from './source'

const app = express()

source(app)

app.listen(9000, () => {
    console.log('localhost:9000')
})
