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
    },
    emailAdmin: {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
    },
    emailClient: {
        email_user: process.env.EMAIL_USER,
        email_pass: process.env.EMAIL_PASS
    }
}

