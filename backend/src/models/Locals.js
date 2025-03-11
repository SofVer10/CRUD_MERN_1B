//PASO 7

//Siempre poner los campos que tiene cada tabla
/*
   Campos:
      name
      address
      telephone
      schedule
*/

import { Schema, model } from "mongoose";

const localsSchema = new Schema({
    name: {
        type: String,
        require: true,
        maxLength: 100
    },
    address: {
        type: String,
        require: true,
        maxLength: 100
    },
    telephone: {
        type: Number,
        require: true,
    },
    schedule: {
        type: String
    }
},{
    timestamps: true,
    strict: false
})

export default model("Locals", localsSchema)