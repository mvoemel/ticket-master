import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@mv-ticket-master/common";
import { createChargeRouter } from "./routes/new";

const app = express();

app.set("trust proxy", true); // Enable X-Forwarded-* headers
app.use(json());
app.use(
  cookieSession({
    signed: false, // not encrypted
    secure: process.env.NODE_ENV !== "test", // HTTPS only except in test environment
  })
);

// MIDDLEWARES
app.use(currentUser);

// ROUTERS
app.use(createChargeRouter);

app.all("*", (req, res) => {
  throw new NotFoundError();
});

// ERROR HANDLER
app.use(errorHandler);

export { app };
