import request from 'supertest';
import { app } from '../src/main';

const key = process.env.ACCESS_KEY;
const header = `Bearer ${key}`;

describe("POST /tournaments | adding tournament without ACCESS_KEY", () => {
    it("should return 401 UNAUTHORIZED because of no ACCESS_KEY", async () => {
        await request(app)
            .post("/tournaments")
            .send({ name: "Test tournament" })
            .expect('Content-Type', /json/)
            .expect(401)
    });
});

describe("POST /tournaments | adding tournament with ACCESS_KEY", () => {
    it("should return 201 CREATED", async () => {
        await request(app)
            .post("/tournaments")
            .send({ name: "Test tournament" })
            .expect('Content-Type', /json/)
            .set("Authorization", header)
            .expect(201)
    });
});

let tournamentId: string;
describe("POST /tournaments | adding tournament with ACCESS_KEY", () => {
    beforeAll(async () => {
        const res = await request(app)
            .post("/tournaments")
            .send({ name: "Test tournament" })
            .expect('Content-Type', /json/)
            .set("Authorization", header)
            .expect(201);
        
        tournamentId = res.body.code;
    });

    it("should return 201 CREATED when adding a game to the created tournament", async () => {
        await request(app)
            .post(`/tournaments/${tournamentId}/games`)
            .send({ white_code: "9999999998", black_code: "9999999999", round: 3})
            .expect('Content-Type', /json/)
            .set("Authorization", header)
            .expect(201);
    });
});