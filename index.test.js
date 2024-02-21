const request = require("supertest");
const app = require("./src/app");
const syncSeed = require("./seed");
const Musician = require("./models/Musician");
let musQuantity;

const { describe, test, expect, beforeAll } = require("@jest/globals");

// // clear db before tests
beforeAll(async () => {
  await syncSeed();
  const muscicians = await Musician.findAll({});
  musQuantity = muscicians.length;
});

describe("tests for /muscicians", () => {
  test("GET /muscicians returns 200 status code", async () => {
    const response = await request(app).get("/musicians");

    expect(response.statusCode).toBe(200);
  });

  test("GET /muscicians returns correct length of muscicians", async () => {
    const response = await request(app).get("/musicians");

    expect(response.body).toHaveLength(musQuantity);
  });

  test("GET /muscicians returns array muscicians", async () => {
    const response = await request(app).get("/musicians");
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toHaveProperty("instrument");
  });

  test("GET /muscicians returns correct muscicians data", async () => {
    const response = await request(app).get("/musicians");
    expect(response.body).toContainEqual(
      expect.objectContaining({
        name: "Mick Jagger",
      })
    );
  });

  test("GET /muscicians/:id returns correct restaurant", async () => {
    const response = await request(app).get("/musicians/1");

    expect(response.body).toEqual(
      expect.objectContaining({
        name: "Mick Jagger",
      })
    );
  });

  test("POST /muscicians", async () => {
    const response = await request(app).post("/musicians").send({
      name: "Taylor Swift",
      instrument: "voice",
    });

    const actual = await request(app).get("/musicians");

    expect(actual.body).toContainEqual(
      expect.objectContaining({ name: "Taylor Swift" })
    );
  });

  test("PUT /muscicians/:id", async () => {
    const response = await request(app)
      .put("/musicians/1")
      .send({ name: "Beyonce", instrument: "voice" });

    const restaurant = await Musician.findByPk(1);

    expect(restaurant.name).toBe("Beyonce");
  });

  test("DELETE /muscicians/:id", async () => {
    const response = await request(app).delete("/musicians/1");

    const muscicians = await Musician.findAll({});
    expect(muscicians).toHaveLength(musQuantity);
    expect(muscicians[0].id).not.toEqual(1);
  });
});
