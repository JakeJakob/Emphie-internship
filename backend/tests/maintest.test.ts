import request from 'supertest';
import { app } from '../src/main';

const key = process.env.ACCESS_KEY;

describe("POST /tournaments | adding tournament without ACCESS_KEY", () => {
    it("should return 401 because of no ACCESS_KEY", async () => {
        await request(app)
            .post("/tournaments")
            .send({ name: "Test tournament" })
            .expect('Content-Type', /json/)
            .expect(401)
    });
});