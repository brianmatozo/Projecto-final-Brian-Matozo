/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: El nombre de usuario
 *               email:
 *                 type: string
 *                 description: El email del usuario
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario
 *     responses:
 *       400:
 *         description: Error de validación
 *       201:
 *         description: Usuario registrado con éxito
 *       500:
 *         description: Error interno del servidor
 * /login:
 *   post:
 *     summary: Loguea a un usuario existente
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: El email del usuario
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario
 *     responses:
 *       404:
 *         description: Error de validación
 *       200:
 *         description: Usuario logueado con éxito
 *       400:
 *         description: Error de validación
 * /current:
 *   get:
 *     summary: Obtiene la información del usuario actual
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Información del usuario actual
 */

import { Router } from "express";
import sessionsController from "../controllers/session.controller";
const router = Router();

router.post("/register", sessionsController.register);
router.post("/login", sessionsController.login);
router.get("/current", sessionsController.current);
router.get("/unprotectedLogin", sessionsController.unprotectedLogin);
router.get("/unprotectedCurrent", sessionsController.unprotectedCurrent);

export default router;
