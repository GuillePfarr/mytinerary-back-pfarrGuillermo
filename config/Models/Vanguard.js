import { Schema, model } from "mongoose";

const vanguardSchema = new mongoose.Schema({
    tempInt1: { type: Number, required: true },
    tempInt2: { type: Number, required: true },
    tempExt: { type: Number, required: true },
    humidityInt1: { type: Number, required: true },
    humidityInt2: { type: Number, required: true },
    motor1: { type: String, required: true },
    motor2: { type: Number, required: true },
    upperLimit1: { type: Number, required: true },
    upperLimit2: { type: Number, required: true },
    lowerLimit1: { type: Number, required: true },
    lowerLimit2: { type: Number, required: true },
    time: { type: time, required: true },
    date: { type: Date, required: true }, 
},

    {
        timestamps: true
    }
)
const Vanguard = model('vanguards', vanguardSchema)

export default Vanguard
