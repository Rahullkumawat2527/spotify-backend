import userModel from "../models/user.models.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


function checkEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return emailRegex.test(email)
}

async function registerUser(req, res) {

    const { username, email, password, role } = req.body

    if (!username) {
        return res.status(400)
            .json({
                message: "username is required"
            })
    } else if (!email) {
        res.status(400)
            .json({
                message: "email is required"
            })
    } else if (!password) {
        return res.status(400)
            .json({
                message: "password is required"
            })
    } else if (!role) {
        return res.status(400)
            .json({
                message: "role is required"
            })
    }


    const checkvalidEmailFormat = checkEmail(email)

    if (!checkvalidEmailFormat) {
        return res.status(400)
            .json({
                message: "Invalid Email Format"
            })
    }


    // checking,user already registered or not
    const isUserAlreadyExist = await userModel.findOne({
        $or: [{ email }, { username }]
    })

    console.log(isUserAlreadyExist)
    if (isUserAlreadyExist) {
        if (isUserAlreadyExist.email === email) {
            return res.status(409)
                .json({
                    message: "email is already registed"
                })
        }

        if (isUserAlreadyExist.username === username) {
            return res.status(409)
                .json({
                    message: "username is already exist"
                })
        }
    }


    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await userModel.create({
        username,
        email,
        password: hashedPassword,
        role
    })

    if (!newUser) {
        return res.status(500)
            .json({
                message: "Error while creating a new user"
            })
    }

    const token = jwt.sign(
        {
            id: newUser._id,
            role: newUser.role,
        },
        process.env.JWT_SECRET,
        // {
        //     expiresIn: "7d",
        //     issuer: "rahul-spotify-backend",
        //     audience: '${username}'
        // }
    )

    // const options = {
    //     httpOnly: true,
    //     secure: false,
    //     maxAge: 24 * 60 * 60 * 1000,
    //     path: "/"
    // }

    res.cookie("token", token)



    return res.status(201)
        .json({
            message: " user is created successfully",
            newUser,
            token
        })


}

async function loginUser(req, res) {

    const { email, username, password } = req.body

    if (!email && !username) {
        return res.status(400)
            .json({
                message: "email or username is required"
            })
    }
    if (!password) {
        return res.json(400)
            .json({
                message: "password is required"
            })
    }

    const user = await userModel.findOne({
        $or: [{ email }, { username }]
    })

    if (!user) {
        return res.status(400)
            .json({
                message: "Invalid credentials"
            })
    }

    // checking whether password given by user at the time of login is equal or not to the password provided by user at the time of registration 

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400)
            .json({
                message: "password is not valid"
            })
    }


    const token = jwt.sign({
        id: user._id,
        role: user.role
    }
        , process.env.JWT_SECRET)

    if (!token) {
        return res.status(500)
            .json({
                message: "Error while generating token"
            })
    }

    res.cookie("token", token)

    console.log(token)


    return res.status(201)
        .json({
            message: "user loged in successfully",
            user
        })


}


async function logoutUser(req, res) {
    const { email, password } = req.body

    if (!email) {
        return res.status(400)
            .json({
                message: "username is required"
            })
    }
    if (!password) {
        return res.status(400)
            .json({
                message: "password is required to logout the user"
            })
    }

    const user = await userModel.findOneAndDelete({ email: email })


    res.clearCookie("token")

    return res.status(200)
        .json({
            message: "user is logout successfully"
        })

}


export { registerUser, loginUser, logoutUser }