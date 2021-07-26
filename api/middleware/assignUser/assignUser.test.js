import faker from "faker";
import httpMocks from "node-mocks-http";
import { jest } from "@jest/globals";
import jwt from "jsonwebtoken";

import assignUser from "./assignUser";
import ROLES from "../../utils/roles";

describe("assignUser middleware", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("A request without authorization header", () => {
    test("Should call the next middleware", async () => {
      const req = httpMocks.createRequest({
        method: "GET",
        url: "/api/jobs/unapproved",
        headers: {
          authorization: "",
        },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn(); // spy

      await assignUser(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("A request with authorization header", () => {
    describe("Which contains a valid JWT token", () => {
      test("Should call the next middleware", async () => {
        const req = httpMocks.createRequest({
          method: "GET",
          url: "/api/jobs/unapproved",
          headers: {
            authorization: "Bearer validJWT",
          },
        });
        const res = httpMocks.createResponse();
        const next = jest.fn(); // spy
        // stub
        const verify = jest.spyOn(jwt, "verify");
        verify.mockReturnValue({
          email: faker.internet.email(),
          id: faker.datatype.uuid(),
          role: ROLES.Student,
          name: faker.name.findName(),
        });

        await assignUser(req, res, next);

        expect(next).toHaveBeenCalled();
      });
    });

    describe("Which contains an invalid JWT token", () => {
      test("Should respond with a 401 status code", async () => {
        const req = httpMocks.createRequest({
          method: "GET",
          url: "/api/jobs/unapproved",
          headers: {
            authorization: "Bearer invalidJWT",
          },
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        await assignUser(req, res, next);

        expect(res.statusCode).toBe(401);
      });
    });
  });
});
