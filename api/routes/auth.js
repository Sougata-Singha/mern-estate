import express from 'express'
import {google, signin, singup,signout} from '../controllers/authController.js'

const router = express.Router()

router.post('/signup',singup)
router.post('/signin',signin)
router.post('/google',google)
router.get('/signout',signout)

export default router