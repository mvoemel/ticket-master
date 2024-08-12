import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@mv-ticket-master/common";
import { newOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";
import { indexOrderRouter } from "./routes";
import { deleteOrderRouter } from "./routes/delete";

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
app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);

app.all("*", (req, res) => {
  throw new NotFoundError();
});

// ERROR HANDLER
app.use(errorHandler);

export { app };
