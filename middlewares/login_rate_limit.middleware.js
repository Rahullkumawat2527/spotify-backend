import rateLimit from "express-rate-limit";
import mongoose from "mongoose"

mongoose.set('debug', true);

// Or with custom logging
mongoose.set('debug', (collectionName, method, query, doc) => {
    console.log(`MongoDB Query: ${collectionName}.${method}()`,
        JSON.stringify(query),
        doc ? JSON.stringify(doc) : '');
});

const loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: "too many login attempts",
    skipSuccessfulRequests: true
})

export default loginLimiter