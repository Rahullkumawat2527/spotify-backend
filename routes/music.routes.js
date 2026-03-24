import express from "express"
import createMusic from "../controller/music.controller.js"
import upload from "../middlewares/multer.middleware.js"
import {authArtist,authUser} from "../middlewares/auth.middleware.js"
import { fetchMusic,fetchAlbums,fetchAlbum } from "../controller/music.controller.js"

const router = express.Router()

router.post("/upload", authArtist, upload.single("music"), createMusic)

router.get("/",authUser, fetchMusic)
router.get("/albums",authUser,fetchAlbums)

router.get("/albums/:albumId",authUser,fetchAlbum)




export default router