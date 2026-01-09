const express = require("express")
const router = express.Router()
const auth = require("./auth")

console.log("API ROUTER LOADED")


router.use("/auth", auth)


module.exports = router