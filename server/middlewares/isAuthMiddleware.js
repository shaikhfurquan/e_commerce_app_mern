
import JWT from 'jsonwebtoken'
import UserModel from '../models/userModel.js'

export const isAuthenticated = async (req, res, next) => {
    try {
        // const token = req.headers.authorization;
        const token = req.headers["authorization"].split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access: No token provided"
            });
        }
        const decodedUser = JWT.verify(token, process.env.JWT_SECRET)
         req.user = decodedUser

        next()

    } catch (error) {

            return res.status(500).json({
                success: false,
                message: "Authentication error",
                error: error.message
            });
    }
}


//Admin access


export const isAdmin = async (req, res, next) => {
    try {

        let id = req.user._id;
        const user = await UserModel.findById({_id : id});
        
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        if (user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access, Only admin can access"
            });
        } else {
            next();
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "isAdmin middleware error",
            error: error.message
        });
    }
};