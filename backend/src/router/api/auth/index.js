const express = require("express")
const { registerController, loginController } = require("../../../controller/authController")
const router = express.Router()

console.log("AUTH ROUTER LOADED")


router.post("/register" , registerController)
router.post("/login", loginController)


module.exports = router