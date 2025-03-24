//como vamos a validar si el cliente o empleado, entonces importo ambos modelos

import CustomersModel from "../models/Clients.js"
import EmployesModel from "../models/Employees.js"
import bcryptjs from "bcryptjs"; //Lib. para encriptar
import  JsonWebToken  from "jsonwebtoken"; //Lib. para generar token
import {config} from "../confing.js";

const loginController = {};

loginController.login = async (req, res) => {
    const {email, password } = req.body;

    try{

        //Validamos los 3 posibles niveles 
        //1. Admin, 2. Empleado, 3. Cliente

        let userFound; //Variable que dice si encontramos al usuario
        let userType; //Variable que dice que tipo de usuario es 

        //1. Admin
        //Verifiquemos si quien esta ingresando es admin
        //=== significa que tiene que ser estrictamente igual

        if(email === config.emailAdmin.email && password === config.emailAdmin.password){
            userType = "Admin"
            userFound = {_id: "Admin"}
        }else{
            //2. Empleado
            userFound = await EmployesModel.findOne({email});
            userType = "Employee";

            //3. Clientes
            if(!userFound){
                userFound = await CustomersModel.findOne({email});
                userType = "Customer"
            }
        }

        //Si no se encuentra al usuario en ningún lado
        if(!userFound){
            return res.json({message: "User not found"})
        }

        //Si no es administrador validamos la contraseña
        if(userType != "Admin"){
            const isMach = bcryptjs.compare(password, userFound.password);
            if(!isMach){
                return res.json({message: "Invalid password"})
            }
        }

        //Generar token
        JsonWebToken.sign(
            //1. Que voy a guardar
            {id: userFound._id, userType},
            //2. Secreto
            config.JWT.secret,
            //3. Cuando expira
            {expiresIn: config.JWT.expiresIn},
            //4. Función flecha (error, token)
            (error, token) => {
                if(error) console.log(error)
                res.cookie("authToken", token)
            }
            )
        }


    catch(error){
        console.log(error)
    }
}
 export default loginController;
