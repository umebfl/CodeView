import express from 'express'

import source from 'src/source'

const app = express()

app.get('/source', source)

app.listen(9000)
