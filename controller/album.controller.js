import userModel from "../models/user.models.js";
import musicModel from "../models/music.models.js";
import albumModel from "../models/album.models.js";
import jwt from "jsonwebtoken"


async function createAlbum(req, res) {

    const { title, musics } = req.body

    if (!title) {
        return res.status(400)
            .json({
                message: "title is required"
            }
            )
    }

    if (!musics) {
        return res.status(400)
            .json({
                message: "music is required"
            })
    }

    const album = await albumModel.create({
        title,
        artist: req.user.id,
        musics: musics
    })



    return res.status(201)
        .json({
            message: "Album created successfully",
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics

            }
        })

}

export default createAlbum