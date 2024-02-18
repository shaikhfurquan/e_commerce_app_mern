
import express from 'express'
import { loginUser, registerUser } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/isAuthMiddleware.js';
import { isAdmin } from '../middlewares/isAdminMiddleware.js';


const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);


userRouter.get('/get', isAuthenticated , isAdmin ,  (req, res)=>{
    res.json({message : "Welcome"})
});


export default userRouter
