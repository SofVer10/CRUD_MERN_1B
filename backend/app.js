//PASO 1

//Importar la libreia de express
import express from "express";

//PASO 9 
// esta linea es para cuando ya se hayan credo los metodos
import productsRoutes from "./src/routes/products.js"
import clientsRoutes from "./src/routes/clients.js"
import employeesRoutes from "./src/routes/employees.js"
import localsRoutes from "./src/routes/locals.js"
import categoriesRoutes from "./src/routes/categories.js"
import reviewsRoutes from "./src/routes/reviews.js"
import evaluationRoutes from "./src/routes/evaluations.js"
import registerEmployeesRoutes from "./src/routes/registerEmployees.js"
import loginRoutes from "./src/routes/login.js"

//PASO 1 (Continuación)
//Creo una constante que es igual
//a la libreria que importe y la ejecuta
const app = express();

//PASO 10
//uso un middleware para que acepte datos JSON
app.use(express.json());

//PASO 5
//Definir la ruta
app.use("/api/products", productsRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/locals", localsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/evaluations", evaluationRoutes);

app.use("/api/registerEmployees", registerEmployeesRoutes);
app.use("/api/login", loginRoutes);

//PASO 1 (Continuación)
//exporta la constante para poder usar express en otros lados
export default app;

