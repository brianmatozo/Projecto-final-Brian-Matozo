// src/routes/pets.router.ts
/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene una lista de mascotas
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: Lista de mascotas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 * /:{pid}:
 *   get:
 *     summary: Obtiene una mascota por su ID
 *     tags: [Pets]
 *     parameters:
 *       - name: pid
 *         in: path
 *         description: ID de la mascota
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mascota encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       404:
 *         description: Mascota no encontrada
 * /:
 *   post:
 *     summary: Crea una nueva mascota
 *     tags: [Pets] 
 *     requestBody:
 *       required: true 
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet' 
 *     responses:
 *       201:
 *         description: Mascota creada con exito 
 *       400:
 *         description: Error en la solicitud   
 * /withimage:
 *   post:
 *     summary: Crea una nueva mascota con imagen
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:   
 *       201:
 *         description: Mascota creada con exito     
 *       400:
 *         description: Error en la solicitud   
 * /{pid}:
 *   put:
 *     summary: Actualiza una mascota por su ID
 *     tags: [Pets]
 *     parameters:
 *       - name: pid
 *         in: path
 *         description: ID de la mascota    
 *         required: true
 *         schema:  
 *           type: string
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:     
 *             $ref: '#/components/schemas/Pet'
 *     responses:
 *       200:
 *         description: Mascota actualizada con exito
 *       400:
 *         description: Error en la solicitud
 *       404:
 *         description: Mascota no encontrada
 * /{pid}:
 *   delete:
 *     summary: Elimina una mascota por su ID
 *     tags: [Pets] 
 *     parameters:
 *       - name: pid     
 *         in: path
 *         description: ID de la mascota    
 *         required: true
 *         schema:  
 *           type: string
 *     responses:   
 *       200:
 *         description: Mascota eliminada con exito     
 *       404:
 *         description: Mascota no encontrada
 */

import { Router } from 'express';
import petsController from '../controllers/pets.controller';
import uploader from '../../utils/uploader';
const router = Router();

router.get('/',petsController.getAllPets);
router.get('/:pid',petsController.getPetById);
router.post('/',petsController.createPet);
router.post('/withimage',uploader.single('image'), petsController.createPetWithImage);
router.put('/:pid',petsController.updatePet);
router.delete('/:pid',petsController.deletePet);

export default router;