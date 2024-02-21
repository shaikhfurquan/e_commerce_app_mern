import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthMiddleware.js';
import { isAdmin } from '../middlewares/isAdminMiddleware.js';
import { createCategory, deleteCategory, getAllCategory, getSingleCategory, updateCategory } from '../controllers/categoryController.js';

const categoryRouter = express.Router();


categoryRouter.post('/create-category' , isAuthenticated , isAdmin , createCategory)

categoryRouter.get('/get-all' , isAuthenticated , isAdmin , getAllCategory)

categoryRouter.get('/get/:id' , isAuthenticated , isAdmin , getSingleCategory)

categoryRouter.put('/update-category/:id' , isAuthenticated , isAdmin , updateCategory)

categoryRouter.delete('/delete-category/:id' , isAuthenticated , isAdmin , deleteCategory)

export default categoryRouter