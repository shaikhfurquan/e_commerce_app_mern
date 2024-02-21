import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "Please enter product name"]
    },
    slug : {
        type : String,
        required : [true , "Please enter slug"]
    },
    description : {
        type : String,
        required : [true , "Please enter product description"]
    },
    price : {
        type : String,
        required : [true , "Please enter product price"]
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required : true,
    },
    photo : {
        type : Buffer,
        contentType : String,
    },
    shipping:{
        type :  Boolean,
    }
}, {timestamps : true})


const ProductModel = mongoose.model('Product' , productSchema);

export default ProductModel