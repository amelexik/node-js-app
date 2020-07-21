require('dotenv').config({path: __dirname + '/.env'});
const express = require('express')
const userRouter = require('./src/routes')
const port = process.env.PORT  || 5000;
require('./src/db')

const app = express()

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})