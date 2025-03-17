//PASO 3

import mongoose from "mongoose";

//se importan las variables desde el archivo config.js
import {config} from "./src/confing.js"


//Conectar la base de datos 
mongoose.connect(config.db.URI)

//PASO 4

//Comprobar que la base sirve

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("DB is connected");
});

connection.on("disconnected", () => {
    console.log("DB is disconnected");
});

connection.once("error", (error) => {
    console.log("Error found" + error);
});

