const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userModel = require("../model/user.model")

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env 

let registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already in use"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword
        })

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: newUser
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

let loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email & password are required"
            })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign(
            { id: user._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN || "2h" }
        )

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            data: user,
            token
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

module.exports = {
    registerController,
    loginController
}
