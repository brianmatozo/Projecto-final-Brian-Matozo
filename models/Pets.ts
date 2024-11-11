import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },          // Specify `type` explicitly
  type: { type: String, required: true },
  age: { type: Number },
  birthDate: { type: Date },
  adopted: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Referencing `User`
  image: { type: String },                                    // Optional image field
});

const Pet = mongoose.model("Pet", petSchema);

export default Pet;
