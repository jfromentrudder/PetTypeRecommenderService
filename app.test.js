const app = require("./app");
const request = require("supertest");

describe("POST /pet-type-recommendation", () => {
	it("should return a recommendation based on the user's input values", async () => {
		const inputs = {
			size: "3",
			space: "5",
			interaction: "4",
			cost: "6",
		};
		const res = await request(app)
			.post("/pet-type-recommendation")
			.send(inputs);
		expect(res.status).toBe(200);
		expect(res.body.Answer).toBe("Bird");
	});

	it("should return a valid pet recommendation for edge case inputs", async () => {
		const inputs = {
			size: "10",
			space: "10",
			interaction: "10",
			cost: "10",
		};

		const res = await request(app)
			.post("/pet-type-recommendation")
			.send(inputs)
			.set("Content-Type", "application/json");

		expect(res.status).toBe(200);
		expect(res.body.Answer).toBe("Horse"); // Based on edge case inputs
	});

	it("should provide an error for invalid input data", async () => {
		const inputs = {
			size: "0",
			space: "5",
			interaction: "4",
			cost: "6",
		};

		const res = await request(app)
			.post("/pet-type-recommendation")
			.send(inputs);

		expect(res.status).toBe(400);
		expect(res.body.message).toBe("Invalid input data");
	});
});

describe("POST /pet-type-recommendation-multiple", () => {
	it("should return a recommendation based on the user's input values", async () => {
		const inputs = {
			size: "3",
			space: "5",
			interaction: "4",
			cost: "6",
		};
		const res = await request(app)
			.post("/pet-type-recommendation-multiple")
			.send(inputs);
		expect(res.status).toBe(200);
		expect(res.body.Answer).toEqual({
			Best: "Bird",
			Great: "Rabbit",
			Good: "Cat",
		});
	});

	it("should return a valid pet recommendation for edge case inputs", async () => {
		const inputs = {
			size: "10",
			space: "10",
			interaction: "10",
			cost: "10",
		};

		const res = await request(app)
			.post("/pet-type-recommendation-multiple")
			.send(inputs)
			.set("Content-Type", "application/json");

		expect(res.status).toBe(200);
		expect(res.body.Answer).toEqual({
			Best: "Horse",
			Great: "Dog",
			Good: "Cat",
		}); // Based on edge case inputs
	});

	it("should provide an error for invalid input data", async () => {
		const inputs = {
			size: "0",
			space: "5",
			interaction: "4",
			cost: "6",
		};

		const res = await request(app)
			.post("/pet-type-recommendation-multiple")
			.send(inputs);

		expect(res.status).toBe(400);
		expect(res.body.message).toBe("Invalid input data");
	});
});
