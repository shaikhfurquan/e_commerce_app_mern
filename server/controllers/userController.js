import { generateToken } from "../helpers/generateToken.js";
import { comparePassword, hashPassword } from "../helpers/userHelper.js"
import UserModel from "../models/userModel.js"

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body
        console.log(req.body);
        if (!name || !email || !password || !phone || !address) {
            return res.status(404).json({
                success: false,
                message: "Please provide all fields"
            })
        }
        //checking whether the user is exists or not
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.status(404).json({
                success: false,
                message: "User already register, Please login"
            })
        }

        //registration of user(hashing the password from the req.body)
        const hashedPassword = await hashPassword(password)
        const newUser = await UserModel.create({ name, email, phone, address, password: hashedPassword })

        res.status(201).json({
            success: true,
            message: "User registration successful",
            newUser: newUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while registering user",
            error: error.message
        })
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(401).json({
                success: false,
                message: "Please provid all fields"
            })
        }
        //check wheather the user exists or not
        const user = await UserModel.findOne({ email })
        if (!user){
            return res.status(400).json({
                success: false,
                message : "User does not exist, Register first"
            })
        }

        //if user is there then we will compare the password(userPassword & insideDB user.password)
        const isMath = await comparePassword(password , user.password)
        if(!isMath){
            return res.status(400).json({
                success: false,
                message : "Invalid Credentials"
            })
        }
        const token = await generateToken(user)
        user.password = undefined

        res.status(200).json({
            success: true,
            message : `Welcome ${user.name}`,
            user : user,
            token : token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while login user",
            error: error.message
        })
    }
}