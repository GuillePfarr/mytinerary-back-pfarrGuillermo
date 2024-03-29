import Itinerary from '../config/Models/Itinerary.js';

const itinerariesController = {
  getAllItineraries: async (request, response, next) => {
    try {
      const allItineraries = await Itinerary.find();

      response.json({
        response: allItineraries,
        success: true,
        error: null,
      });
    } catch (error) {
      console.log(error);
     
    }
  },

  getOneItinerary: async (req, res, next) => {
    try {
      console.log(req.params);
      const { id } = req.params;
      const itinerary = await Itinerary.findById(id);
      res.json({
        response: itinerary,
        success: true,
        error: null,
      });
    } catch (error) {
      console.log(error);
      
    }
  },

  createOneItinerary: async (req, res, ) => {
    try {
      const itinerary = await Itinerary.create(req.body);
      res.json({
        response: itinerary,
        success: true,
        error: null,
      });
    } catch (error) {
      console.log(error);
    }
  },

  updateOneItinerary: async (req, res, next) => {
    const { id } = req.params;
    let error = null;
    let success = true;
    try {
      const itinerary = await Itinerary.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true }
      );
      res.json({
        response: Itinerary,
        success: true,
        error: null,
      });
    } catch (error) {
      success = false;
      error = err;
      next(err);
    }
  },

  deleteOneItinerary: async (req, res, next) => {
    const { id } = req.params;
    let itineraries;
    let error = null;
    let success = true;
    try {
      const Itinerary = await Itinerary.findOneAndDelete({ _id: id });
      res.json({
        response: Itinerary,
        success: true,
        error: null,
      });
    } catch (error) {
      success = false;
      error = err;
      next(err);
    }
  },

  getItinerariesByCity: async (req, res, ) => {
    const { cityId } = req.params;
    try {
      const itineraries = await Itinerary.find({ city: cityId });
      res.json({
        response: itineraries,
        success: true,
        error: null,
      });
    } catch (error) {
      console.log(error);
     
    }
  },
};

export default itinerariesController;
