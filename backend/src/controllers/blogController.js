import blogModel from "../models/blog.js";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../confing.js";

// 1. Configurar Cloudinary
cloudinary.config({
   cloud_name: config.cloudinary.cloudinary_name,
   api_key: config.cloudinary.cloudinary_api_key,
   api_secret: config.cloudinary.cloudinary_api_secret,
});

// Crear un objeto vacío para blogController
const blogController = {};

// 2. Definir las funciones
blogController.getAllPost = async (req, res) => {
   const posts = await blogModel.find();
   res.json(posts);
};

// 3. Subir un post al blog
blogController.createPost = async (req, res) => {
   try {
       const { title, content } = req.body;
       let imageUrl = "";

       if (req.file) {
           const result = await cloudinary.uploader.upload(
               req.file.path,
               {
                   folder: "public",
                   allowed_formats: ["jpg", "png", "jpeg"]
               }
           );
           imageUrl = result.secure_url;
       }

       const newPost = new blogModel({ title, content, image: imageUrl });
       await newPost.save(); 

       res.json({ message: "post saved" });
   } catch (error) {
       console.log("error: " + error);
       res.status(500).json({ message: "Error al crear el post" });
   }
};

export default blogController;
