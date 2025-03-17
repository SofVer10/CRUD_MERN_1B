/*
   Campos:
      commet
      rating
      idClient
*/

import { Schema, model} from "mongoose";

const reviewsSchema = new Schema(
    {
        comment: {
            type: String,
            require: true
        },
        rating: {
            type: Number,
            require: true,
            min: 0,
            max : 5

        },

        idClient:{ 
            type: Schema.Types.ObjectId,
            ref: "Clients",
            requiere: true
        }
    },
    {
        timestamps: true,
        strict: false
    }
)

export default model("Reviews", reviewsSchema)