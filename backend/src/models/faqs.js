/*
Campos
   Questions
   Answers
   Level
   isActive
*/

import { Schema } from "mongoose";

const faqsShecma = new Schema (
    {
        question: {
            type: String,
            required: true,
            minLegth: 4
        },
        answer: {
            type: String,
            required: true,
            minLegth: 4,
            trim: true
        },
        level: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
            trim: true
        },
        isActive: {
            type: Boolean,
            required: true
        }
    }, {
        timestamps: true,
        strict: false
    }
)

export default model ("Faqs", faqsShecma)