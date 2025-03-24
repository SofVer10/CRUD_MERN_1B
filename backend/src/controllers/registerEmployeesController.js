//Importamos el modelo de la base de datos
import employeesModel from "../models/Employees";
import bcryptjs from "bcryptjs"; //Lib. para encriptar
import  JsonWebToken  from "jsonwebtoken"; //Lib. para generar token
import {config} from "../config.js";

//crear una array de funciones
const registerEmployeesController = {};

registerEmployeesController.register = async (req, res) => {
    //pedimos todos los datos
    const {name, lastName, birthday, email, password, address, hireDate, telephone, dui, isssNumber, isVerified} = req.body;
    
    try{
        //verificamos si el empleado existe
        const existEmployee = await employeesModel.findOne({email});
        if(existEmployee){
            return res.json({message: "Employee already exists"});
        }

        //Hashear o encriptar constraseña
        const passwordHash = await bcryptjs.hash(password, 10); //el "10" significa el proceso de encriptación se va a repetir 10 veces para que sea más seguro
                                                                // tambien se le puede agrgar una letra despues eso se conoce como "Salt and Piper" para más seguridad
        const newEmployees = new employeesModel({name, 
            lastName, 
            birthday, 
            email, 
            password: passwordHash, //para que se mande a llamar la contraseña ya encriptada
            address, 
            hireDate, 
            telephone,
            dui,
            isssNumber, 
            isVerified});

        await newEmployees.save();
         
        //Generar token que valide que ya esta registrado el usuario y puede acceder a todas las páginas
        //TOKEN
        JsonWebToken.sign(
            //1. Que voy a guardar
            {id: newEmployees._id},
            //2. Secreto
            config.JWT.secret,
            //3. Cuando expira
            {expiresIn: config.JWT.expiresIn},
            //4. Función flecha (error, token)
            (error, token) => {
                if(error) console.log(error)
                res.cookie("authToken", token)
            }
            );

    }

    catch (error){
        console.log(error)
        res.json({ message: "Error al registrar empleado"});

    }
    
}

export default registerEmployeesController;


