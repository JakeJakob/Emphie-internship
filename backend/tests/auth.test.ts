import request from "supertest";
import { app } from "../src/app";

const key = process.env.ACCESS_KEY;
const header = `Bearer ${key}`;

describe("Test authorization", () => {
	it("should return 401 UNAUTHORIZED because of no ACCESS_KEY", async () => {
		await request(app).get("/tournaments").expect(401);
	});
	it("should return 200 OK", async () => {
		await request(app).get("/tournaments").set("Authorization", header).expect(200);
	});
});
