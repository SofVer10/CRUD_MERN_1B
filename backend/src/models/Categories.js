//Siempre poner los campos que tiene cada tabla
/*
   Campos:
      name
      description
      status
      image 
*/

import { Schema, model } from "mongoose";

const categoriesSchema = new Schema({
    name: {
        type: String,
        require: true,
        maxLength: 100
    },
    lastdescription: {
        type: String,
        require: true,
        maxLength: 100
    },
    status: {
        type: Boolean,
        require: true
    },
    image: {
        type: String,
        require: true
    }
    
},{
    timestamps: true,
    strict: false
})

export default model("Categories", categoriesSchema)