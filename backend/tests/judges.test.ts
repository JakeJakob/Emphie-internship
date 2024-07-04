import request from "supertest";
import { app, server } from "../src/app";
import { clearTestData, createTestData, chess_tournament_store } from "store";
import { ChessJudge, ChessTournament, EVENTS } from "types";
import { Socket, io } from "socket.io-client";

describe("Test /tournaments/:x/judges", () => {
	const key = process.env.ACCESS_KEY;
	const header = `Bearer ${key}`;
	const tournament: ChessTournament =
		chess_tournament_store.get("9999999999") || new ChessTournament("");
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

	it("Get all judges", async () => {
		const res = await request(app)
			.get("/tournaments/9999999999/judges")
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(200);
		expect(res.body).toEqual([...tournament.judges.values()]);
	});
	it("Create judge without body", async () => {
		const res = await request(app)
			.post("/tournaments/9999999999/judges")
			.set("Authorization", header);

		expect(res.status).toBe(400);
	});
	it("Create judge", async () => {
		socket.on(EVENTS.JUDGE_CREATED, (res) => {
			res = JSON.parse(res) as ChessJudge;

			expect(res.code).toEqual(created_code);
			expect(res.name).toEqual("Test judge");
		});

		const res = await request(app)
			.post("/tournaments/9999999999/judges")
			.set("Authorization", header)
			.send({ name: "Test judge" });

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(201);
		expect(res.body.code).toEqual(expect.any(String));
		created_code = res.body.code;
		expect(res.body.name).toEqual("Test judge");
	});
	it("Get created judge", async () => {
		const res = await request(app)
			.get("/tournaments/9999999999/judges/" + created_code)
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(200);
		expect(res.body.code).toEqual(created_code);
		expect(res.body.name).toEqual("Test judge");
	});
	it("Delete judge", async () => {
		socket.on(EVENTS.JUDGE_DELETED, (res) => {
			res = JSON.parse(res) as ChessJudge;

			expect(res.code).toEqual(created_code);
			expect(res.name).toEqual("Test judge");
		});

		const res = await request(app)
			.del("/tournaments/9999999999/judges/" + created_code)
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(200);
		expect(res.body.code).toEqual(created_code);
		expect(res.body.name).toEqual("Test judge");
	});
	it("Get non existing judge", async () => {
		const res = await request(app)
			.get("/tournaments/9999999999/judges/" + created_code)
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(404);
		expect(res.body).toEqual({
			msg: "Judge does not exist",
		});
	});
});
