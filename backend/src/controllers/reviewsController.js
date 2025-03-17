//PASO 8
//aqui se van a crear los metodos como tal, se define que es lo que va a hacer cada metodo

//array de funciones del CRUD
const reviewsController = {};
import reviewsModel from "../models/Reviews.js";

//S E L E C T
reviewsController.getReviews = async (req, res) => {
    const reviews = await reviewsModel.find().populate("idClient");
    res.json(reviews)
}

// I N S E R T
reviewsController.insertReviews = async (req, res) => {
    //campos que se van a solicitar en el nuevo esquema creado
    const {comment, rating, idClient} = req.body;
    //datos con los que se va a llenar el esquema que creamos
    const newReviews = new reviewsModel({comment, rating, idClient});
    await newReviews.save();
    res.json({message: "Reviews saved"});
}

// U P D A T E 
reviewsController.updateReviews = async (req, res) => {
    const  {comment, rating, idClient} = req.body;
    const updateReviews = await reviewsModel.findByIdAndUpdate(
        req.params.id, {comment, rating, idClient}, {new : true}
    );
    res.json({message: "Reviews updated"});
}

// D E L E T E
reviewsController.deleteReviews = async (req, res) => {
    await reviewsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Reviews deleted"});

}

export default reviewsController;