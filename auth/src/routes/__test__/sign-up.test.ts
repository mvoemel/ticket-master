import request from "supertest";
import { app } from "../../app";

it("returns 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@example.com",
      password: "password123",
    })
    .expect(201);
});

it("returns 400 on signup with invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "invalidemail.com",
      password: "password123",
    })
    .expect(400);
});

it("returns 400 on signup with invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@example.com",
      password: "p",
    })
    .expect(400);
});

it("returns 400 on signup with missing email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@example.com" })
    .expect(400);

  return request(app)
    .post("/api/users/signup")
    .send({
      password: "password123",
    })
    .expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@example.com",
      password: "password123",
    })
    .expect(201);

  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@example.com",
      password: "password123",
    })
    .expect(400);
});

it("sets a cookie on successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@example.com",
      password: "password123",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
