import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : [true , "Please provide name"],
        trim : true,
    },
    email :{
        type : String,
        required : [true , "Please provide email"],
        trim : true,
        unique : true
    },
    password :{
        type : String,
        trim : true,
        required : [true , "Please provide password"]
    },
    phone :{
        type : String,
        trim : true,
        required : [true , "Please provide phone number"]
    },
    address :{
        type : String,
        required : [true , "Please provide address"],
    },
    question :{
        type : String,
        required : [true , "Please provide answer"],
    },
    role :{
        type : String,
        enum : ['user' , 'admin'],
        default : 'user'
    }
} , {timestamps : true})


const UserModel = mongoose.model('User', userSchema)


export default UserModel