import faker from "faker";
import httpMocks from "node-mocks-http";
import { jest } from "@jest/globals";

import checkJobIsApproved from "./checkJobIsApproved";
import Job from "../models/Job";
import ROLES from "../utils/roles";

describe("checkJobIsApproved middleware", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("When the job found is approved", () => {
    test("Should call the next middleware", async () => {
      const randomId = faker.datatype.uuid();

      const req = httpMocks.createRequest({
        method: "GET",
        url: `/api/jobs/${randomId}`,
        params: {
          id: randomId,
        },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn(); // spy
      // stub
      const findById = jest.spyOn(Job, "findById");
      findById.mockResolvedValue({
        // fake job model object
        isApproved: true,
      });

      await checkJobIsApproved(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When the job found is not approved", () => {
    describe("And the user is an admin", () => {
      test("Should call the next middleware", async () => {
        const randomId = faker.datatype.uuid();

        const req = httpMocks.createRequest({
          method: "GET",
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
        // stub
        const findById = jest.spyOn(Job, "findById");
        findById.mockResolvedValue({
          // fake job model object
          isApproved: false,
        });

        await checkJobIsApproved(req, res, next);

        expect(next).toHaveBeenCalled();
      });
    });

    describe("And the user is not an admin", () => {
      test("Should respond with a 404 status code", async () => {
        const randomId = faker.datatype.uuid();

        const req = httpMocks.createRequest({
          method: "GET",
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
        const next = jest.fn(); // spy
        // stub
        const findById = jest.spyOn(Job, "findById");
        findById.mockResolvedValue({
          // fake job model object
          isApproved: false,
        });

        await checkJobIsApproved(req, res, next);

        expect(res.statusCode).toBe(404);
      });
    });
  });
});
