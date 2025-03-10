//PASO 8
//aqui se van a crear los metodos como tal, se define que es lo que va a hacer cada metodo

//array de funciones del CRUD
const productsController = {};
import { json } from "express/lib/response";
import productsModel from "../models/Products.js";

//S E L E C T
productsController.getProducts = async (req, res) => {
    const products = await productsModel.find();
    res.json(products)
}

// I N S E R T
productsController.insertProducts = async (req, res) => {
    //campos que se van a solicitar en el nuevo esquema creado
    const {name, description, price, stock } = req.body;
    //datos con los que se va a llenar el esquema que creamos
    const newProduct = new productsModel({name, description, price, stock});
    await newProduct.save();
    res.json({message: "Product saved"});
}

// U P D A T E 
productsController.updateProducts = async (req, res) => {
    const {name, description, price, stock} = req.body;
    const updateProduct = new productsModel.findByIdAndUpdate(
        req.paramas.id, {name, description, price, stock} , {new : true}
    );
    res.json({message: "Product updated"});
}

// D E L E T E
productsController.deleteProducts = async (req, res) => {
    await productsModel.findById(req.params.id);
    res,json({message: "Product deleted"})

}

export default productsController;