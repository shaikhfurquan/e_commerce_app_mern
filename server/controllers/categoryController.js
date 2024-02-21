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
            error: error.message
        })
    }
}


export const getAllCategory = async (req, res) => {
    try {
        const getAll = await CategoryModel.find()
        if (!getAll) {
            return res.status(404).json({
                success: true,
                message: "Category not found"

            })
        }
        res.status(200).json({
            success: true,
            message: "Category lists",
            categoryCount: getAll.length,
            AllCategory: getAll,

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while getting all categories",
            error: error.message
        })
    }
}


export const getSingleCategory = async (req, res) => {
    try {
        
        const singleCategory = await CategoryModel.find({slug: req.params.slug})
        if (!singleCategory) {
            return res.status(404).json({
                success: true,
                message: "Category not found"

            })
        }
        res.status(200).json({
            success: true,
            message: "Category list",
            singleCategory: singleCategory

        })
    } catch (error) {
         res.status(500).json({
            success: false,
            message: "Error getting single category",
            error: error.message
        })
    }
}


export const updateCategory = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params
        const updateCategory = await CategoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })


        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            updateCategory: updateCategory

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while updating category",
            error: error.message
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
            error: error.message
        })
    }
}