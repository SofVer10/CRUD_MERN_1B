//PASO 1
//Importar la libreia de express
import express from "express";

//PASO 9 
// esta linea es para cuando ya se hayan credo los metodos
import productsRoutes from "./src/routes/products.js";
import clientsRoutes from "./src/routes/clients.js";
import employeesRoutes from "./src/routes/employees.js";
import localsRoutes from "./src/routes/locals.js";
import categoriesRoutes from "./src/routes/categories.js";
import reviewsRoutes from "./src/routes/reviews.js";
import evaluationRoutes from "./src/routes/evaluations.js";
import registerEmployeesRoutes from "./src/routes/registerEmployees.js";
import loginRoutes from "./src/routes/login.js";
//Importar libreria para que PostMan acepte cookies
import cookieParser from "cookie-parser";
import logoutRoutes from "./src/routes/logout.js";
import registerClients from "./src/routes/registerClients.js";
import passwordRecoveryRoutes from "./src/routes/passwordRecovery.js";
import blogRoute from "./src/routes/blog.js";

import { validateAuthToken } from "./src/middlewares/validateAuthToken.js";

//Importar libreria para Swagger
import swaggerUI from "swagger-ui-express";
import fs from "fs";
import path from "path";


//PASO 1 (Continuación)
//Creo una constante que es igual
//a la libreria que importe y la ejecuta
const app = express();

//Utilizar el sistema de archivos para leer ek JSON  de Swagger y ver mi documentación

const swaggerDocument = JSON.parse(fs.readFileSync(
    path.resolve("./ricaldone-d95-PepsiMERN-1.0.0-resolved.json"), "utf-8"
))


//PASO 10
//uso un middleware para que acepte datos JSON
app.use(express.json());
//Que acepte cookies
app.use(cookieParser());
//PASO 5
//Definir la ruta
app.use("/api/products", productsRoutes);
app.use("/api/clients", clientsRoutes);
//El middleware tiene que estar en el centro porque tiene que ejecutar antes de employeesRoutes en este caso
//los nombres se colocan de la misma manera que se escribieron en userType del Login sino no va a funcionar
app.use("/api/employees", validateAuthToken(["Employee", "Admin"]), employeesRoutes);
app.use("/api/locals", localsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/evaluations", evaluationRoutes);

app.use("/api/registerEmployees", registerEmployeesRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes);

app.use("/api/registerClients", registerClients);
app.use("/api/passwordRecoveryRoutes", passwordRecoveryRoutes);
app.use("/api/blog", blogRoute);

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))


//PASO 1 (Continuación)
//exporta la constante para poder usar express en otros lados
export default app;

