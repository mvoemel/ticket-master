import request from "supertest";
import { app } from "../../app";

it("failes when email that does not exist is supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@example.com",
      password: "password123",
    })
    .expect(400);
});

it("failes when incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@example.com",
      password: "password123",
    })
    .expect(201);

  return request(app)
    .post("/api/users/signin")
    .send({
      email: "test@example.com",
      password: "wrongpassword",
    })
    .expect(400);
});

it("responds with a cookie when given valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@example.com",
      password: "password123",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@example.com",
      password: "password123",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
