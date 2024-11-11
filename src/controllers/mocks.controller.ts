// src/controllers/mock.controller.ts

import { faker } from '@faker-js/faker';
import bcrypt from "bcrypt";
import User from "../../models/Users";
import Pet from "../../models/Pets";
import { GenerateDataRequestBody, PetType, UserType } from "../../types/types";
import { Request, Response } from 'express';

export const generateUsers = async (numUsers: number): Promise<UserType[]> => {
  const users: UserType[] = [];
  const hashedPassword = await bcrypt.hash("coder123", 10);

  for (let i = 0; i < numUsers; i++) {
    users.push({
      username: faker.internet.username(),
      email: faker.internet.email(),
      password: hashedPassword,
      role: Math.random() > 0.5 ? "user" : "admin",
      pets: [],
    });
  }
  return users;
};

export const generatePets = (numPets: number): PetType[] => {
  const pets: PetType[] = [];

  for (let i = 0; i < numPets; i++) {
    pets.push({
      name: faker.animal.dog(),
      type: "dog",
      age: faker.number.int({ min: 1, max: 15 }),
      birthDate: faker.date.past(),
      adopted: false,
      owner: faker.internet.username(),
      image: faker.image.avatar(),
    });
  }
  return pets;
};

export const generateData = async (req: Request, res: any) => {
  const { users, pets } = req.body as GenerateDataRequestBody;

  if (!users || !pets) {
    return res.status(400).json({ message: "Debe proporcionar cantidades para users y pets." });
  }

  try {
    const generatedUsers = await generateUsers(users);
    const insertedUsers = await User.insertMany(generatedUsers);

    const generatedPets = generatePets(pets);
    const insertedPets = await Pet.insertMany(generatedPets);

    return res.status(201).json({
      message: "Datos generados exitosamente",
      users: insertedUsers,
      pets: insertedPets,
    });
  } catch (error) {
    console.error("Error al generar o insertar datos:", error);
    return res.status(500).json({ message: "Error al generar datos", error });
  }
};

export const mockingUsers = async (_req: Request, res: Response) => {
  try {
    const users = await generateUsers(50);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al generar usuarios", error });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};

export const getPets = async (_req: Request, res: Response) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener mascotas", error });
  }
};
