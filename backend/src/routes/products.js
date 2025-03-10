//PASO 6
//En este archivo dentro de la carpeta routes,
//vamos a colocar, que metodos tiene la ruta "/api/products"

import express from "express";
import productsController from "../controllers/productsController.js";

//Función que ayuda a crear metodos
const router = express.Router();

//PASO 9 (Agregar las rutas de los metodos que se van a utilizar)

//Se conecta automaticamente a la ruta con solo colocar "/"
router.route("/")
.get(productsController.getProducts)
.post(productsController.insertProducts)
.put(productsController.updateProducts)
.delete(productsController.deleteProducts);

export default router;