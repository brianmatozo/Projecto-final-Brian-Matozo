import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const conection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log("Conexion Exitosa");
    } catch (error) {
        console.log("Error al conectar a la base de datos", error);
    }
};
export default conection;