const express = require("express")
require('dotenv').config()
const router = require("./src/router")
const cors = require("cors");
const DBConnect = require("./src/config/dbconfig");
const  app = express()

const PORT = process.env.PORT || 5000
app.use(cors());

app.use(express.json());

DBConnect

app.use(router)


app.listen(PORT, ()=>{
    console.log(`server is running port is ${PORT}`)
})