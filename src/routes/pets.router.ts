// src/routes/pets.router.ts
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