import express from "express"
import createAlbum from "../controller/album.controller.js"
import upload from "../middlewares/multer.middleware.js"
import {authArtist} from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/create-album",authArtist,upload.none(),createAlbum)

export default router