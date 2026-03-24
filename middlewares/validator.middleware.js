import { body, validationResult } from "express-validator";



async function validateResult(req, res, next) {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400)
            .json({
                errors: errors.array()
            })
    }

    next()
}

const registerUserValidationRules = [

    body("username").isString()
        .withMessage("username must be string")
        .isLength({ min: 3, max: 20 })
        .withMessage("username must be between 3 and 20 characters"),

    body("email")
        .isEmail()
        .withMessage("Invalid email address"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("password must be greater than 6 characters"),

    validateResult



]


export { registerUserValidationRules } 