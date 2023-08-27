
import City from '../config/Models/City.js';
const citiesController = {
  getAllCities: async (request, response, next) => {
    const allCities = await City.find()

    response.json({
      response: allCities,
      succes: true,
      error: null
    })
  },

  getOneCity: async (req, res, next) => {
    console.log(req.params)
    const { id } = req.params
    const city = await City.findById(id)
    res.json({
      response: city,
      succes: true,
      error: null

    })

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
///next (error)
    }


  }

}

export default citiesController;