//PASO 8
//aqui se van a crear los metodos como tal, se define que es lo que va a hacer cada metodo

//array de funciones del CRUD
const clientsController = {};
import clientsModel from "../models/Clients.js";

//S E L E C T
clientsController.getclients = async (req, res) => {
    const clients = await clientsModel.find();
    res.json(clients)
}

// I N S E R T
clientsController.insertClients = async (req, res) => {
    //campos que se van a solicitar en el nuevo esquema creado
    const {name, lastName, birthday, email, password, telephone, dui, isVerified} = req.body;
    //datos con los que se va a llenar el esquema que creamos
    const newClients = new clientsModel({name, lastName, birthday, email, password, telephone, dui, isVerified});
    await newClients.save();
    res.json({message: "Clients saved"});
}

// U P D A T E 
clientsController.updateClients = async (req, res) => {
    const  {name, lastName, birthday, email, password, telephone, dui, isVerified} = req.body;
    const updateClients = await clientsModel.findByIdAndUpdate(
        req.params.id, {name, lastName, birthday, email, password, telephone, dui, isVerified}, {new : true}
    );
    res.json({message: "Clients updated"});
}

// D E L E T E
clientsController.deleteClients = async (req, res) => {
    await clientsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Client deleted"});

}

export default clientsController;