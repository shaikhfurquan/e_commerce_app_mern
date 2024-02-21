import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthMiddleware.js';
import { isAdmin } from '../middlewares/isAdminMiddleware.js';
import { createProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/create-product' , isAuthenticated , isAdmin , createProduct)


export default productRouter