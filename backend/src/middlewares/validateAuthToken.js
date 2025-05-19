import jsonWebToken from "jsonwebtoken";
import {config} from "../confing.js"

//Midddleware es para ejecutar algo antes de ejecutar el proceso
//en este caso para validar que el usario haya iniciado y de acuerdo al usuario que sea va a tener ciertos accesos
export const validateAuthToken = (allowedUserTypes = []) => {

    return (req, res, next) => {

        try {

            //1. Validar si existen las cookies
            if(!req.cookies){
                return res.json({message: "No cookies found, authorization required"})
            }

            //2. xtraer el token de las cookies
            const {authToken} = req.cookies;

            //3. Extraer toda la información que tiene el token
            const decoded = jsonWebToken.verify(authToken, config.JWT.secret)

            //Almacenar los datos del usuario en un request
            req.user = decoded

            if(!allowedUserTypes.includes(decoded.userType)){
                return res.json({message: "Access denied"})
            }

            //Si el si está, podemos continuar
            next()
            
        } catch (error) {
            
        }
    }
}