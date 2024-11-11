/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene una lista de adopciones
 *     tags: [Adoptions]     
 *     responses:
 *       200:
 *         description: Lista de adopciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Adoption'
 * /{aid}:
 *   get:
 *     summary: Obtiene una adopcion por su ID
 *     tags: [Adoptions]
 *     parameters:
 *       - name: aid
 *         in: path
 *         description: ID de la adopcion
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Adopcion encontrada
 *         content:
 *           application/json:  
 *             schema:
 *               $ref: '#/components/schemas/Adoption'  
 * /:
 *   post:
 *     summary: Registra una solicitud de adopción
 *     tags: [Adoptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               petId:
 *                 type: string
 *                 description: ID de la mascota a adoptar
 *               userId:
 *                 type: string
 *                 description: ID del usuario que solicita la adopción
 *     responses:
 *       201:
 *         description: Adopción registrada
 *       400:
 *         description: Error en la solicitud
 */
import { Router} from 'express';
import adoptionsController from '../controllers/adoption.controller';
const router = Router();

router.get('/',adoptionsController.getAllAdoptions);
router.get('/:aid',adoptionsController.getAdoption);
router.post('/:uid/:pid',adoptionsController.createAdoption);

export default router;