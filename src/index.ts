import express from "express";
import conection from "../models/conection";
import cookieParser from "cookie-parser";

import mocksRouter from "./routes/mocks.router";
import adoptionsRouter from "./routes/adoption.router";
import petsRouter from "./routes/pets.router";
import usersRouter from "./routes/user.router";

require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

conection();

app.use(express.json());
app.use(cookieParser());

app.use("/api/mocks", mocksRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/pets", petsRouter);
app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
