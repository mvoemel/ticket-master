import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/sign-in";
import { signOutRouter } from "./routes/sign-out";
import { signUpRouter } from "./routes/sign-up";

import { errorHandler, NotFoundError } from "@mv-ticket-master/common";

const app = express();

app.set("trust proxy", true); // Enable X-Forwarded-* headers
app.use(json());
app.use(
  cookieSession({
    signed: false, // not encrypted
    secure: process.env.NODE_ENV !== "test", // HTTPS only except in test environment
  })
);

// ROUTERS
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all("*", (req, res) => {
  throw new NotFoundError();
});

// ERROR HANDLER
app.use(errorHandler);

export { app };
