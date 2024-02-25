import { Schema, model } from "mongoose";

const vanguardSchema =   Schema({
    tempInt1: { type: Number, required: true },
    tempInt2: { type: Number, required: true },
    // maxTempReg: { type: Number, required: true },
    // minTempReg: { type: Number, required: true },
    // maxTempDateHour: { type: Date, required: true },
    // minTempDateHour: { type: Date, required: true },
    // motor2: { type: Number, required: true },
    // upperLimit1: { type: Number, required: true },
    // upperLimit2: { type: Number, required: true },
    // lowerLimit1: { type: Number, required: true },
    // lowerLimit2: { type: Number, required: true },
    
    date: { type: Date, required: true }
},

    {
        timestamps: true
    }
)
const Vanguard = model('vanguards', vanguardSchema)

export default Vanguard;
