import request from "supertest";
import { sendEmail } from "./mailer.js";
import dotenv from "dotenv";

dotenv.config();

describe("Mailtrap test suite", () => {
  const mailtrapUrl = "https://mailtrap.io/api/v1";
  const apiToken = process.env.MAILTRAP_API_TOKEN;
  const inboxId = process.env.MAILTRAP_INBOX_ID;

  beforeEach(async () => {
    // clear all the emails in the inbox
    await request(mailtrapUrl)
      .patch(`/inboxes/${inboxId}/clean`)
      .set("Api-Token", apiToken);

    console.log("Inbox is empty");
  });

  describe("Sending with invalid email format", () => {
    beforeEach(async () => {
      // send email with inproper format
      await sendEmail(
        "randomAccount.com",
        "anotherAccount",
        "Invalid email addresses",
        "To test that email will not be sent out"
      );
    });

    test("should not retrieve any email", async () => {
      const res = await request(mailtrapUrl)
        .get(`/inboxes/${inboxId}/messages`)
        .set("Api-Token", apiToken)
        .expect("Content-Type", /json/)
        .expect(200);

      expect(res.body).toStrictEqual([]);
    });
  });

  describe("Sending with valid email format", () => {
    beforeEach(async () => {
      // send email with proper format
      await sendEmail(
        "randomAccount@gmail.com",
        "anotherAccount@gmail.com",
        "Email with correct addresses",
        "To test that email will be sent out"
      );
    });

    test("should retrieve an email", async () => {
      const res = await request(mailtrapUrl)
        .get(`/inboxes/${inboxId}/messages`)
        .set("Api-Token", apiToken)
        .expect("Content-Type", /json/)
        .expect(200);

      // response body should be an array of size 1
      expect(res.body.length).toBe(1);
    });

    test("email retrieved should match the fields", async () => {
      const res = await request(mailtrapUrl)
        .get(`/inboxes/${inboxId}/messages`)
        .set("Api-Token", apiToken)
        .expect("Content-Type", /json/)
        .expect(200);

      const messageSent = res.body[0];
      expect(messageSent.from_email).toBe("randomAccount@gmail.com");
      expect(messageSent.to_email).toBe("anotherAccount@gmail.com");
      expect(messageSent.subject).toBe("Email with correct addresses");
    });
  });

  afterAll(async () => {
    // clear all the emails in the inbox
    await request(mailtrapUrl)
      .patch(`/inboxes/${inboxId}/clean`)
      .set("Api-Token", apiToken);
  });
});
