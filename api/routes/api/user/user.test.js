import app from "../../../app.js";
import request from "supertest";

describe("POST /login", () => {
  describe("given a non-existing email", () => {
    // should not be able to find any user with the email
    // should respond with a 404 status code

    test("should respond wth a 404 status code", async () => {
      const res = await request(app).post("/api/user/login").send({
        email: "invalid@gmail.com",
        password: "randompassword123",
      });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("given an existing email with an incorrect password", () => {
    // should find the user with the email in the database
    // should find that the password compared differs from the hashed password
    // should respond with a 400 status code
  });

  describe("given an existing email with the correct password", () => {
    // should find the user with the email in the database
    // should respond with a 200 status code
  });
});
