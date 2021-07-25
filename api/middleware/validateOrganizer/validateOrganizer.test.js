import faker from "faker";
import httpMocks from "node-mocks-http";
import { jest } from "@jest/globals";

import ROLES from "../../utils/roles";
import validateOrganizer from "./validateOrganizer";

describe("validateOrganizer middleware", () => {
  describe("When there is no user property in the request", () => {
    test("Should respond with a 401 status code", () => {
      const randomId = faker.datatype.uuid();

      const req = httpMocks.createRequest({
        method: "DELETE",
        url: `/api/jobs/${randomId}`,
        params: {
          id: randomId,
        },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      validateOrganizer(req, res, next);

      expect(res.statusCode).toBe(401);
    });
  });

  describe("When the user is an admin", () => {
    test("Should call the next middleware", () => {
      const randomId = faker.datatype.uuid();

      const req = httpMocks.createRequest({
        method: "DELETE",
        url: `/api/jobs/${randomId}`,
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

      validateOrganizer(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When the user is a student group/organization", () => {
    describe("And the user is the job organizer", () => {
      test("Should call the next middleware", () => {
        const randomId = faker.datatype.uuid();
        const randomOrganizer = faker.name.findName();

        const req = httpMocks.createRequest({
          method: "DELETE",
          url: `/api/jobs/${randomId}`,
          params: {
            id: randomId,
          },
          user: {
            email: faker.internet.email(),
            id: faker.datatype.uuid(),
            role: ROLES.Organization,
            name: randomOrganizer,
          },
          jobDetail: {
            organizer: randomOrganizer,
          },
        });
        const res = httpMocks.createResponse();
        const next = jest.fn(); // spy

        validateOrganizer(req, res, next);

        expect(next).toHaveBeenCalled();
      });
    });

    describe("And the user is not the job organizer", () => {
      test("Should respond with a 401 status code", () => {
        const randomId = faker.datatype.uuid();

        const req = httpMocks.createRequest({
          method: "DELETE",
          url: `/api/jobs/${randomId}`,
          params: {
            id: randomId,
          },
          user: {
            email: faker.internet.email(),
            id: faker.datatype.uuid(),
            role: ROLES.StudentGroup,
            name: faker.unique(faker.name.findName),
          },
          jobDetail: {
            // faker unique helps ensure the name field in
            // user and organizer field in jobDetail differs
            organizer: faker.unique(faker.name.findName),
          },
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        validateOrganizer(req, res, next);

        expect(res.statusCode).toBe(401);
      });
    });
  });

  describe("When the user is a student", () => {
    test("Should respond with a 401 status code", () => {
      const randomId = faker.datatype.uuid();

      const req = httpMocks.createRequest({
        method: "DELETE",
        url: `/api/jobs/${randomId}`,
        params: {
          id: randomId,
        },
        user: {
          email: faker.internet.email(),
          id: faker.datatype.uuid(),
          role: ROLES.Student,
          name: faker.name.findName(),
        },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      validateOrganizer(req, res, next);

      expect(res.statusCode).toBe(401);
    });
  });
});
