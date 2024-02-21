import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "Please provide category name"],
        unique : true
    },
    slug : {
        type : String,
        lowercase : true
    }
},{timestamps: true}) 


const CategoryModel = mongoose.model('Category' , categorySchema)


export default CategoryModel