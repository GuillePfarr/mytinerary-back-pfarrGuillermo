import { Schema, model } from "mongoose";

const parameterSchema =   Schema({
    tempMax: { type: Number, required:true},
    tempMin: { type: Number, required:true },
    humidityMax: { type: Number, required:true},
    humidityMin: { type: Number, required:true }
   
},

  {
        timestamps: true
    }
)
const Parameter = model('parameter', parameterSchema)

export default Parameter;