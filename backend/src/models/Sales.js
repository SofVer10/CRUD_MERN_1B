/* 
   product 
   category
   customer 
   total
*/

import { Schema, model} from "mongoose";

const salesSchema = new Schema(
    {
        product: {
            type: String,
            require: true
        },
        category: {
            type: String,
            require: true
        },
      
        product: {
            type: String,
            require: true
        },
        customer 
        : {
            type: String,
            require: true
        },
        total: {
            type: Number,
            require: true
        }

    },
    {
        timestamps: true,
        strict: false
    }
)

export default model("Sales", salesSchema)