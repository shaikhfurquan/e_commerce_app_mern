import ProductModel from '../models/productModel.js'


export const createProduct = async (req, res) =>{
    try {
        await ProductModel.create()
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error creating product",
            error : error.message
        })
    }
}


export const getProduct = async (req, res) =>{
    try {
        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error getting  products",
            error : error.message
        })
    }
}


export const getSingleProduct = async (req, res) =>{
    try {
        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error creating product",
            error : error.message
        })
    }
}


export const updateProduct = async (req, res) =>{
    try {
        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error updating product",
            error : error.message
        })
    }
}


export const deleteProduct = async (req, res) =>{
    try {
        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error deleting product",
            error : error.message
        })
    }
}

