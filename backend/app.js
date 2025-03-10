//PASO 1

//Importar la libreia de express
import express from "express";

//Creo una constante que es igual
//a la libreria que importe y la ejecuta
const app = express();

//PASO 5
//Definir la ruta
app.use("/api/products");

//exporta la constante para poder usar express en otros lados
export default app;

