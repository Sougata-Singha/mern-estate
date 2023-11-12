import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"

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

const signin = async (req,res,next) => {
    const {email, password} = req.body
    try{
        const validUser = await User.findOne({email})
        if(!validUser) return next(errorHandler(404,'User not found!'))
        const validPassword = bcrypt.compareSync(password,validUser.password)
        if(!validPassword) return next(errorHandler(401,'Wrong Password'))
        const token = jwt.sign({id : validUser._id},process.env.JWT_SECRET)
        const {password : pass,...rest} = validUser._doc
        res.cookie('access_token',token,{httpOnly : true}).status(200).json(rest)

    }catch(error){
        next(error)
    }
}

const google = async (req,res,next) => {
    try {
        const user = await User.findOne({email : req.body.email})
        if(user) {
            const token = jwt.sign({id : user._id}, process.env.JWT_SECRET)
            const {password : pass, ...rest} = user._doc
            res.cookie('access_token',token,{httpOnly : true}).status(200).json(rest)
        }else {
            const generatedPass = Math.random().toString(36).slice(-8)
            const hashedPassword = bcrypt.hashSync(generatedPass,10)
            const username = req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4)
            const newUser = new User({username : username, email : req.body.email, password : hashedPassword, avatar : req.body.photo})
            await newUser.save()

            const token = jwt.sign({id : newUser._id}, process.env.JWT_SECRET)
            const {password : pass, ...rest} = newUser._doc
            res.cookie('access_token',token,{httpOnly : true}).status(200).json(rest)
        }
    } catch (error) {
        next(error)
    }
}

const signout = async (req,res,next) => {
    try {
        res.clearCookie('access_token')
        res.status(200).json('User logged out!')
    } catch (error) {
        next(error)
    }
}

export  {singup,signin,google,signout}