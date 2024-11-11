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
  birthDate: Date;
  adopted: boolean;
  owner: string;
  image: string;
}

interface AdoptionType {
  pet: PetType;
  user: UserType;
}

interface GenerateDataRequestBody {
  users: number;
  pets: number;
}

export { UserType, PetType, GenerateDataRequestBody, AdoptionType };
