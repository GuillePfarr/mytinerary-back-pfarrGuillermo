import { Schema, model } from "mongoose";

const itinerarySchema = Schema({
    user_name: { type: String, required: true },
    user_image: { type: String, required: true },
    price: { type: Number, required: true },
    likes: { type: Number, required: true },
    duration: { type: Number, required: true },
    city: { type: Schema.Types.ObjectId, ref: 'City', required: true },
   
});

const Itinerary = model('itineraries', itinerarySchema);

export default Itinerary;


