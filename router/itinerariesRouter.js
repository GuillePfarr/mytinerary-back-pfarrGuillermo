import {Router} from 'express';
import itinerariesController from '../controllers/itinerariesController.js';
const itinerariesRouter = Router()
const {getAllItineraries, getOneItinerary, createOneItinerary, updateOneItinerary, deleteOneItinerary, getItinerariesByCity } = itinerariesController

itinerariesRouter.get('/', getAllItineraries)
itinerariesRouter.post('/', createOneItinerary)
itinerariesRouter.get('/:id', getOneItinerary)
itinerariesRouter.put('/:id', updateOneItinerary)
itinerariesRouter.delete('/:id', deleteOneItinerary) 

itinerariesRouter.get('/bycity/:cityId', getItinerariesByCity);

export default itinerariesRouter