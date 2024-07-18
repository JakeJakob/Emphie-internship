import request from "supertest";
import { app, server } from "../src/app";
import { ChessGame, EVENTS } from "types";
import { Socket, io } from "socket.io-client";
import { newTournamentCode } from "./2tournaments.test";
import { newPlayerCode } from "./3players.test";

describe("Test /tournaments/:x/games", () => {
	const key = process.env.ACCESS_KEY;
	const header = `Bearer ${key}`;
	let socket: Socket;
	let newGameCode: string | undefined;

	beforeAll(() => {
		server.listen(3000);
		socket = io("http://localhost:3000", {
			auth: (cb) => {
				cb({ token: key });
			},
		});
	});

	afterAll(() => {
		server.close();
		socket.disconnect();
	});

	it("Create game without body", async () => {
		const res = await request(app)
			.post("/tournaments/" + newTournamentCode + "/games")
			.set("Authorization", header);

		expect(res.status).toBe(400);
	});
	it("Create game", async () => {
		socket.on(EVENTS.GAME_CREATED, (res) => {
			res = JSON.parse(res) as ChessGame;

			expect(res.white_code).toEqual(newPlayerCode);
			expect(res.black_code).toEqual(newPlayerCode);
			expect(res.round).toEqual(13);
		});

		const res = await request(app)
			.post("/tournaments/" + newTournamentCode + "/games")
			.set("Authorization", header)
			.send({
				white_code: newPlayerCode,
				black_code: newPlayerCode,
				round: 13,
			});

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(201);
		newGameCode = res.body.code;
		expect(res.body.white_code).toEqual(newPlayerCode);
		expect(res.body.black_code).toEqual(newPlayerCode);
		expect(res.body.round).toEqual(13);
	});
	it("Get created game", async () => {
		const res = await request(app)
			.get("/tournaments/" + newTournamentCode + "/games/" + newGameCode)
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(200);
		expect(res.body.white_code).toEqual(newPlayerCode);
		expect(res.body.black_code).toEqual(newPlayerCode);
		expect(res.body.round).toEqual(13);
	});
	it("Get all games", async () => {
		const res = await request(app)
			.get("/tournaments/" + newTournamentCode + "/games")
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(200);
		expect(res.body[0].white_code).toEqual(newPlayerCode);
		expect(res.body[0].black_code).toEqual(newPlayerCode);
		expect(res.body[0].round).toEqual(13);
	});
	it("Delete game", async () => {
		socket.on(EVENTS.GAME_DELETED, (res) => {
			res = JSON.parse(res) as ChessGame;

			expect(res.white_code).toEqual(newPlayerCode);
			expect(res.black_code).toEqual(newPlayerCode);
			expect(res.round).toEqual(13);
		});

		const res = await request(app)
			.del("/tournaments/" + newTournamentCode + "/games/" + newGameCode)
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(200);
		expect(res.body.white_code).toEqual(newPlayerCode);
		expect(res.body.black_code).toEqual(newPlayerCode);
		expect(res.body.round).toEqual(13);
	});
	it("Get non existing game", async () => {
		const res = await request(app)
			.get("/tournaments/" + newTournamentCode + "/games/AAA")
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(404);
		expect(res.body).toEqual({
			msg: "Game does not exist",
		});
	});
});
