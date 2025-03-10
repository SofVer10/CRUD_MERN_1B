//PASO 1

//Importar la libreia de express
import express from "express";

//PASO 9 
// esta linea es para cuando ya se hayan credo los metodos
import productsRoutes from "./src/routes/products.js"

//PASO 1 (Continuación)
//Creo una constante que es igual
//a la libreria que importe y la ejecuta
const app = express();

//PASO 10
//uso un middleware para que acepte datos JSON
app.use(express.json());

//PASO 5
//Definir la ruta
app.use("/api/products", productsRoutes);

//exporta la constante para poder usar express en otros lados
export default app;

