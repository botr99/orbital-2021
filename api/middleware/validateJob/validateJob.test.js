import faker from "faker";
import httpMocks from "node-mocks-http";
import { jest } from "@jest/globals";

import jobSchema from "../../schemas";
import validateJob from "./validateJob";

describe("validateJob middleware", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("When there is error in validating job", () => {
    test("Should respond with a 400 status code", () => {
      const jobPost = {
        title: "Sample job",
        hours: faker.datatype.number({
          min: 1,
          max: 12,
        }),
      };

      const req = httpMocks.createRequest({
        method: "POST",
        url: "/api/jobs",
        body: jobPost,
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();
      // stub
      const validate = jest.spyOn(jobSchema, "validate");
      validate.mockReturnValue({
        error: {
          statusCode: 400,
          error: "Bad Request",
          message: "Invalid request payload input",
        },
      });

      validateJob(req, res, next);

      expect(res.statusCode).toBe(400);
    });
  });

  describe("When there is no error in validating job", () => {
    test("Should call the next middleware", () => {
      const jobPost = {
        title: "Sample job",
        hours: faker.datatype.number({
          min: 1,
          max: 12,
        }),
      };

      const req = httpMocks.createRequest({
        method: "POST",
        url: "/api/jobs",
        body: jobPost,
      });
      const res = httpMocks.createResponse();
      const next = jest.fn(); // spy
      // stub
      const validate = jest.spyOn(jobSchema, "validate");
      validate.mockReturnValue({
        value: jobPost,
      });

      validateJob(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
