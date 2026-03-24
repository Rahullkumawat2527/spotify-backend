import express from "express"
import jwt from "jsonwebtoken"

async function authArtist(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401)
            .json({
                message: "unauthorized user"
            })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== "artist") {
            return res.status(403)
                .json({
                    message: "you don't have access to create music"
                })
        }

        req.user = decoded

        next()

    } catch (error) {
        console.error("error while validating token", error)
        return res.status(401)
            .json({
                message: "unauthorized user"
            })

    }

}

async function authUser(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401)
            .json({
                message: "Unauthorizeds token"
            })
    }
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(401)
                .json({
                    message: "Invalid token"
                })
        }

        if (decoded.role !== "user") {
            return res.status(403)
                .json({
                    message: "you don't have access "
                })
        }

        req.user = decoded
        next()


    } catch (error) {
        console.error(error)
        return res.status(401)
            .json({
                message: "unauthorized user"
            })

    }
}

export  {authArtist,authUser}