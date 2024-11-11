import { Request, Response } from "express";
import Adoption from "../../models/Adoption";
import User from "../../models/Users";
import Pet from "../../models/Pets";

const getAllAdoptions = async (_req: Request, res: Response) => {
  try {
    const result = await Adoption.find().populate("pet user");
    res.send({ status: "success", payload: result });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", message: "Error obteniendo adoptions", error });
  }
};

const getAdoption = async (req: Request, res: any) => {
  const adoptionId = req.params.aid;
  try {
    const adoption = await Adoption.findById(adoptionId).populate("pet user");
    if (!adoption) {
      return res.status(404).send({ status: "error", error: "Adoption not found" });
    }
    res.send({ status: "success", payload: adoption });
  } catch (error) {
    res.status(500).send({ status: "error", message: "Error fetching adoption", error });
  }
};

const createAdoption = async (req: Request, res: any) => {
  const { uid, pid } = req.params;
  try {
    const user = await User.findById({ _id: uid});
    if (!user) {
      return res.status(404).send({ status: "error", error: "user Not found" });
    }

    const pet = await Pet.findById({ _id: pid });
    if (!pet) {
      return res.status(404).send({ status: "error", error: "Pet not found" });
    }
    if (pet.adopted) {
      return res
        .status(400)
        .send({ status: "error", error: "Pet is already adopted" });
    }
    user.pets.push(pet._id);
    await user.save();

    pet.adopted = true;
    pet.owner = user._id;
    await pet.save();

    const adoption = await Adoption.create({ pet: pet._id, user: user._id });

    res.send({ status: "success", message: "Pet adopted", payload: adoption });
  } catch (error) {}
};

export default {
  createAdoption,
  getAllAdoptions,
  getAdoption,
};
