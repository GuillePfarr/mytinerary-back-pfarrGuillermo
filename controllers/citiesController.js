import cities from "../cities.js";
import City from '../config/Models/City.js';
const citiesController = {
  getAllCities: async (request, response, next) => {
    const allCities = await City.find({ name:'Toronto'})

    response.json({
      response: cities,
      succes: true,
      error: null
    })
  },

  getOneCitie: (req, res, next) => {
    console.log(req.params)
    const { name } = req.params
    const city = cities.find(city => city.name == name)
    res.json({
      response: city,
      succes: true,
      error: null

    })

  },

  createOneCity: (req, res, next) => {
    // const newCity = new City()
    City.create(req.body)
    console.log(req.body);

    try {
      City.create(req.body)
    } catch (error) {
      console.log(error)
    }

    res.json({
      // response: city,
      success: true,
      error: null
    })
  }

}

export default citiesController;