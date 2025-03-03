import mongoose from "mongoose";

//Guardo en una especie de constante la dirección de mi base de datos
const URI = "mongodb://localhost:27017/PepsiDB"

//Conectar la base de datos 
mongoose.connect(URI)

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

