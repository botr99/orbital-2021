import faker from "faker";
import httpMocks from "node-mocks-http";
import { jest } from "@jest/globals";

import ROLES from "../utils/roles";
import validateUser from "./validateUser";

describe("validateUser middleware", () => {
  describe("When there is no user property in the request", () => {
    test("Should respond with a 401 status code", () => {
      const randomId = faker.datatype.uuid();

      const req = httpMocks.createRequest({
        method: "GET",
        url: `/api/user/${randomId}/registeredJobs`,
        params: {
          id: randomId,
        },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      validateUser(req, res, next);

      expect(res.statusCode).toBe(401);
    });
  });

  describe("When the user is an admin", () => {
    test("Should call the next middleware", () => {
      const randomId = faker.datatype.uuid();

      const req = httpMocks.createRequest({
        method: "GET",
        url: `/api/user/${randomId}/registeredJobs`,
        params: {
          id: randomId,
        },
        user: {
          email: faker.internet.email(),
          id: faker.datatype.uuid(),
          role: ROLES.Admin,
          name: faker.name.findName(),
        },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn(); // spy

      validateUser(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When the user id matches the request parameters", () => {
    test("Should call the next middleware", () => {
      const randomId = faker.datatype.uuid();

      const req = httpMocks.createRequest({
        method: "GET",
        url: `/api/user/${randomId}/registeredJobs`,
        params: {
          id: randomId,
        },
        user: {
          email: faker.internet.email(),
          id: randomId, // matches req.params.id
          role: ROLES.StudentGroup,
          name: faker.name.findName(),
        },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn(); // spy

      validateUser(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When the user id does not match the request parameters", () => {
    test("Should respond with a 401 status code", () => {
      const randomId = faker.datatype.uuid();

      const req = httpMocks.createRequest({
        method: "GET",
        url: `/api/user/${randomId}/registeredJobs`,
        params: {
          id: randomId,
        },
        user: {
          email: faker.internet.email(),
          // unique id that does not match req.params.id
          id: faker.unique(faker.datatype.uuid),
          role: ROLES.StudentGroup,
          name: faker.name.findName(),
        },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      validateUser(req, res, next);

      expect(res.statusCode).toBe(401);
    });
  });
});
