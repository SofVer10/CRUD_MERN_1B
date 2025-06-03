import faqsModel from "../models/faqs.js";

const faqsController = {};

//SELECT
faqsController.getFaqs = async (req, res) => {
    try {
        const faqs = await faqsModel.find();
    res.status(200).json(faqs);
    res.json(faqs)

    } catch (error) {
        console.log("error"+error)
        res.status(400).json({message: "Error interno del servidor" + error})
        
    }
}


//INSERT
faqsController.insertFaqs = async (req, res) => {
    try {
        //campos que se van a solicitar en el nuevo esquema creado
    const {question, answer, level, isActive} = req.body;

    if(level <1 || level >5){
        return res.status(400).json({message: "Ingrese nivel entre 1 y 5"})
    }

    //Validación de campos vacíos
    if(!question || !answer || !level || !isActive){
        return res.status(400).json({message: "Ingrese los datos"})
    }

    //Validación de longitud
    if(question.length <4 || answer.length < 4){
        return res.status(400).json({message: "Ingrese más letras"})
    }


    //datos con los que se va a llenar el esquema que creamos
    const newFaqs = new faqsModel({question, answer, level, isActive});
    await newFaqs.save();
    res.json({message: "Faqs saved"});
        
    } catch (error) {
        
    }
}

//UPDATE
faqsController.updateFaqs = async (req, res) => {
   try {

    const  {question, answer, level, isActive} = req.body;

    if(level <1 || level >5){
        return res.status(400).json({message: "Ingrese nivel entre 1 y 5"})
    }

    //Validación de campos vacíos
    if(!question || !answer || !level || !isActive){
        return res.status(400).json({message: "Ingrese los datos"})
    }

    //Validación de longitud
    if(question.length <4 || answer.length < 4){
        return res.status(400).json({message: "Ingrese más letras"})
    }


    const updateFaqs = await faqsModel.findByIdAndUpdate(
        req.params.id, {question, answer, level, isActive}, {new : true}
    );
    res.json({message: "Faqs updated"});
    
   } catch (error) {
    
   }
}

//DELETE
faqsController.deleteFaqs = async (req, res) => {
    await faqsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Faqs deleted"});

}

export default faqsController;