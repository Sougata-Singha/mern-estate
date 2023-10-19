import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js'

dotenv.config()

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected Successfully")
}).catch((err) => {
    console.log(err)
})
const app = express()

//user routes
app.use('/api/user',userRouter)

app.listen(3000, () => {
    console.log("Listening to http://localhost:3000")
})