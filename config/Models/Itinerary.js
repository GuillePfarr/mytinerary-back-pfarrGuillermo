import { Schema, model } from "mongoose";

const itinerarySchema = Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    duration: { type: String, required: true },
    city: { type: Schema.Types.ObjectId, ref: 'City', required: true },
   
});

const Itinerary = model('itineraries', itinerarySchema);

export default Itinerary;


