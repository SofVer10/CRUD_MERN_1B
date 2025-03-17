//Importar el archivo app.js
import app from "./app.js";
import "./database.js";
import {config} from "./src/confing.js"

//PASO 2
//Crear una función que se encargue de ejecutar el servidor 
async function main() {
    app.listen(config.server.port);
    console.log("Server is running");
}

//ejecutamos todo
main();