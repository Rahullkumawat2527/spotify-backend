import musicModel from "../models/music.models.js"
import userModel from "../models/user.models.js"
import albumModel from "../models/album.models.js"
import jwt from "jsonwebtoken"
import uploadMusicAtImageKit from "../services/imageKit.service.js"


async function createMusic(req, res) {

    const { title } = req.body
    const file = req.file

    if (!title) {
        return res.status(400).json({
            message: "Title is required"
        })
    }


    if (!req.file) {
        return res.status(400).json({
            message: "Music file is required"
        })
    }


    const result = await uploadMusicAtImageKit(file.buffer.toString("base64"))

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id
    })


    return res.status(201)
        .json({
            message: "music created successfully",
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist

            }
        })
}

async function fetchMusic(req, res) {

    const musics = await musicModel
        .find()
        .skip(2)
        .limit(2)
        .populate("artist", "username email")

    return res.status(200)
        .json({
            message: "music fetched successfully",
            musics
        })
}

async function fetchAlbums(req, res) {

    const albums = await albumModel.find().select("title artist").populate("artist", "username email")

    // Check if albums exist
    if (!albums || albums.length === 0) {
        return res.status(200).json({
            message: "No albums found",
            albums: []
        })
    }


    return res.status(200)
        .json({
            message: "artists fetched successfully",
            albums: albums
        })

}

async function fetchAlbum(req, res) {

    const albumId = req.params.albumId

    const album = await albumModel.findById(id).populate("artist", "email username").populate("musics")



    return res.status(200)
        .json({
            message: "data fetched successfully",
            album
        })
}
export default createMusic

export { fetchMusic, fetchAlbums, fetchAlbum }
