import express from "express"
import { loginUser, registerUser, logoutUser } from "../controller/auth.controller.js"
import upload from "../middlewares/multer.middleware.js"
import loginLimiter from "../middlewares/login_rate_limit.middleware.js"
import { registerUserValidationRules } from "../middlewares/validator.middleware.js"

const router = express.Router()


router.post("/register", upload.none(), registerUserValidationRules, registerUser)

router.post("/login", loginLimiter, upload.none(), loginUser)

router.post("/logout", upload.none(), logoutUser)

export default router