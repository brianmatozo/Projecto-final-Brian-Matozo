import { Request, Response } from "express";
import Adoption from "../../models/Adoption";
import User from "../../models/Users";
import Pet from "../../models/Pets";
import logger from "../../utils/logger";

const getAllAdoptions = async (_req: Request, res: Response) => {
  try {
    const result = await Adoption.find().populate("pet user");
    res.send({ status: "success", payload: result });
  } catch (error) {
    logger.error("Error getting all adoptions", error);
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
    logger.error("Error fetching adoption by id", error);
    res.status(500).send({ status: "error", message: "Error fetching adoption", error });
  }
};

const createAdoption = async (req: Request, res: any) => {
  const { uid, pid } = req.params;
  try {
    const user = await User.findById({ _id: uid});
    if (!user) {
      logger.warning("User not found");
      return res.status(404).send({ status: "error", error: "user Not found" });
    }

    const pet = await Pet.findById({ _id: pid });
    if (!pet) {
      logger.warning("Pet not found");
      return res.status(404).send({ status: "error", error: "Pet not found" });
    }
    if (pet.adopted) {
      logger.warning("Pet is already adopted");
      return res
        .status(400)
        .send({ status: "error", error: "Pet is already adopted" });
    }
    user.pets.push(pet._id);
    await user.save();
    logger.debug("User updated", user);
    pet.adopted = true;
    pet.owner = user._id;
    await pet.save();

    const adoption = await Adoption.create({ pet: pet._id, user: user._id });
    logger.debug("Adoption created", adoption);
    res.send({ status: "success", message: "Pet adopted", payload: adoption });
  } catch (error) {
    logger.error("Error creating adoption", error);
    res
      .status(500)
      .send({ status: "error", message: "Error creating adoption", error });
  }
};

export default {
  createAdoption,
  getAllAdoptions,
  getAdoption,
};
