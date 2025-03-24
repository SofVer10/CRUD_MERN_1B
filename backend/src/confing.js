import dotenv from "dotenv";

//Ejecutamos la libreria para acceder a los datos del .env
dotenv.config();

export const config = {
    db: {
        URI: process.env.DB_URI,
    },
    server: {
        port: process.env.PORT,
    },
    JWT:{
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES
    }
}