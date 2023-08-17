import cities from "../cities.js";

const citiesController = {
  getAllCities: (request, response, next)=>{
  response.json({
     response: cities,
     succes: true,
     error: null

})
},


getOneCitie: (request, response, next) => {
console.log(request.params)
const {name} = request.params
const  citie = cities.find(citie => citie.name == name)
response.json({
response: citie,
succes: true,
error: null

})


}
}

export default citiesController;