//Importar el archivo app.js
import app from "./app.js";
import "./database.js";

//PASO 2
//Crear una función que se encargue de ejecutar el servidor 
async function main() {
    const port = 4000;
    app.listen(port);
    console.log("Server is running");
}

//ejecutamos todo
main();