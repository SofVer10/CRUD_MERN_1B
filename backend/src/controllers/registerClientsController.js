import  jsonwebtoken from "jsonwebtoken"; //Token
import bcrypt from "bcryptjs"; //Encriptar
import nodemailer from "nodemailer"; //Enviar correo
import crypto from "crypto"; //Codigo aleatorio

import clientModel from "../models/Clients.js";
//Config va entre llaves porque se manda a llamar como una constante 
import { config } from "../confing.js";


//Creamos un array de funciones
const registerClientsController = {};

registerClientsController.register = async (req, res) => {
    //Solicitar las cosas que vamos a guardar
    const {name, 
        lastName, 
        birthday,
        email, 
        password,
        telephone, 
        dui,
        isVerified
    }  = req.body;

    try {
        //Verificamos si el cliente ya existe
        const existsClient = await clientModel.findOne({email})
        if(existsClient){
            return res.json({message: "Client already exists"})
        }

        //Encriptar la contraseña
        const passwordHash = await bcrypt.hash(password, 10)

        //Guardamos el cliente en la base de datos
        const newClient = new clientModel({
            name, 
            lastName, 
            birthday, 
            email, 
            password: passwordHash, 
            telephone, 
            dui: dui || null, 
            isVerified: isVerified || false,
        })

        await newClient.save();

        //Generar un código aleatorio que tenga letras y números .toString("hex") sirve para que tambien combine letras en el codigo
        const verifyCodeEmail = crypto.randomBytes(3).toString("hex")

        //Crear el Token
        const tokenCode = jsonwebtoken.sign(
            //1. Que voy a guardar
            {email, verifyCodeEmail},
            //2. Palabra secreta
            config.JWT.secret,
            //3. Cuando expira, expira el codigo en dos horas
            {expiresIn: "2h"}
        )

        res.cookie("VerificationToken", tokenCode, {maxAge: 2*60*60*1000})

        //Enviar el correo electronico
        //1. Transporter => Quien lo envía
        const transporter = nodemailer.createTransport({
            service: "gamil",
            auth: {
                user: config.emailClient.email_user,
                pass: config.emailClient.email_pass
            }
        });

        //2. MailOptions => Quién lo recibe
        const mailOptions = {
            //¿Quién lo envía?
            from: config.emailClient.email_user,
            //¿Quién lo recibe?
            to: email,
            //Asunto
            subject: "Verificación de correo",
            //Cuerpo del correo electrónico
            text: `Para verificar el correo utiliza el siguiente código  ${verifyCodeEmail} \n El código vence en 2 horas`
        }

        //3. Enviar correo 
        transporter.sendMail(mailOptions, (error, info) =>{
            if (error) return res.json({message: "Error"})
            
            console.log("Correo enviado" + info.response)
        })

        res.json({message: "Client registered. Please verify your email whit the code sent"})


    } catch (error) {
        res.json({message: "Error" + error  })
    }
};

//Verificamos el código

registerClientsController.verifyCodeEmail = async (req, res) =>{
    const {verificationCode} = req.body;

    //Obtengo el token que contiene el codigo de verificación
    const token = req.cookies.VerificationToken;

    try {
        //Verificación y decodificar el token
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        const {email, verificationCode: storedCode} = decoded;
        
        //Comparar el código que enviamos al correo con el que el usario escribe
        if(verificationCode !== storedCode){
            return res.json({message: "Invalid code"})
        }

        //Cambiamos el estdo de "isVerified" a true
        const client = await clientModel.findOne({email});
        client.isVerified = true;
        await client.save();

        res.json({message: "Email verified succesful"});
        
        //Elimino la cookie con el token
        res.clearCookie("VerificationToken");

    } 
    catch (error) {
        res.json({message: "Error"});
    }
}

export default registerClientsController;