import express from "express";
import conection from "../models/conection";
import cookieParser from "cookie-parser";

import mocksRouter from "./routes/mocks.router";
import adoptionsRouter from "./routes/adoption.router";
import petsRouter from "./routes/pets.router";
import usersRouter from "./routes/user.router";
import sessionRouter from "./routes/session.router";
import logger from "../utils/logger";
import { swaggerSpecs, swaggerUi } from "./swaggerConfig";

require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

conection();

app.use(express.json());
app.use(cookieParser());

app.get('/loggerTest', (_req, res) => {
  logger.debug('Este es un mensaje de debug');
  logger.http('Este es un mensaje http');
  logger.info('Este es un mensaje info');
  logger.warning('Este es un mensaje warning');
  logger.error('Este es un mensaje error');
  res.send('Logs enviados a la consola y archivo según el nivel');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/mocks", mocksRouter);

app.listen(PORT, () => {
  logger.debug(`http://localhost:${PORT}`);
});
