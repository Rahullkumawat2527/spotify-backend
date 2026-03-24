import mongoose from "mongoose"

export default async function connectDB(req,res) {

    if(!process.env.MONGO_URI){
        console.log("MONGO URI is missing in env file")
        return res.status(500).json({
            message : "please check MONGO_URI in the env file"
        })
    }

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB is successfully connection")

    } catch (error) {
        console.log("Error while connecting to database")
        process.exit(1)
    }

}