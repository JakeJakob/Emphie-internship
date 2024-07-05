import request from "supertest";
import { app, server } from "../src/app";
import { clearTestData, createTestData, chess_tournament_store } from "store";
import { Socket, io } from "socket.io-client";
import { ChessTournament, EVENTS } from "types";

describe("Test /tournaments", () => {
	const key = process.env.ACCESS_KEY;
	const header = `Bearer ${key}`;
	let created_code: string | undefined;
	let socket: Socket;

	beforeAll(() => {
		server.listen(3000);
		clearTestData();
		createTestData();

		socket = io("http://localhost:3000", {
			auth: (cb) => {
				cb({
					token: key,
				});
			},
		});
	});
	afterAll(() => {
		server.close();
		socket.disconnect();
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
		socket.on(EVENTS.TOURNAMENT_CREATED, (res) => {
			res = JSON.parse(res) as ChessTournament;

			expect(res.code).toEqual(created_code);
			expect(res.name).toEqual("Test tournament");
		});

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
			.get("/tournaments/" + created_code)
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(200);
		expect(res.body.code).toEqual(created_code);
		expect(res.body.name).toEqual("Test tournament");
	});
	it("Delete tournament", async () => {
		socket.on(EVENTS.TOURNAMENT_DELETED, (res) => {
			res = JSON.parse(res) as ChessTournament;

			expect(res.code).toEqual(created_code);
			expect(res.name).toEqual("Test tournament");
		});

		const res = await request(app)
			.del("/tournaments/" + created_code)
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(200);
		expect(res.body.code).toEqual(created_code);
		expect(res.body.name).toEqual("Test tournament");
	});
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
