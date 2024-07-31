import { FastifyInstance } from "fastify";
import createServer from "../src/server";
import { Game } from "../src/modules/game/schema";
import { Tournament } from "../src/modules/tournament/entity";
import { Player } from "../src/modules/player/entity";

describe("Game Routes", () => {
	let server: FastifyInstance;

	const notFoundResponse = { msg: "Game not found" };
	let tournament: Tournament;
	let whitePlayer: Player;
	let blackPlayer: Player;
	let mockGame: Partial<Game>;

	beforeAll(async () => {
		server = await createServer();

		await server.db.player.clear();
		await server.db.tournament.clear();
		await server.db.game.clear();

		tournament = await server.db.tournament.save({
			name: "New Tournament",
			code: "aaaa",
		});

		whitePlayer = await server.db.player.save({
			first_name: "John",
			last_name: "White",
			rank: 2400,
			title: "GM",
			tournament_id: tournament.id,
		});

		blackPlayer = await server.db.player.save({
			first_name: "Jane",
			last_name: "Black",
			rank: 2350,
			title: "IM",
			tournament_id: tournament.id,
		});

		mockGame = {
			white_id: whitePlayer.id,
			black_id: blackPlayer.id,
			round: 1,
			winner_id: null,
			tournament_id: tournament.id,
		};
	});

	afterEach(async () => {
		await server.db.game.clear();
	});

	afterAll(async () => {
		await server.close();
	});

	describe("POST /tournaments/:tournament_id/games", () => {
		it("should create a new game and return 201", async () => {
			const response = await server.inject({
				method: "POST",
				url: `/tournaments/${tournament.id}/games`,
				payload: mockGame,
				headers: {
					authorization: `Bearer ${server.config.DEFAULT_ADMIN_KEY}`,
				},
			});

			expect(response.statusCode).toBe(201);
			expect(response.json()).toMatchObject(mockGame);
		});
	});

	describe("GET /tournaments/:tournament_id/games", () => {
		it("should return an array of games", async () => {
			const created = await server.db.game.save(mockGame);

			const response = await server.inject({
				method: "GET",
				url: `/tournaments/${tournament.id}/games`,
			});

			expect(response.statusCode).toBe(200);
			expect(response.json()).toEqual([created]);
		});
	});

	describe("GET /tournaments/:tournament_id/games/:game_id", () => {
		it("should return 404 if the game is not found", async () => {
			const response = await server.inject({
				method: "GET",
				url: `/tournaments/${tournament.id}/games/1`,
			});

			expect(response.statusCode).toBe(404);
			expect(response.json()).toEqual(notFoundResponse);
		});

		it("should return 200 with the game data if the game is found", async () => {
			const created = await server.db.game.save(mockGame);

			const response = await server.inject({
				method: "GET",
				url: `/tournaments/${tournament.id}/games/${created.id}`,
			});

			expect(response.statusCode).toBe(200);
			expect(response.json()).toMatchObject(created);
		});
	});

	describe("PUT /tournaments/:tournament_id/games/:game_id", () => {
		it("should update an existing game and return 200", async () => {
			const created = await server.db.game.save(mockGame);

			const updatedData = {
				white_id: whitePlayer.id,
				black_id: blackPlayer.id,
				round: 2,
				winner_id: whitePlayer.id,
			};

			const response = await server.inject({
				method: "PUT",
				url: `/tournaments/${tournament.id}/games/${created.id}`,
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

		it("should return 404 if the game to update does not exist", async () => {
			const response = await server.inject({
				method: "PUT",
				url: `/tournaments/${tournament.id}/games/1`,
				payload: mockGame,
				headers: {
					authorization: `Bearer ${server.config.DEFAULT_ADMIN_KEY}`,
				},
			});

			expect(response.statusCode).toBe(404);
			expect(response.json()).toEqual(notFoundResponse);
		});
	});

	describe("DELETE /tournaments/:tournament_id/games/:game_id", () => {
		it("should return 200 when a game is successfully deleted", async () => {
			const created = await server.db.game.save(mockGame);

			const response = await server.inject({
				method: "DELETE",
				url: `/tournaments/${tournament.id}/games/${created.id}`,
				headers: {
					authorization: `Bearer ${server.config.DEFAULT_ADMIN_KEY}`,
				},
			});

			expect(response.statusCode).toBe(200);
			expect(response.json()).toMatchObject(created);
		});

		it("should return 404 if the game to delete does not exist", async () => {
			const response = await server.inject({
				method: "DELETE",
				url: `/tournaments/${tournament.id}/games/1`,
				headers: {
					authorization: `Bearer ${server.config.DEFAULT_ADMIN_KEY}`,
				},
			});

			expect(response.statusCode).toBe(404);
			expect(response.json()).toEqual(notFoundResponse);
		});
	});
});
