import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthMiddleware.js';
import { isAdmin } from '../middlewares/isAdminMiddleware.js';
import { createCategory } from '../controllers/categoryController.js';

const categoryRouter = express.Router();


categoryRouter.post('/create-category' , isAuthenticated , isAdmin , createCategory)

export default categoryRouter