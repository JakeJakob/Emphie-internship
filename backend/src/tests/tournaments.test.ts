import { app } from "../main";
import request from "supertest";

describe("Test unauthorized", () => {
	it("Should respond with http 401", async () => {
		const response = await request(app).get("/tournaments");
		expect(response.status).toBe(401);
		expect(response.body).toEqual({
			message: "No authorization header",
		});
	});
});
