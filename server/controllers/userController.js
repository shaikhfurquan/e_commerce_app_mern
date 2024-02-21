import { generateToken } from "../helpers/generateToken.js";
import { comparePassword, hashPassword } from "../helpers/userPasswordHelper.js"
import UserModel from "../models/userModel.js"

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body
        if (!name || !email || !password || !phone || !address || !answer) {
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
        const newUser = await UserModel.create({ name, email, phone, address,answer ,password: hashedPassword })

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
                message: "Please provide all fields"
            })
        }
        //check whether the user exists or not
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist, Register first"
            })
        }

        //if user is there then we will compare the password(userPassword & insideDB user.password)
        const isMath = await comparePassword(password, user.password)
        if (!isMath) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }
        const token = await generateToken(user)
        user.password = undefined

        res.status(200).json({
            success: true,
            message: `Welcome ${user.name}`,
            user: user,
            token: token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while login user",
            error: error.message
        })
    }
}


export const forgotPassword = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body
        if (!email || !newPassword || !answer) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        //check email and answer if these are true then we will allow to update/change password
        const user = await UserModel.findOne({ email , answer })
        if (!user) {
            return res.status(400).json({
                success: false,
                message : "Wrong email or answer"
            })
        }
        const hashed = await hashPassword(newPassword)
        await UserModel.findByIdAndUpdate(user._id, {password: hashed})
        res.status(200).json({
            success: true,
            message : "Password Reset successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}


export const updatePassword = async (req, res) => {
    try {
        //finding user on the basis of id
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found with this id"
            })
        }

        //getting the data from the req.body
        const { oldPassword, newPassword } = req.body
        if (!oldPassword || !newPassword) {
            return res.status(404).json({
                success: false,
                message: "Please provide OldPassword and NewPassword"
            })
        }

        //compare the oldPassword and userPassword
        const isMatch = await comparePassword(oldPassword, user.password)
        if (!isMatch) {
            return res.status(500).json({
                success: false,
                message: "Invalid old password"
            })
        }

        //hashing the password
        const updateHashPassword = await hashPassword(newPassword, 10)
        user.password = updateHashPassword
        await user.save()

        res.status(200).json({
            success: true,
            message: "Password updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            succcess: false,
            message: "Error while updating user password",
            error: error.message
        })
    }
}