// src/routes/mocks.router.ts

import express from "express";
import {
  mockingUsers,
  generateData,
  getUsers,
  mockingPets,
} from "../controllers/mocks.controller";

const router = express.Router();

// Define routes and connect them to controller functions
router.get("/mockingusers", mockingUsers);
router.get("/mockingpets", mockingPets);
router.post("/generateData", generateData);
router.get("/users", getUsers);

export default router;
