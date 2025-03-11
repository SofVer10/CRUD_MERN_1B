//PASO 8
//aqui se van a crear los metodos como tal, se define que es lo que va a hacer cada metodo

//array de funciones del CRUD
const employeesController = {};
import employeesModel from "../models/Employees.js";

//S E L E C T
employeesController.getEmployees = async (req, res) => {
    const employees = await employeesModel.find();
    res.json(employees)
}

// I N S E R T
employeesController.insertEmployees = async (req, res) => {
    //campos que se van a solicitar en el nuevo esquema creado
    const {name, lastName, birthday, email, password, address, hireDate, telephone, dui, isssNumber, isVerified} = req.body;
    //datos con los que se va a llenar el esquema que creamos
    const newEmployees = new employeesModel({name, lastName, birthday, email, password, address, hireDate, telephone, dui, isssNumber, isVerified});
    await newEmployees.save();
    res.json({message: "Employees saved"});
}

// U P D A T E 
employeesController.updateEmployees = async (req, res) => {
    const {name, lastName, birthday, email, password, address, hireDate, telephone, dui, isssNumber, isVerified} = req.body;
    const updateEmployees = await  employeesModel.findByIdAndUpdate(
        req.params.id, {name, lastName, birthday, email, password, address, hireDate, telephone, dui, isssNumber, isVerified}, {new : true}
    );
    res.json({message: "Employees updated"});
}

// D E L E T E
employeesController.deleteEmployees = async (req, res) => {
    await employeesModel.findByIdAndDelete(req.params.id);
    res.json({message: "Employees deleted"})

}

export default employeesController;