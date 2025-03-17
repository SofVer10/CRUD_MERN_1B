/*
   Campos:
      comment
      grade
      role
      IdEmpleado
*/

import { Schema, model} from "mongoose";

const evaluationsSchema = new Schema(
    {
        comment: {
            type: String,
            require: true
        },

        grade: {
            type: Number,
            require: true

        },

        role: {
            type: String,
            require: true
        },

        IdEmpleado:{ 
            type: Schema.Types.ObjectId,
            ref: "Employees",
            requiere: true
        }
    },
    {
        timestamps: true,
        strict: false
    }
)

export default model("Evaluations", evaluationsSchema)