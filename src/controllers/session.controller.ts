import { Request } from "express";
import User from "../../models/Users";
import jwt from "jsonwebtoken";
// import { createHash, passwordValidation } from "../../utils/index.js";
import { UserDTO } from "../../types/types.js";
import bcrypt from "bcrypt";

export const createHash = async (password: string) => {
  const salts = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salts);
};
export const passwordValidation = async (user: any, password: string) =>
  bcrypt.compare(password, user.password);

const register = async (req: Request, res: any) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res
        .status(400)
        .send({ status: "error", error: "Incomplete values" });
    const exists = await User.findOne({ email: email });
    if (exists)
      return res
        .status(400)
        .send({ status: "error", error: "User already exists" });
    const hashedPassword = await createHash(password);
    const user = {
      username,
      email,
      password: hashedPassword,
    };
    const result = await User.create(user);
    // console.log(result);
    res.status(201).send({ status: "success", payload: result._id });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", message: "Error registering", error });
  }
};

const login = async (req: Request, res: any) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send({ status: "error", error: "Incomplete values (email and password)" });
  }
  const user = await User.findOne({ email: email });
  if (!user)
    return res
      .status(404)
      .send({ status: "error", error: "User doesn't exist" });
  const isValidPassword = await passwordValidation(user, password);
  if (!isValidPassword) {
    return res
      .status(400)
      .send({ status: "error", error: "Incorrect password" });
  }

  const userDto: UserDTO = {
    username: user.username ?? "",
    email: user.email ?? "",
    role: user.role === "admin" ? "admin" : "user",
  };

  const token = jwt.sign(userDto, "tokenSecretJWT", { expiresIn: "1h" });
  res
    .status(200)
    .cookie("coderCookie", token, { maxAge: 3600000 })
    .send({ status: "success", message: "Logged in" });
};

const current = async (req: Request, res: any) => {
  try {
    const cookie = req.cookies["coderCookie"];
    const user = jwt.verify(cookie, "tokenSecretJWT");
    if (user) return res.send({ status: "success", payload: user });
  } catch (error) {
    res.status(401).send({ status: "error", message: "invalid token" });
  }
};

const unprotectedLogin = async (req: Request, res: any) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send({ status: "error", error: "Incomplete values" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .send({ status: "error", error: "User doesn't exist" });
  }
  const isValidPassword = await passwordValidation(user, password);
  if (!isValidPassword) {
    return res
      .status(400)
      .send({ status: "error", error: "Incorrect password" });
  }
  const token = jwt.sign({ email: user.email }, "tokenSecretJWT", {
    expiresIn: "1h",
  });
  res
    .cookie("unprotectedCookie", token, { maxAge: 3600000, httpOnly: true })
    .send({ status: "success", message: "Unprotected Logged in" });
};

const unprotectedCurrent = async (req: Request, res: any) => {
  try {
    const cookie = req.cookies["unprotectedCookie"];
    const user = jwt.verify(cookie, "tokenSecretJWT");
    if (user) {
      return res.send({ status: "success", payload: user });
    }
  } catch (error) {
    res.status(401).send({ status: "error", error: "Invalid token" });
  }
};
export default {
  current,
  login,
  register,
  unprotectedLogin,
  unprotectedCurrent,
};
