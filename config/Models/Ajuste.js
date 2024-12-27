import { Schema, model } from "mongoose";

const ajusteSchema =   Schema({
    tempMax: { type: Number, required: true },
    tempMin: { type: Number, required: true },
    humyMax: { type: Number, required: true },
    humyMin: { type: Number, required: true }
},

    {
        timestamps: true
    }
)
const Ajuste = model('ajustes', ajusteSchema)

export default Ajuste;



