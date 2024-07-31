import { FastifyInstance } from "fastify";
import createServer from "../src/server";
import { ChessTitle } from "../src/modules/player/schema";
import { Player } from "../src/modules/player/entity";
import { Tournament } from "../src/modules/tournament/entity";

describe("Player Routes", () => {
	let server: FastifyInstance;

	const notFoundResponse = { msg: "Player not found" };
	let tournament: Tournament;
	let mockPlayer: Partial<Player> = {
		first_name: "John",
		last_name: "Doe",
		rank: 2400,
		title: ChessTitle.GM,
	};

	beforeAll(async () => {
		server = await createServer();

		await server.db.player.clear();
		await server.db.tournament.clear();

		tournament = await server.db.tournament.save({
			name: "New Tournament",
			code: "aaaa",
		});

		mockPlayer.tournament_id = tournament.id;
	});

	afterEach(async () => {
		await server.db.player.clear();
	});

	afterAll(async () => {
		await server.close();
	});

	describe("POST /tournaments/:tournament_id/players", () => {
		it("should create a new player and return 201", async () => {
			const response = await server.inject({
				method: "POST",
				url: `/tournaments/${tournament.id}/players`,
				payload: mockPlayer,
				headers: {
					authorization: `Bearer ${server.config.DEFAULT_ADMIN_KEY}`,
				},
			});

			expect(response.statusCode).toBe(201);
			expect(response.json()).toMatchObject(mockPlayer);
		});
	});

	describe("GET /tournaments/:tournament_id/players", () => {
		it("should return an array of players", async () => {
			const created = await server.db.player.save(mockPlayer);

			const response = await server.inject({
				method: "GET",
				url: `/tournaments/${tournament.id}/players`,
			});

			expect(response.statusCode).toBe(200);
			expect(response.json()).toEqual([created]);
		});
	});

	describe("GET /tournaments/:tournament_id/players/:player_id", () => {
		it("should return 404 if the player is not found", async () => {
			const response = await server.inject({
				method: "GET",
				url: `/tournaments/${tournament.id}/players/1`,
			});

			expect(response.statusCode).toBe(404);
			expect(response.json()).toEqual(notFoundResponse);
		});

		it("should return 200 with the player data if the player is found", async () => {
			const created = await server.db.player.save(mockPlayer);

			const response = await server.inject({
				method: "GET",
				url: `/tournaments/${tournament.id}/players/${created.id}`,
			});

			expect(response.statusCode).toBe(200);
			expect(response.json()).toMatchObject(created);
		});
	});

	describe("PUT /tournaments/:tournament_id/players/:player_id", () => {
		it("should update an existing player and return 200", async () => {
			const created = await server.db.player.save(mockPlayer);

			const updatedData = {
				first_name: "John",
				last_name: "Doe",
				rank: 2600,
				title: ChessTitle.FM,
			};

			const response = await server.inject({
				method: "PUT",
				url: `/tournaments/${tournament.id}/players/${created.id}`,
				payload: updatedData,
				headers: {
					authorization: `Bearer ${server.config.DEFAULT_ADMIN_KEY}`,
				},
			});

			expect(response.statusCode).toBe(200);
			expect(response.json()).toMatchObject({
				...created,
				...updatedData,
			});
		});

		it("should return 404 if the player to update does not exist", async () => {
			const response = await server.inject({
				method: "PUT",
				url: `/tournaments/${tournament.id}/players/1`, // Use an invalid player ID
				payload: mockPlayer,
				headers: {
					authorization: `Bearer ${server.config.DEFAULT_ADMIN_KEY}`,
				},
			});

			expect(response.statusCode).toBe(404);
			expect(response.json()).toEqual(notFoundResponse);
		});
	});

	describe("DELETE /tournaments/:tournament_id/players/:player_id", () => {
		it("should return 200 when a player is successfully deleted", async () => {
			const created = await server.db.player.save(mockPlayer);

			const response = await server.inject({
				method: "DELETE",
				url: `/tournaments/${tournament.id}/players/${created.id}`,
				headers: {
					authorization: `Bearer ${server.config.DEFAULT_ADMIN_KEY}`,
				},
			});

			expect(response.statusCode).toBe(200);
			expect(response.json()).toMatchObject(created);
		});

		it("should return 404 if the player to delete does not exist", async () => {
			const response = await server.inject({
				method: "DELETE",
				url: `/tournaments/${tournament.id}/players/1`,
				headers: {
					authorization: `Bearer ${server.config.DEFAULT_ADMIN_KEY}`,
				},
			});

			expect(response.statusCode).toBe(404);
			expect(response.json()).toEqual(notFoundResponse);
		});
	});
});
