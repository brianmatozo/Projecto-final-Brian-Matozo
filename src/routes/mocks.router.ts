// src/routes/mocks.router.ts

/**
 * @swagger
 * /mockingusers:
 *   get:
 *     summary: crea una lista de 100 usuarios
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 * /mockingpets:
 *   get:
 *     summary: crea una lista de 100 mascotas
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Lista de mascotas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 * /generateData:
 *   post:
 *     summary: Crea users(variable) usuarios y pets(variable) mascotas
 *     tags: [Mocks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               users:
 *                 type: number
 *               pets:
 *                 type: number 
 *     responses:
 *       201: 
 *         description: Usuarios y mascotas creados con exito
 *       500:
 *         description: Error en la solicitud
 * /users:
 *   get:
 *     summary: Obtiene una lista de usuarios
 *     tags: [Mocks]     
 *     responses:
 *      500:
 *        description: Error en la solicitud
 */

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
