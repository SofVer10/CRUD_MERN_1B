//PASO 7

//Siempre poner los campos que tiene cada tabla
/*
   Campos:
      name
      description
      price
      stock
*/

import { Schema, model } from "mongoose";

const productsSchema = new Schema({
    name: {
        type: String,
        require: true,
        maxLength: 100
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        require: true,
        min: 0
    },
    stock: {
        type: Number,
        require: true,
        min: 0
    }
},{
    timestamps: true,
    strict: false
})

export default model("Products", productsSchema)