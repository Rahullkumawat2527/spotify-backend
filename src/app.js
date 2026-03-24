import express from "express"
import authRouter from "../routes/auth.routes.js"
import musicRouter from "../routes/music.routes.js"
import albumRouter from "../routes/album.routes.js"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(cookieParser())





app.use("/api/auth", authRouter)
app.use("/api/music", musicRouter)
app.use("/api/album",albumRouter)

export default app


