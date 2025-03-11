//PASO 8
//aqui se van a crear los metodos como tal, se define que es lo que va a hacer cada metodo

//array de funciones del CRUD
const localsController = {};
import localsModel from "../models/Locals.js";

//S E L E C T
localsController.getLocals = async (req, res) => {
    const locals = await localsModel.find();
    res.json(locals)
}

// I N S E R T
localsController.insertLocals = async (req, res) => {
    //campos que se van a solicitar en el nuevo esquema creado
    const {name, address, telephone, schedule} = req.body;
    //datos con los que se va a llenar el esquema que creamos
    const newLocals = new localsModel({name, address, telephone, schedule});
    await newLocals.save();
    res.json({message: "Locals saved"});
}

// U P D A T E 
localsController.updateLocals = async (req, res) => {
    const  {name, address, telephone, schedule} = req.body;
    const updateLocals = await localsModel.findByIdAndUpdate(
        req.params.id, {name, address, telephone, schedule}, {new : true}
    );
    res.json({message: "Locals updated"});
}

// D E L E T E
localsController.deleteLocals = async (req, res) => {
    await localsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Locals deleted"});

}

export default localsController;