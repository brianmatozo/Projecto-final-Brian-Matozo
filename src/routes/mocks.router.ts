// import express, { Request, Response } from "express";
// import { faker } from '@faker-js/faker';
// import bcrypt from "bcrypt";
// import User from "../../models/Users";
// import Pet from "../../models/Pets";
// import { GenerateDataRequestBody, PetType, UserType } from "../../types/types";

// const router = express.Router();

// const generateUsers = async (numUsers: number): Promise<UserType[]> => {
//   // console.log(`Generando ${numUsers} usuarios...`);
//   const users: UserType[] = [];
//   const hashedPassword = await bcrypt.hash("coder123", 10);

//   for (let i = 0; i < numUsers; i++) {
//     users.push({
//       username: faker.internet.username(),
//       email: faker.internet.email(),
//       password: hashedPassword,
//       role: Math.random() > 0.5 ? "user" : "admin",
//       pets: [],
//     });
//   }
//   // console.log('Users generados:', users);
//   return users;
// };

// // Función para generar mascotas
// const generatePets = (numPets: number): PetType[] => {
//   // console.log(`Generando ${numPets} mascotas...`);
//   const pets: PetType[] = [];

//   for (let i = 0; i < numPets; i++) {
//     console.log(`Generando mascota ${i + 1}...`);
//     pets.push({
//       name: faker.animal.dog(),
//       type: "dog",
//       age: faker.number.int({ min: 1, max: 15 }),
//       owner: faker.internet.username(),
//     });
//   }
//   console.log("Mascotas generadas:", pets);
//   return pets;
// };

// // mockingusers para generar 50 usuarios
// router.get("/mockingusers", async (_req: Request, res: Response) => {
//   try {
//     const users = await generateUsers(50);
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Error al generar usuarios", error });
//   }
// });


// router.post("/generateData", async (req, res: any) => {
//   const { users, pets } = req.body as GenerateDataRequestBody;

//   if (!users || !pets) {
//     return res.status(400).json({ message: "Debe proporcionar cantidades para users y pets." });
//   }

//   try {
//     const generatedUsers = await generateUsers(users);
//     const insertedUsers = await User.insertMany(generatedUsers);

//     const generatedPets = generatePets(pets);
//     const insertedPets = await Pet.insertMany(generatedPets);

//     res.status(201).json({
//       message: "Datos generados exitosamente",
//       users: insertedUsers,
//       pets: insertedPets,
//     });
//   } catch (error) {
//     console.error("Error al generar o insertar datos:", error);
//     res.status(500).json({ message: "Error al generar datos", error });
//   }
// });

// // verificar los usuarios insertados
// router.get("/users", async (_req: Request, res: Response) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Error al obtener usuarios", error });
//   }
// });

// // verificar las mascotas insertadas
// router.get("/pets", async (_req: Request, res: Response) => {
//   try {
//     const pets = await Pet.find();
//     res.json(pets);
//   } catch (error) {
//     res.status(500).json({ message: "Error al obtener mascotas", error });
//   }
// });

// export default router;



// src/routes/mocks.router.ts

import express from "express";
import {
  mockingUsers,
  generateData,
  getUsers,
  getPets,
} from "../controllers/mocks.controller";

const router = express.Router();

// Define routes and connect them to controller functions
router.get("/mockingusers", mockingUsers);
router.post("/generateData", generateData);
router.get("/users", getUsers);
router.get("/pets", getPets);

export default router;
