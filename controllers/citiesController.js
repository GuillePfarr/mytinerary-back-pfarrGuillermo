
import cities from '../cities.js';
import City from '../config/Models/City.js';
const citiesController = {
  getAllCities: async (request, response, next) => {
    try {
      const allCities = await City.find()

      response.json({
        response: allCities,
        succes: true,
        error: null
      })
    }
    catch (error) {
      console.log(error)

    }
  },

  getOneCity: async (req, res, next) => {

    try {
      console.log(req.params)
      const { id } = req.params
      const city = await City.findById(id)
      res.json({
        response: city,
        succes: true,
        error: null
      })
    } catch (error) {
      console.log(error)
      ///next (error)
    }
  },

  createOneCity: async (req, res, next) => {

    try {
      const city = await City.create(req.body)
      res.json({
        response: city,
        success: true,
        error: null
      })

    } catch (error) {
      console.log(error)

    }
  },



  updateOneCity: async (req, res, next) => {
    const { id } = req.params
    let cities;
    let error = null;
    let succes = true;
    try {
      const city = await City.findOneAndUpdate({ _id: id }, req.body, { new: true })
      res.json({
        response: City,
        success: true,
        error: null
      })
    } catch (error) {
      succes = false;
      error = err;
      next(err)

    }




  },

  deleteOneCity: async (req, res, next) => {

    const { id } = req.params
    let cities;
    let error = null;
    let succes = true;
    try {
      const city = await City.findOneAndDelete({ _id: id })
      res.json({
        response: City,
        success: true,
        error: null
      })
    } catch (error) {
      succes = false;
      error = err;
      next(err)

    }
  },
}

export default citiesController;