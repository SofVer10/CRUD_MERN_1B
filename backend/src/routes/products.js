//PASO 6
//En este archivo dentro de la carpeta routes,
//vamos a colocar, que metodos tiene la ruta "/api/products"

import express from "express";

//Función que ayuda a crear metodos
const router = express.Router();

//Se conecta automaticamente a la ruta con solo colocar "/"
router.route("/").get()
.post()
.put()
.delete();

export default router;