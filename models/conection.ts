import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import logger from "../utils/logger";

const conection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string);
        logger.debug("Conexion Exitosa");
    } catch (error) {
        logger.error("Error al conectar a la base de datos", error);
    }
};
export default conection;