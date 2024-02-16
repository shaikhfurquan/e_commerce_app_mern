import express from 'express';
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './db/connectDB.js';
import userRouter from './routes/userRoute.js';
import cors from 'cors'


dotenv.config()

const app = express()

//express middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

 
//routes
app.use('/api/user' , userRouter)

//db connection
connectDB() 

app.listen(process.env.PORT , ()=>{
    console.log(`Server started at ${process.env.PORT}`);
})