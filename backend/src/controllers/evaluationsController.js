//PASO 8
//aqui se van a crear los metodos como tal, se define que es lo que va a hacer cada metodo

//array de funciones del CRUD
const evaluationsController = {};
import evaluationsModel from "../models/Evaluations.js";

//S E L E C T
evaluationsController.getEvaluations = async (req, res) => {
    const evaluations = await evaluationsModel.find().populate("IdEmpleado");
    res.json(evaluations)
}

// I N S E R T
evaluationsController.insertEvaluations = async (req, res) => {
    //campos que se van a solicitar en el nuevo esquema creado
    const {comment, grade, role, IdEmpleado} = req.body;
    //datos con los que se va a llenar el esquema que creamos
    const newEvaluations = new evaluationsModel({comment, grade, role, IdEmpleado});
    await newEvaluations.save();
    res.json({message: "Evaluations saved"});
}

// U P D A T E 
evaluationsController.updateEvaluations = async (req, res) => {
    const  {comment, grade, role, IdEmpleado} = req.body;
    const updateEvaluations = await evaluationsModel.findByIdAndUpdate(
        req.params.id, {comment, grade, role, IdEmpleado}, {new : true}
    );
    res.json({message: "Evaluations updated"});
}

// D E L E T E
evaluationsController.deleteevaluations = async (req, res) => {
    await evaluationsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Evaluations deleted"});

}

export default evaluationsController;