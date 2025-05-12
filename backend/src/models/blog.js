/*
    Cloección: Blog 
       
       Campos: 
          Title
          Content
          Image
*/

import {Schema, model} from "mongoose";

const blogSchema = new Schema ({
    title: {
        type: String
    },
    content: {
        type: String
    },
    image: {
        type: String
    }
},{
    timestamps: true,
    strict: false
})