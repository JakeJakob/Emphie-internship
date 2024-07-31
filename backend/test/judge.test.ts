import { FastifyInstance } from "fastify";
import createServer from "../src/server";
import { Judge } from "../src/modules/judge/entity";
import { Tournament } from "../src/modules/tournament/entity";

describe("Judge Routes", () => {
	let server: FastifyInstance;

	const notFoundResponse = { msg: "Judge not found" };
	let tournament: Tournament;
	let mockJudge: Partial<Judge> = {
		name: "Jane Doe",
		code: "JD123",
	};

	beforeAll(async () => {
		server = await createServer();

		await server.db.judge.clear();
		await server.db.tournament.clear();

		tournament = await server.db.tournament.save({
			name: "New Tournament",
			code: "aaaa",
		});

		mockJudge.tournament_id = tournament.id;
	});

	afterEach(async () => {
		await server.db.judge.clear();
	});

	afterAll(async () => {
		await server.close();
	});

	describe("POST /tournaments/:tournament_id/judges", () => {
		it("should create a new judge and return 201", async () => {
			const response = await server.inject({
				method: "POST",
				url: `/tournaments/${tournament.id}/judges`,
				payload: mockJudge,
				headers: {
					authorization: `Bearer ${server.config.DEFAULT_ADMIN_KEY}`,
				},
			});

			expect(response.statusCode).toBe(201);
			expect(response.json()).toMatchObject(mockJudge);
		});
	});

	describe("GET /tournaments/:tournament_id/judges", () => {
		it("should return an array of judges", async () => {
			const created = await server.db.judge.save(mockJudge);

			const response = await server.inject({
				method: "GET",
				url: `/tournaments/${tournament.id}/judges`,
			});

			expect(response.statusCode).toBe(200);
			expect(response.json()).toEqual([created]);
		});
	});

	describe("GET /tournaments/:tournament_id/judges/:judge_id", () => {
		it("should return 404 if the judge is not found", async () => {
			const response = await server.inject({
				method: "GET",
				url: `/tournaments/${tournament.id}/judges/1`,
				headers: {
					authorization: `Bearer ${server.config.DEFAULT_ADMIN_KEY}`,
				},
			});

			expect(response.statusCode).toBe(404);
			expect(response.json()).toEqual(notFoundResponse);
		});

		it("should return 200 with the judge data if the judge is found", async () => {
			const created = await server.db.judge.save(mockJudge);

			const response = await server.inject({
				method: "GET",
				url: `/tournaments/${tournament.id}/judges/${created.id}`,
				headers: {
					authorization: `Bearer ${server.config.DEFAULT_ADMIN_KEY}`,
				},
			});

			expect(response.statusCode).toBe(200);
			expect(response.json()).toMatchObject(created);
		});
	});

	describe("PUT /tournaments/:tournament_id/judges/:judge_id", () => {
		it("should update an existing judge and return 200", async () => {
			const created = await server.db.judge.save(mockJudge);

			const updatedData = {
				name: "Jane Smith",
				code: "JS456",
			};

			const response = await server.inject({
				method: "PUT",
				url: `/tournaments/${tournament.id}/judges/${created.id}`,
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

		it("should return 404 if the judge to update does not exist", async () => {
			const response = await server.inject({
				method: "PUT",
				url: `/tournaments/${tournament.id}/judges/1`, // Use an invalid judge ID
				payload: mockJudge,
				headers: {
					authorization: `Bearer ${server.config.DEFAULT_ADMIN_KEY}`,
				},
			});

			expect(response.statusCode).toBe(404);
			expect(response.json()).toEqual(notFoundResponse);
		});
	});

	describe("DELETE /tournaments/:tournament_id/judges/:judge_id", () => {
		it("should return 200 when a judge is successfully deleted", async () => {
			const created = await server.db.judge.save(mockJudge);

			const response = await server.inject({
				method: "DELETE",
				url: `/tournaments/${tournament.id}/judges/${created.id}`,
				headers: {
					authorization: `Bearer ${server.config.DEFAULT_ADMIN_KEY}`,
				},
			});

			expect(response.statusCode).toBe(200);
			expect(response.json()).toMatchObject(created);
		});

		it("should return 404 if the judge to delete does not exist", async () => {
			const response = await server.inject({
				method: "DELETE",
				url: `/tournaments/${tournament.id}/judges/1`,
				headers: {
					authorization: `Bearer ${server.config.DEFAULT_ADMIN_KEY}`,
				},
			});

			expect(response.statusCode).toBe(404);
			expect(response.json()).toEqual(notFoundResponse);
		});
	});
});
