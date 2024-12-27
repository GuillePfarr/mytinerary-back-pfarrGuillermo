import { Schema, model } from "mongoose";

const ajusteSchema =   Schema({
    tempMax: { type: Number},
    tempMin: { type: Number },
    humyMax: { type: Number },
    humyMin: { type: Number },
},

    {
        timestamps: true
    }
)
const Ajuste = model('ajustes', ajusteSchema)

export default Ajuste;



