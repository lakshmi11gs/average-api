const request = require("supertest");
const app = require("../src/app");

describe("POST /average", () => {
    test("should return the number as the average for the first request", async () => {
        const response = await request(app)
            .post("/average")
            .send({ number: 10 });

        expect(response.statusCode).toBe(200);
        expect(response.body.average).toBe(10);
    });

    test("should calculate the average of submitted numbers", async () => {
        const response = await request(app)
            .post("/average")
            .send({ number: 20 });

        expect(response.statusCode).toBe(200);
        expect(response.body.average).toBe(15);
    });

    test("should reject invalid input", async () => {
        const response = await request(app)
            .post("/average")
            .send({ number: "hello" });

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("number must be a valid number");
    });
});