const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
const rundb = require('./utils/mognodb._connection')

require('dotenv').config()

// middlewares
app.use(express.json())
app.use(cors())


rundb()

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening on port port`)
})