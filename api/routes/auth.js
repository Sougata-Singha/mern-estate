import express from 'express'
import singup from '../controllers/authController.js'

const router = express.Router()

router.post('/signup',singup)

export default router