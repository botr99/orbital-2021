import faker from "faker";
import httpMocks from "node-mocks-http";
import { jest } from "@jest/globals";

import checkAuth from "./checkAuth";
import ROLES from "../../utils/roles";

describe("Middleware that makes use of checkAuth function applied with a permissions array", () => {
  describe("Passing in permissions that is not an array", () => {
    test("Should respond with a 401 status code", () => {
      // assign some random string/boolean/number to permissions
      const permissions = faker.name.jobTitle();
      const req = httpMocks.createRequest({
        method: "GET",
        url: "/api/jobs/unapproved",
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      const middleware = checkAuth(permissions);
      middleware(req, res, next);

      expect(res.statusCode).toBe(401);
    });
  });

  describe("A request without user property", () => {
    test("Should respond with a 401 status code", () => {
      const permissions = Object.values(ROLES);
      const req = httpMocks.createRequest({
        method: "GET",
        url: "/api/jobs/unapproved",
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      const middleware = checkAuth(permissions);
      middleware(req, res, next);

      expect(res.statusCode).toBe(401);
    });
  });

  describe("Permissions array doesn't include user's role", () => {
    test("Should respond with a 401 status code", () => {
      const permissions = [ROLES.Admin];
      const req = httpMocks.createRequest({
        method: "GET",
        url: "/api/jobs/unapproved",
        user: {
          email: faker.internet.email(),
          id: faker.datatype.uuid(),
          role: ROLES.Student,
          name: faker.name.findName(),
        },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      const middleware = checkAuth(permissions);
      middleware(req, res, next);

      expect(res.statusCode).toBe(401);
    });
  });

  describe("Permissions array includes user's role", () => {
    test("Should call the next middleware", () => {
      const permissions = Object.values(ROLES); // all roles are included
      const req = httpMocks.createRequest({
        method: "GET",
        url: "/api/jobs/unapproved",
        user: {
          email: faker.internet.email(),
          id: faker.datatype.uuid(),
          role: ROLES.Student,
          name: faker.name.findName(),
        },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn(); // spy

      const middleware = checkAuth(permissions);
      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
