import slugify from "slugify"
import CategoryModel from "../models/categoryModel.js"

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(404).json({
                success: false,
                message: "Name is required"
            })
        }
        // checking existing category(for avoiding duplicate)
        const existingCategory = await CategoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(404).json({
                success: false,
                message: "Category with this name already exists"
            })
        }

        //if category not exists then we will create it
        const category = await CategoryModel.create({ name, slug: slugify(name) })
        res.status(500).json({
            success: true,
            message: "New category created successfully",
            category: category

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while category",
            error: error.messsage
        })
    }
}


export const getCategory = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Category lists",

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while category",
            error: error.messsage
        })
    }
}


export const updateCategory = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Category updated successfully",
   
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while category",
            error: error.messsage
        })
    }
}


export const deleteCategory = async (req, res) => {
    try {
        res.status(500).json({
            success: true,
            message: "Category deleted successfully",
            
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while category",
            error: error.messsage
        })
    }
}