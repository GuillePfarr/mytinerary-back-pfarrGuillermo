import { Schema, model } from "mongoose";

const vanguardSchema =   Schema({
    tempInt1: { type: Number},
    tempExt1: { type: Number },
    humyInt1: { type: Number },
    humyExt1: { type: Number },
    tempInt1Max: { type: Number},
    tempExt1Max: { type: Number },
    humyInt1Max: { type: Number },
    humyExt1Max: { type: Number },
    tempInt1Min: { type: Number},
    tempExt1Min: { type: Number },
    humyInt1Min: { type: Number },
    humyExt1Min: { type: Number },
    upperLimit1: { type: Number},
    upperLimit2: { type: Number},
    lowerLimit1: { type: Number },
    lowerLimit2: { type: Number },
    rainAmount: { type: Number },
    rainDuration: { type: Number },
    errorStatus: { type: Number },
    date: { type: Date, required:true }
},

    {
        timestamps: true
    }
)
const Vanguard = model('vanguards', vanguardSchema)

export default Vanguard;



