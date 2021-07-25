import faker from "faker";
import httpMocks from "node-mocks-http";
import { jest } from "@jest/globals";

import Job from "../../models/Job";
import paginateQuery from "./paginateQuery";

describe("paginateQuery middleware", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("When the page query string is a negative number", () => {
    test("Should respond with a 404 status code", async () => {
      const randomPage = faker.datatype.number({
        min: -1000,
        max: -1,
      });

      const req = httpMocks.createRequest({
        method: "GET",
        url: `/api/jobs?page=${randomPage}`,
        query: {
          page: randomPage,
        },
      });
      const res = httpMocks.createResponse();
      const model = jest.fn();

      await paginateQuery(req, res, model);

      expect(res.statusCode).toBe(404);
    });
  });

  describe("When the limit query string is a negative number", () => {
    test("Should respond with a 404 status code", async () => {
      const randomLimit = faker.datatype.number({
        min: -1000,
        max: -1,
      });

      const req = httpMocks.createRequest({
        method: "GET",
        url: `/api/jobs?limit=${randomLimit}`,
        query: {
          limit: randomLimit,
        },
      });
      const res = httpMocks.createResponse();
      const model = jest.fn();

      await paginateQuery(req, res, model);

      expect(res.statusCode).toBe(404);
    });
  });

  describe("When the server is down", () => {
    test("Should respond with a 500 status code", async () => {
      const req = httpMocks.createRequest({
        method: "GET",
        url: "/api/jobs",
      });
      const res = httpMocks.createResponse();

      const find = jest.spyOn(Job, "find");
      const countDocumentsStub = jest
        .fn()
        .mockRejectedValueOnce(new Error("Network error"));
      find.mockImplementationOnce(() => ({
        countDocuments: countDocumentsStub,
      }));

      await paginateQuery(req, res, Job);

      expect(res.statusCode).toBe(500);
    });
  });

  describe("When the page query string exceeds the total number of pages", () => {
    test("Should respond with a 404 status code", async () => {
      const randomPageCount = faker.datatype.number({
        min: 1,
        max: 1000,
      });
      const randomLimit = faker.datatype.number({
        min: 1,
        max: 1000,
      });

      const req = httpMocks.createRequest({
        method: "GET",
        url: `/api/jobs?page=${randomPageCount + 1}&limit=${randomLimit}`, // exceed by 1
        query: {
          page: randomPageCount + 1,
          limit: randomLimit,
        },
      });
      const res = httpMocks.createResponse();

      const find = jest.spyOn(Job, "find");
      const countDocumentsStub = jest
        .fn()
        .mockResolvedValueOnce(randomPageCount * randomLimit);
      find.mockImplementationOnce(() => ({
        countDocuments: countDocumentsStub,
      }));

      await paginateQuery(req, res, Job);

      expect(res.statusCode).toBe(404);
    });
  });

  describe("When filters and sort are not passed, and defaults to an empty object for both", () => {
    test("Should respond with a 200 status code", async () => {
      const randomPage = faker.datatype.number({
        min: 1,
        max: 1000,
      });
      const randomLimit = faker.datatype.number({
        min: 1,
        max: 1000,
      });

      const req = httpMocks.createRequest({
        method: "GET",
        url: `/api/jobs?page=${randomPage}&limit=${randomLimit}`,
        query: {
          page: randomPage,
          limit: randomLimit,
        },
      });
      const res = httpMocks.createResponse();

      const find = jest.spyOn(Job, "find");
      const countDocumentsStub = jest
        .fn()
        .mockResolvedValueOnce(randomPage * randomLimit);
      const skipStub = jest.fn().mockReturnThis();
      const limitStub = jest.fn().mockReturnThis();
      const sortStub = jest.fn().mockResolvedValueOnce({
        title: "Sample job",
        hours: faker.datatype.number({
          min: 1,
          max: 12,
        }),
      });

      find
        .mockImplementationOnce(() => ({
          countDocuments: countDocumentsStub,
        })) // behaviour for first call
        .mockImplementationOnce(() => ({
          skip: skipStub,
          limit: limitStub,
          sort: sortStub,
        })); // behaviour for second call

      await paginateQuery(req, res, Job);

      expect(res.statusCode).toBe(200);
    });
  });
});
