import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import { errorHandler } from "../utils/error.js"

const singup = async (req,res,next) => {
    const {username, email, password} = req.body
    
    try {
        const hashedPassword = bcrypt.hashSync(password,10)
        const newUser = new User({username, email, password : hashedPassword})
        await newUser.save()
        res.status(201).json('User created successfully!')
    } catch (err) {
        next(err)
    }
}
export default singup