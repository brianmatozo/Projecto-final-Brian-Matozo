import { Request, Response } from "express";
import Pet from "../../models/Pets";
import { PetType } from "../../types/types";
import { Types } from "mongoose";
// import { faker } from "@faker-js/faker";

const getPetInputFrom = (input: {
  name: string;
  type: string;
  age: number;
  birthDate: Date;
  image?: string;
}): PetType => {
  return {
    name: input.name,
    type: input.type,
    age: 0,
    birthDate: input.birthDate,
    image: input.image, // Optional image
  };
};

const getAllPets = async (_req: Request, res: Response) => {
  try {
    const pets: PetType[] = await Pet.find();
    res.send({ status: "success", payload: pets });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", message: "Error fetching pets", error });
  }
};

const createPet = async (req: Request, res: any) => {
  const { name, type, age, birthDate, image } = req.body;
  if (!name || !type || !birthDate)
    return res
      .status(400)
      .send({ status: "error", error: "Incomplete values" });
  const pet: PetType = getPetInputFrom({age, name, type, birthDate, image});
  const result = await Pet.create(pet);
  res.send({ status: "success", payload: result });
};

const updatePet = async (req: Request, res: Response) => {
  const petUpdateBody:PetType = req.body; 
  const petId:Types.ObjectId = req.params.pid as unknown as Types.ObjectId;

  const result = await Pet.updateOne({_id: petId}, petUpdateBody);
  
  res.send({ status: "success", message: "pet updated", payload: result });
};

const deletePet = async (req: Request, res: Response) => {
  const petId:Types.ObjectId = req.params.pid as unknown as Types.ObjectId;
  const result = await Pet.deleteOne({_id: petId});
  res.send({ status: "success", message: "pet deleted", payload: result });
};

const createPetWithImage = async (req: Request, res: any) => {
  const file = req.file;
  const { name, type, age, birthDate } = req.body;
  if (!name || !type || !age || !birthDate)
    return res
      .status(400)
      .send({ status: "error", error: "Incomplete values" });
  // console.log(file);

  if(!file){
    return res
      .status(400)
      .send({ status: "error", error: "No file uploaded" });
  }

  const pet: PetType = getPetInputFrom({
    name,
    type,
    age,
    birthDate,
    image: `${__dirname}/../public/img/${file.filename}`,
  });
  // console.log(pet);
  const result = await Pet.create(pet);
  res.send({ status: "success", payload: result });
};
export default {
  getAllPets,
  createPet,
  updatePet,
  deletePet,
  createPetWithImage
};
