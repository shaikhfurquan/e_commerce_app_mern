import { error } from 'console'
import ProductModel from '../models/productModel.js'
import fs from 'fs'
import slugify from 'slugify'


export const createProduct = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files

        if (!name || !description || !price || !category || !quantity ) {
            return res.status(404).json({
                success: false,
                message: "All fields are required"
            })
        }

        if (photo && photo.size > 1000000) {
            return res.status(404).json({
                message: "Photo is required & less than 1MB"
            })
        }
        //creating one copy of product before saving
        const newProduct = ProductModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            newProduct.photo.data = fs.readFileSync(photo.path)
            newProduct.photo.contentType = photo.type
        }
        await newProduct.save()
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            newProduct: newProduct
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating product",
            error: error.message
        })
    }
}


export const getProduct = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error getting  products",
            error: error.message
        })
    }
}


export const getSingleProduct = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating product",
            error: error.message
        })
    }
}


export const updateProduct = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating product",
            error: error.message
        })
    }
}


export const deleteProduct = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting product",
            error: error.message
        })
    }
}

