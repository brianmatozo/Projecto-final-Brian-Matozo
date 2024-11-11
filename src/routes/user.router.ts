/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene una lista de usuarios
 *     tags: [Users]
 *     responses:
 *       200:     
 *         description: Lista de usuarios
 *         content: 
 *           application/json:
 *             schema:  
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/User'
 * /{uid}:
 *   get:
 *     summary: Obtiene un usuario por su ID
 *     tags: [Users]
 *     parameters:
 *       - name: uid
 *         in: path 
 *         description: ID del usuario
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado    
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/User'
 * /{uid}:
 *   put:
 *     summary: Actualiza un usuario por su ID
 *     tags: [Users]
 *     parameters:
 *       - name: uid
 *         in: path 
 *         description: ID del usuario  
 *         required: true
 *         schema:
 *           type: string
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:     
 *             $ref: '#/components/schemas/User'
 *     responses:   
 *       200:
 *         description: Usuario actualizado con exito    
 * /{uid}:
 *   delete:
 *     summary: Elimina un usuario por su ID
 *     tags: [Users]
 *     parameters:
 *       - name: uid     
 *         in: path 
 *         description: ID del usuario
 *         required: true
 *         schema:
 *           type: string
 *     responses:   
 *       200:
 *         description: Usuario eliminado con exito 
 */

import { Router } from 'express';
import usersController from '../controllers/user.controller';
const router = Router();

router.get('/',usersController.getAllUsers);
router.get('/:uid',usersController.getUser);
router.put('/:uid',usersController.updateUser);
router.delete('/:uid',usersController.deleteUser);


export default router;