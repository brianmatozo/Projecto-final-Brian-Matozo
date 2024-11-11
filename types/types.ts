// src/types/types.ts

import { Types } from "mongoose";

interface UserType {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  pets: (PetType[] | Types.ObjectId)[];
}

interface PetType {
  name: string;
  type: string;
  age: number;
  birthDate: Date;
  adopted?: boolean;
  owner?: Types.ObjectId | null;
  image?: string;
}

interface AdoptionType {
  pet: PetType | Types.ObjectId;
  user: UserType | Types.ObjectId;
}

interface GenerateDataRequestBody {
  users: number;
  pets: number;
}

export { UserType, PetType, GenerateDataRequestBody, AdoptionType };
