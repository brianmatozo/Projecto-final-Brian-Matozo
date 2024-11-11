import { Request, Response } from "express";
import Adoption from "../../models/Adoption";
import User from "../../models/Users";
import Pet from "../../models/Pets";

const getAllAdoptions = async (_req: Request, res: Response) => {
  const result = await Adoption.find();
  res.send({ status: "success", payload: result });
};

const getAdoption = async (req: Request, res: any) => {
  const adoptionId = req.params.aid;
  const adoption = await Adoption.findById({ _id: adoptionId });
  if (!adoption)
    return res
      .status(404)
      .send({ status: "error", error: "Adoption not found" });
  res.send({ status: "success", payload: adoption });
};

const createAdoption = async (req: Request, res: any) => {
  const { uid, pid } = req.params;
  const user = await User.findById(uid);
  if (!user)
    return res.status(404).send({ status: "error", error: "user Not found" });
  const pet = await Pet.findById({ _id: pid });
  if (!pet)
    return res.status(404).send({ status: "error", error: "Pet not found" });
  if (pet.adopted)
    return res
      .status(400)
      .send({ status: "error", error: "Pet is already adopted" });
  user.pets.push(pet._id);
  await User.updateOne(user._id, { pets: user.pets });
  await Pet.updateOne(pet._id, { adopted: true, owner: user._id });
  await Adoption.create({ owner: user._id, pet: pet._id });
  res.send({ status: "success", message: "Pet adopted" });
};

export default {
  createAdoption,
  getAllAdoptions,
  getAdoption,
};
