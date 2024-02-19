
import JWT from 'jsonwebtoken'


// protected routes using JWT token
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
            message: "Authentication error, Not a valid token",
            error: error.message
        });
    }
}


