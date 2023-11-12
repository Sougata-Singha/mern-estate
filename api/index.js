import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js'
import listingRouter from './routes/listingRoute.js'
import authRouter from './routes/auth.js'
import cookieParser from 'cookie-parser'

dotenv.config()

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected Successfully")
}).catch((err) => {
    console.log(err)
})
const app = express()
app.use(express.json())
app.use(cookieParser())

app.listen(3000, () => {
    console.log("Listening to http://localhost:3000")
})

//user routes
app.use('/api/user',userRouter)
//authenticate route
app.use('/api/auth',authRouter)
//property listing route
app.use('/api/listing',listingRouter)
//Error middleware
app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error!'
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})



