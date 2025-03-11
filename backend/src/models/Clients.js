//PASO 7

//Siempre poner los campos que tiene cada tabla
/*
   Campos:
      name
      lastName
      birthday
      email
      password
      telephone
      dui
      isVerified 
*/

import { Schema, model } from "mongoose";

const clientsSchema = new Schema({
    name: {
        type: String,
        require: true,
        maxLength: 100
    },
    lastName: {
        type: String,
        require: true,
        maxLength: 100
    },
    birthday: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true
    },
    telephone: {
        type: Number,
        require: true,
    },
    dui: {
        type: String,
        require: true
    },
    isVerified: {
        type: Boolean,
        require: true
    }
},{
    timestamps: true,
    strict: false
})

export default model("Clients", clientsSchema)