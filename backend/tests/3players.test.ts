import request from "supertest";
import { app, server } from "../src/app";
import { ChessPlayer, EVENTS } from "types";
import { Socket, io } from "socket.io-client";
import { newTournamentCode } from "./2tournaments.test";

export let newPlayerCode: string | undefined;

describe("Test /tournaments/:x/players", () => {
	const key = process.env.ACCESS_KEY;
	const header = `Bearer ${key}`;
	let socket: Socket;

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

	it("Create player without body", async () => {
		const res = await request(app)
			.post("/tournaments/" + newTournamentCode + "/players")
			.set("Authorization", header);

		expect(res.status).toBe(400);
	});
	it("Create player", async () => {
		socket.on(EVENTS.PLAYER_CREATED, (res) => {
			res = JSON.parse(res) as ChessPlayer;

			expect(res.code).toEqual(newPlayerCode);
			expect(res.name).toEqual("TestName");
			expect(res.last_name).toEqual("TestLastName");
			expect(res.rank).toEqual(2137);
			expect(res.title).toEqual("GM");
		});

		const res = await request(app)
			.post("/tournaments/" + newTournamentCode + "/players")
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
		newPlayerCode = res.body.code;
		expect(res.body.name).toEqual("TestName");
		expect(res.body.last_name).toEqual("TestLastName");
		expect(res.body.rank).toEqual(2137);
		expect(res.body.title).toEqual("GM");
	});
	it("Get created player", async () => {
		const res = await request(app)
			.get(
				"/tournaments/" +
					newTournamentCode +
					"/players/" +
					newPlayerCode
			)
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(200);
		expect(res.body.code).toEqual(newPlayerCode);
		expect(res.body.name).toEqual("TestName");
		expect(res.body.last_name).toEqual("TestLastName");
		expect(res.body.rank).toEqual(2137);
		expect(res.body.title).toEqual("GM");
	});
	it("Get all players", async () => {
		const res = await request(app)
			.get("/tournaments/" + newTournamentCode + "/players")
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(200);
		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(200);
		expect(res.body[0].code).toEqual(newPlayerCode);
		expect(res.body[0].name).toEqual("TestName");
		expect(res.body[0].last_name).toEqual("TestLastName");
		expect(res.body[0].rank).toEqual(2137);
		expect(res.body[0].title).toEqual("GM");
	});
	it("Delete player", async () => {
		socket.on(EVENTS.PLAYER_DELETED, (res) => {
			res = JSON.parse(res) as ChessPlayer;

			expect(res.code).toEqual(newPlayerCode);
			expect(res.name).toEqual("TestName");
			expect(res.last_name).toEqual("TestLastName");
			expect(res.rank).toEqual(2137);
			expect(res.title).toEqual("GM");
		});

		const res = await request(app)
			.del(
				"/tournaments/" +
					newTournamentCode +
					"/players/" +
					newPlayerCode
			)
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(200);
		expect(res.body.code).toEqual(newPlayerCode);
		expect(res.body.name).toEqual("TestName");
		expect(res.body.last_name).toEqual("TestLastName");
		expect(res.body.rank).toEqual(2137);
		expect(res.body.title).toEqual("GM");
	});
	it("Get non existing player", async () => {
		const res = await request(app)
			.get("/tournaments/" + newTournamentCode + "/players/AAA")
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(404);
		expect(res.body).toEqual({
			msg: "Player does not exist",
		});
	});
});
