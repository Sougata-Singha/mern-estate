import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/auth.js'

dotenv.config()

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected Successfully")
}).catch((err) => {
    console.log(err)
})
const app = express()
app.use(express.json())

//user routes
app.use('/api/user',userRouter)
//authenticate route
app.use('/api/auth',authRouter)

app.listen(3000, () => {
    console.log("Listening to http://localhost:3000")
})