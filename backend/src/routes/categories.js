//PASO 6
//En este archivo dentro de la carpeta routes,
//vamos a colocar, que metodos tiene la ruta "/api/products"

import express from "express";
import categoriesController from "../controllers/categoriesController.js";

//Función que ayuda a crear metodos
const router = express.Router();

//PASO 9 (Agregar las rutas de los metodos que se van a utilizar)

//Se conecta automaticamente a la ruta con solo colocar "/"
router.route("/")
.get(categoriesController.getCategories)
.post(categoriesController.insertcategories)

//Actualizar y eliminar utilizan id por eso la ruta es diferente
router.route("/:id")
.put(categoriesController.updateCategories)
.delete(categoriesController.deleteCategories);

export default router;