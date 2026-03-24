import dotenv from "dotenv"
const result = dotenv.config()
import app from "./src/app.js"
import connectDB from "./db/db.js"


if (result.error) {
    console.error('Error loading .env file:', result.error);
    process.exit(1);
}

// Validate required environment variables
const requiredEnvVariables = ["PORT", "MONGO_URI", "JWT_SECRET"]

const missingEnvVariables = requiredEnvVariables.filter(envVar => !process.env[envVar])

if (missingEnvVariables.length > 0) {
    console.error('Missing required environment variables:', missingEnvVariables.join(', '));
    process.exit(1)

}

console.log("environment vairables loaded successfully")

connectDB()

app.listen(process.env.PORT, () => {
    console.log("server is running on port 8000")
})