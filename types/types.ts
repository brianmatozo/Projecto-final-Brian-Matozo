interface UserType {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  pets: PetType[];
}

interface PetType {
  name: string;
  type: string;
  age: number;
  owner: string;
}

interface GenerateDataRequestBody {
  users: number;
  pets: number;
}

export { UserType, PetType, GenerateDataRequestBody };
