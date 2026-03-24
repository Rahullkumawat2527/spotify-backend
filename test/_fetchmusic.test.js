import request from 'supertest';
import app from "../src/app.js";



describe("GET /api/music/", () => {
    it("should return 200 ok", async () => {
        const res = await request(app).get("/api/music/")

        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual("music fetched successfully")
    })
})