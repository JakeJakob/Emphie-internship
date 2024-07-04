import request from "supertest";
import { app, server } from "../src/app";
import { clearTestData, createTestData, chess_tournament_store } from "store";
import { ChessGame, ChessTournament, EVENTS } from "types";
import { Socket, io } from "socket.io-client";

describe("Test /tournaments/:x/games", () => {
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

	it("Get all games", async () => {
		const res = await request(app)
			.get("/tournaments/9999999999/games")
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(200);
		expect(res.body).toEqual([...tournament.games.values()]);
	});
	it("Create game without body", async () => {
		const res = await request(app)
			.post("/tournaments/9999999999/games")
			.set("Authorization", header);

		expect(res.status).toBe(400);
	});
	it("Create game", async () => {
		socket.on(EVENTS.GAME_CREATED, (res) => {
			res = JSON.parse(res) as ChessGame;

			expect(res.code).toEqual(created_code);
			expect(res.white_code).toEqual("9999999998");
			expect(res.black_code).toEqual("9999999999");
			expect(res.round).toEqual(13);
		});

		const res = await request(app)
			.post("/tournaments/9999999999/games")
			.set("Authorization", header)
			.send({
				white_code: "9999999998",
				black_code: "9999999999",
				round: 13,
			});

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(201);
		expect(res.body.code).toEqual(expect.any(String));
		created_code = res.body.code;
		expect(res.body.white_code).toEqual("9999999998");
		expect(res.body.black_code).toEqual("9999999999");
		expect(res.body.round).toEqual(13);
	});
	it("Get created game", async () => {
		const res = await request(app)
			.get("/tournaments/9999999999/games/" + created_code)
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(200);
		expect(res.body.code).toEqual(created_code);
		expect(res.body.white_code).toEqual("9999999998");
		expect(res.body.black_code).toEqual("9999999999");
		expect(res.body.round).toEqual(13);
	});
	it("Delete game", async () => {
		socket.on(EVENTS.GAME_DELETED, (res) => {
			res = JSON.parse(res) as ChessGame;

			expect(res.code).toEqual(created_code);
			expect(res.white_code).toEqual("9999999998");
			expect(res.black_code).toEqual("9999999999");
			expect(res.round).toEqual(13);
		});

		const res = await request(app)
			.del("/tournaments/9999999999/games/" + created_code)
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(200);
		expect(res.body.code).toEqual(created_code);
		expect(res.body.white_code).toEqual("9999999998");
		expect(res.body.black_code).toEqual("9999999999");
		expect(res.body.round).toEqual(13);
	});
	it("Get non existing game", async () => {
		const res = await request(app)
			.get("/tournaments/9999999999/games/" + created_code)
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(404);
		expect(res.body).toEqual({
			msg: "Game does not exist",
		});
	});
});
