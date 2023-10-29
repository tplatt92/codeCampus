import { test, expect /*, afterAll, teardown */ } from "vitest";
import supertest from "supertest";
import { resetAllTables } from "../db/helpers.js";
import app from "../app.js";
import { data } from "../db/data.js";

// Testing GET all events
test("GET /events", async () => {
  //reset database and pass in data
  await resetAllTables(data);
  const response = await supertest(app).get("/events");
  // Response body	{ success: true, payload: an array of events objects }
  const responseBody = response.body;
  console.log(responseBody);
  // check body is success an dia an array
  expect(responseBody.success).toBeTruthy();
  expect(Array.isArray(responseBody.payload)).toBeTruthy;
  //console.log(responseBody.payload);
  //Response status	200
  const responseStatusCode = response.statusCode;
  expect(responseStatusCode).toBe(200);
  //Response header	Content-Type header should contain application/json
  const responseType = response.type;
  expect(responseType).toBe("application/json");
});
