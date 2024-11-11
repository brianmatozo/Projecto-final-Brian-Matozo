// src/controllers/mock.controller.ts

import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import User from "../../models/Users";
import Pet from "../../models/Pets";
import { GenerateDataRequestBody, PetType, UserType } from "../../types/types";
import { Request, Response } from "express";
import { Types } from "mongoose";
import logger from "../../utils/logger";

const generateUsers = async (numUsers: number) => {
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
  const insertedUsers = await User.insertMany(users);
  return insertedUsers.map((user) => user._id);
};

const generatePets = (numPets: number, userIds?: string[]): PetType[] => {
  const pets: PetType[] = [];
  // const ownerId = userIds?.[Math.floor(Math.random() * userIds.length)];

  for (let i = 0; i < numPets; i++) {
    const owner =
      userIds && userIds.length > 0
        ? new Types.ObjectId(
            userIds[Math.floor(Math.random() * userIds.length)]
          )
        : null;
    pets.push({
      name: faker.animal.dog(),
      type: "dog",
      age: faker.number.int({ min: 1, max: 15 }),
      owner,
      birthDate: faker.date.past(),
      adopted: false,
      image: faker.image.avatar(),
    });
  }
  return pets;
};

export const generateData = async (req: Request, res: any) => {
  const { users, pets } = req.body as GenerateDataRequestBody;

  if (!users || !pets) {
    return res
      .status(400)
      .json({ message: "Debe proporcionar cantidades para users y pets." });
  }

  try {
    const userIds = (await generateUsers(users)).map((id) => id.toString());
    const generatedPets = generatePets(pets, userIds);
    const insertedPets = await Pet.insertMany(generatedPets);

    logger.debug("datos generados exitosamente", {
      users: userIds,
      pets: insertedPets,
    });
    return res.status(201).json({
      message: "Datos generados exitosamente",
      users: userIds,
      pets: insertedPets,
    });
  } catch (error) {
    console.error("Error al generar o insertar datos:", error);
    return res.status(500).json({ message: "Error al generar datos", error });
  }
};

export const mockingUsers = async (_req: Request, res: Response) => {
  try {
    const users = await generateUsers(100);
    // logger.debug("users", users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al generar usuarios", error });
  }
};

export const mockingPets = async (_req: Request, res: Response) => {
  try {
    const generatedPets = await generatePets(100);
    // logger.debug("generatedPets", generatedPets);
    const insertedPets = await Pet.insertMany(generatedPets);
    res.json(insertedPets);
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
