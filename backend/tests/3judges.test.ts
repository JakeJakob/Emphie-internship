import request from "supertest";
import { app, server } from "../src/app";
import { ChessJudge, EVENTS } from "types";
import { Socket, io } from "socket.io-client";
import { newTournamentCode } from "./2tournaments.test";

describe("Test /tournaments/:x/judges", () => {
	const key = process.env.ACCESS_KEY;
	const header = `Bearer ${key}`;
	let socket: Socket;
	let newJudgeCode: string | undefined;

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

	it("Create judge without body", async () => {
		const res = await request(app)
			.post("/tournaments/" + newTournamentCode + "/judges")
			.set("Authorization", header);

		expect(res.status).toBe(400);
	});
	it("Create judge", async () => {
		socket.on(EVENTS.JUDGE_CREATED, (res) => {
			res = JSON.parse(res) as ChessJudge;

			expect(res.name).toEqual("Test judge");
		});

		const res = await request(app)
			.post("/tournaments/" + newTournamentCode + "/judges")
			.set("Authorization", header)
			.send({ name: "Test judge" });

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(201);
		expect(res.body.code).toEqual(expect.any(String));
		newJudgeCode = res.body.code;
		expect(res.body.name).toEqual("Test judge");
	});
	it("Get created judge", async () => {
		const res = await request(app)
			.get(
				"/tournaments/" + newTournamentCode + "/judges/" + newJudgeCode
			)
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(200);
		expect(res.body.name).toEqual("Test judge");
	});
	it("Get all judges", async () => {
		const res = await request(app)
			.get("/tournaments/" + newTournamentCode + "/judges")
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(200);
		expect(res.body[0].name).toEqual("Test judge");
	});
	it("Delete judge", async () => {
		socket.on(EVENTS.JUDGE_DELETED, (res) => {
			res = JSON.parse(res) as ChessJudge;

			expect(res.name).toEqual("Test judge");
		});

		const res = await request(app)
			.del(
				"/tournaments/" + newTournamentCode + "/judges/" + newJudgeCode
			)
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(200);
		expect(res.body.name).toEqual("Test judge");
	});
	it("Get non existing judge", async () => {
		const res = await request(app)
			.get("/tournaments/" + newTournamentCode + "/judges/AAA")
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(404);
		expect(res.body).toEqual({
			msg: "Judge does not exist",
		});
	});
});
