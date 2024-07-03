import request from "supertest";
import { app } from "../src/app";
import { clearTestData, createTestData, chess_tournament_store } from "store";

const key = process.env.ACCESS_KEY;

const header = `Bearer ${key}`;
let created_code: string | undefined;

describe("Test /tournaments", () => {
	beforeAll(() => {
		clearTestData();
		createTestData();
	});
	it("Get all tournaments", async () => {
		const res = await request(app)
			.get("/tournaments")
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(200);
		expect(res.body).toEqual(
			[...chess_tournament_store.values()].map((e) => e.flatten())
		);
	});
	it("Create tournament without body", async () => {
		const res = await request(app)
			.post("/tournaments")
			.set("Authorization", header);

		expect(res.status).toBe(400);
	});
	it("Create tournament", async () => {
		const res = await request(app)
			.post("/tournaments")
			.set("Authorization", header)
			.send({ name: "Test tournament" });

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(201);
		expect(res.body.code).toEqual(expect.any(String));
		created_code = res.body.code;
		expect(res.body.name).toEqual("Test tournament");
	});
	it("Get created tournament", async () => {
		const res = await request(app)
			.del("/tournaments/" + created_code)
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(200);
		expect(res.body.code).toEqual(created_code);
		expect(res.body.name).toEqual("Test tournament");
	});
	it("Delete tournament", async () => {});
	it("Get non existing tournament", async () => {
		const res = await request(app)
			.get("/tournaments/" + created_code)
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(404);
		expect(res.body).toEqual({
			msg: "Tournament does not exist",
		});
	});
});
