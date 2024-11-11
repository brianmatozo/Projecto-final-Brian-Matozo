import { Request, Response } from "express";
import User from "../../models/Users";

const getAllUsers = async (_req:Request, res:Response) => {
  const users = await User.find();
  res.send({ status: "success", payload: users });
};

const getUser = async (req:Request, res:any) => {
  const userId = req.params.uid;
  const user = await User.findById({_id: userId });
  if (!user)
    return res.status(404).send({ status: "error", error: "User not found" });
  res.send({ status: "success", payload: user });
};

const updateUser = async (req:Request, res:any) => {
  const updateBody = req.body;
  const userId = req.params.uid;
  const user = await User.findById({_id: userId });
  if (!user)
    return res.status(404).send({ status: "error", error: "User not found" });
  const result = await User.updateOne({ _id: userId}, updateBody);
  res.send({ status: "success", message: "User updated", payload: result });
};

const deleteUser = async (req:Request, res:Response) => {
  const userId = req.params.uid;
  const result = await User.deleteOne({ _id: userId });
  res.send({ status: "success", message: "User deleted", payload: result });
};

export default {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
};
