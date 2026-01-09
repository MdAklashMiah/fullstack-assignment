const express = require("express")
const router = require("./src/router")
require('dotenv').config()
const  app = express()

const PORT = process.env.PORT || 5000


app.use(router)


app.listen(PORT, ()=>{

    console.log(`server is running port is ${PORT}`)
})