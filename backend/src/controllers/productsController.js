//PASO 8
//aqui se van a crear los metodos como tal, se define que es lo que va a hacer cada metodo

//array de funciones del CRUD
const productsController = {};
import productsModel from "..models/Products.js";

//S E L E C T
productsController.getProducts = async (req, res) => {
    const products = await productsModel.find()
    res.json(products)
}

// I N S E R T
