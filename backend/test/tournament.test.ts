import { FastifyInstance } from "fastify";
import createServer from "../src/server";
import { Tournament } from "../src/modules/tournament/entity";

describe("Tournament Routes", () => {
	let server: FastifyInstance;

	const notFoundResponse = { msg: "Tournament not found" };
	const mockTournament: Partial<Tournament> = {
		name: "New Tournament",
		code: "aaaa",
	};

	beforeAll(async () => {
		server = await createServer();

		await server.db.tournament.clear();
	});

	afterEach(async () => {
		await server.db.tournament.clear();
	});

	afterAll(async () => {
		await server.close();
	});

	describe("POST /tournaments", () => {
		it("should create a new tournament and return 201", async () => {
			const response = await server.inject({
				method: "POST",
				url: "/tournaments",
				payload: mockTournament,
				headers: {
					authorization: `Bearer ${server.config.DEFAULT_ADMIN_KEY}`,
				},
			});

			expect(response.statusCode).toBe(201);
			expect(response.json()).toMatchObject(mockTournament);
		});
	});

	describe("GET /tournaments/:id", () => {
		it("should return 404 if the tournament is not found", async () => {
			const response = await server.inject({
				method: "GET",
				url: "/tournaments/1",
			});

			expect(response.statusCode).toBe(404);
			expect(response.json()).toEqual(notFoundResponse);
		});

		it("should return 200 with the tournament data if the tournament is found", async () => {
			const created = await server.db.tournament.save(mockTournament);

			const response = await server.inject({
				method: "GET",
				url: `/tournaments/${created.id}`,
			});

			expect(response.statusCode).toBe(200);
			expect(response.json()).toMatchObject(created);
		});
	});

	describe("PUT /tournaments/:id", () => {
		it("should update an existing tournament and return 200", async () => {
			const created = await server.db.tournament.save(mockTournament);

			const updatedData = { name: "Updated Tournament", code: "bbbb" };
			const response = await server.inject({
				method: "PUT",
				url: `/tournaments/${created.id}`,
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

		it("should return 404 if the tournament to update does not exist", async () => {
			const response = await server.inject({
				method: "PUT",
				url: `/tournaments/9999`,
				payload: mockTournament,
				headers: {
					authorization: `Bearer ${server.config.DEFAULT_ADMIN_KEY}`,
				},
			});

			expect(response.statusCode).toBe(404);
			expect(response.json()).toEqual(notFoundResponse);
		});
	});

	describe("DELETE /tournaments/:id", () => {
		it("should return 200 when a tournament is successfully deleted", async () => {
			const created = await server.db.tournament.save(mockTournament);

			const response = await server.inject({
				method: "DELETE",
				url: `/tournaments/${created.id}`,
				headers: {
					authorization: `Bearer ${server.config.DEFAULT_ADMIN_KEY}`,
				},
			});

			expect(response.statusCode).toBe(200);
			expect(response.json()).toMatchObject(created);
		});

		it("should return 404 if the tournament to delete does not exist", async () => {
			const response = await server.inject({
				method: "DELETE",
				url: `/tournaments/9999`,
				headers: {
					authorization: `Bearer ${server.config.DEFAULT_ADMIN_KEY}`,
				},
			});

			expect(response.statusCode).toBe(404);
			expect(response.json()).toEqual(notFoundResponse);
		});
	});
});
