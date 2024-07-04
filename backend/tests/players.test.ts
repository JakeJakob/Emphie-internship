import request from "supertest";
import { app, server } from "../src/app";
import { clearTestData, createTestData, chess_tournament_store } from "store";
import { ChessPlayer, ChessTournament, EVENTS } from "types";
import { Socket, io } from "socket.io-client";

describe("Test /tournaments/:x/players", () => {
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
	it("Get all players", async () => {
		const res = await request(app)
			.get("/tournaments/9999999999/players")
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(200);
		expect(res.body).toEqual([...tournament.players.values()]);
	});
	it("Create player without body", async () => {
		const res = await request(app)
			.post("/tournaments/9999999999/players")
			.set("Authorization", header);

		expect(res.status).toBe(400);
	});
	it("Create player", async () => {
		socket.on(EVENTS.PLAYER_CREATED, (res) => {
			res = JSON.parse(res) as ChessPlayer;

			expect(res.code).toEqual(created_code);
			expect(res.name).toEqual("TestName");
			expect(res.last_name).toEqual("TestLastName");
			expect(res.rank).toEqual(2137);
			expect(res.title).toEqual("GM");
		});

		const res = await request(app)
			.post("/tournaments/9999999999/players")
			.set("Authorization", header)
			.send({
				name: "TestName",
				last_name: "TestLastName",
				rank: 2137,
				title: "GM",
			});

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(201);
		expect(res.body.code).toEqual(expect.any(String));
		created_code = res.body.code;
		expect(res.body.name).toEqual("TestName");
		expect(res.body.last_name).toEqual("TestLastName");
		expect(res.body.rank).toEqual(2137);
		expect(res.body.title).toEqual("GM");
	});
	it("Get created player", async () => {
		const res = await request(app)
			.get("/tournaments/9999999999/players/" + created_code)
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(200);
		expect(res.body.code).toEqual(created_code);
		expect(res.body.name).toEqual("TestName");
		expect(res.body.last_name).toEqual("TestLastName");
		expect(res.body.rank).toEqual(2137);
		expect(res.body.title).toEqual("GM");
	});
	it("Delete player", async () => {
		socket.on(EVENTS.PLAYER_DELETED, (res) => {
			res = JSON.parse(res) as ChessPlayer;

			expect(res.code).toEqual(created_code);
			expect(res.name).toEqual("TestName");
			expect(res.last_name).toEqual("TestLastName");
			expect(res.rank).toEqual(2137);
			expect(res.title).toEqual("GM");
		});

		const res = await request(app)
			.del("/tournaments/9999999999/players/" + created_code)
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(200);
		expect(res.body.code).toEqual(created_code);
		expect(res.body.name).toEqual("TestName");
		expect(res.body.last_name).toEqual("TestLastName");
		expect(res.body.rank).toEqual(2137);
		expect(res.body.title).toEqual("GM");
	});
	it("Get non existing player", async () => {
		const res = await request(app)
			.get("/tournaments/9999999999/players/" + created_code)
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(404);
		expect(res.body).toEqual({
			msg: "Player does not exist",
		});
	});
});
