import UserModel from "../models/userModel.js";


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