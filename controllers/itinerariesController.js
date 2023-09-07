

import Itinerary from '../config/Models/Itinerary.js';

const itinerariesController = {
  getAllItineraries: async (request, response, next) => {
    try {
      const allItineraries= await Itinerary.find()

      response.json({
        response: allItineraries,
        success: true,
        error: null
      })
    }
    catch (error) {
      console.log(error)
      ///next (error)
    }
  },

  getOneItinerary: async (req, res, next) => {

    try {
      console.log(req.params)
      const { id } = req.params
      const itinerary = await Itinerary.findById(id)
      res.json({
        response: itinerary,
        succes: true,
        error: null
      })
    } catch (error) {
      console.log(error)
      ///next (error)
    }
  },

  createOneItinerary: async (req, res, next) => {

    try {
      const itinerary = await Itinerary.create(req.body)
      res.json({
        response: itinerary,
        success: true,
        error: null
      })

    } catch (error) {
      console.log(error)

    }
  },



  updateOneItinerary: async (req, res, next) => {
    const { id } = req.params
    // let itineraries;
    let error = null;
    let success = true;
    try {
      const itinerary = await Itinerary.findOneAndUpdate({ _id: id }, req.body, { new: true })
      res.json({
        response: itinerary,
        success: true,
        error: null
      })
    } catch (error) {
      success = false;
      error = err;
      next(err)

    }




  },

  deleteOneItinerary: async (req, res, next) => {

    const { id } = req.params
    
    let error = null;
    let success = true;
    try {
      const deleteItinerary = await Itinerary.findOneAndDelete({ _id: id })
      res.json({
        response: deleteItinerary,
        success: true,
        error: null
      })
    } catch (error) {
      success = false;
      error = err;
      next(err)

    }
  },
}

export default itinerariesController;