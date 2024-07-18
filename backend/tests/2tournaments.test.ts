import request from "supertest";
import { app, server } from "../src/app";
import { Socket, io } from "socket.io-client";
import { ChessTournament, EVENTS } from "types";

export let newTournamentCode: string | undefined;

describe("Test /tournaments", () => {
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
	it("Create tournament without body", async () => {
		const res = await request(app)
			.post("/tournaments")
			.set("Authorization", header);

		expect(res.status).toBe(400);
	});
	it("Create tournament", async () => {
		socket.on(EVENTS.TOURNAMENT_CREATED, (res) => {
			const tournament = JSON.parse(res) as ChessTournament;
			expect(tournament.name).toEqual("Test tournament");
		});

		const res = await request(app)
			.post("/tournaments")
			.set("Authorization", header)
			.send({ name: "Test tournament" });

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(201);
		newTournamentCode = res.body.code;
		expect(res.body.name).toEqual("Test tournament");
	});
	it("Get created tournament", async () => {
		const res = await request(app)
			.get(`/tournaments/${newTournamentCode}`)
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(200);
		expect(res.body.name).toEqual("Test tournament");
	});
	it("Get all tournaments", async () => {
		const res = await request(app)
			.get("/tournaments")
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(200);
		expect(res.body[0].code).toEqual(newTournamentCode);
		expect(res.body[0].name).toEqual("Test tournament");
	});
	it("Delete tournament", async () => {
		socket.on(EVENTS.TOURNAMENT_DELETED, (res) => {
			const tournament = JSON.parse(res) as ChessTournament;
			expect(tournament.name).toEqual("Test tournament");
		});

		const res = await request(app)
			.delete(`/tournaments/${newTournamentCode}`)
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(200);
		expect(res.body.name).toEqual("Test tournament");
	});
	it("Get non-existing tournament", async () => {
		const res = await request(app)
			.get(`/tournaments/${newTournamentCode}`)
			.set("Authorization", header);

		expect(res.type).toEqual("application/json");
		expect(res.status).toBe(404);
		expect(res.body).toEqual({ msg: "Tournament does not exist" });
	});
	it("Create another tournament", async () => {
		const res = await request(app)
			.post("/tournaments")
			.set("Authorization", header)
			.send({ name: "Test tournament" });

		expect(res.status).toBe(201);
		newTournamentCode = res.body.code;
	});
});
