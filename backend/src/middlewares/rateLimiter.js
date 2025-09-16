import rateLimit from "express-rate-limit"

//1. Configuramos la librerìa
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, //cantidad de peticiones que se pueden hacer al mismo tiempo
    message: {
        status: 429, //Muchas solicitudes
        error: "Too many request"
    },
});

export default limiter;