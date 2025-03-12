//PASO 8
//aqui se van a crear los metodos como tal, se define que es lo que va a hacer cada metodo

//array de funciones del CRUD
const categoriesController = {};
import categoriesModel from "../models/Categories.js";

//S E L E C T
categoriesController.getCategories = async (req, res) => {
    const categories = await categoriesModel.find();
    res.json(categories)
}

// I N S E R T
categoriesController.insertcategories = async (req, res) => {
    //campos que se van a solicitar en el nuevo esquema creado
    const {name, description, status, image} = req.body;
    //datos con los que se va a llenar el esquema que creamos
    const newCategories = new categoriesModel({name, description, status, image});
    await newCategories.save();
    res.json({message: "Categories saved"});
}

// U P D A T E 
categoriesController.updateCategories = async (req, res) => {
    const  {name, description, status, image} = req.body;
    const updateCategories = await categoriesModel.findByIdAndUpdate(
        req.params.id, {name, description, status, image}, {new : true}
    );
    res.json({message: "Categories updated"});
}

// D E L E T E
categoriesController.deleteCategories = async (req, res) => {
    await categoriesModel.findByIdAndDelete(req.params.id);
    res.json({message: "Categories deleted"});

}

export default categoriesController;