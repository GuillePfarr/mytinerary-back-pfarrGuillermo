import { Schema, model } from "mongoose";

const citySchema = Schema({
 name: {type: String, required: true},
description: {type: String, required: true},
currency: {type: String, required: true},
lang: {type: String, required: true},
time: {type: String, required: true},
},

{
timestamps: true
}
)
const City = model('city', citySchema)

export default City


