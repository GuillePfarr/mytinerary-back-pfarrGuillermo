import cities from "../cities.js";
import City from '../config/Models/City.js';
const citiesController = {
  getAllCities: (req, res, next) => {
    res.json({
      response: cities,
      succes: true,
      error: null
    })
  },

  getOneCitie: (req, res, next) => {
    console.log(req.params)
    const { name } = req.params
    const citie = cities.find(citie => citie.name == name)
    res.json({
      response: citie,
      succes: true,
      error: null

    })

  },

  createOneCity: (req, res, next) => {
    // const newCity = new City()
      City.create(req.body)
    console.log(req.body);

try{
    Event.create(req.body)
} catch(error){
console.log(error)
}



    res.json({
      // response: citie,
      success: true,
      error: null

    })


  }

}

export default citiesController;