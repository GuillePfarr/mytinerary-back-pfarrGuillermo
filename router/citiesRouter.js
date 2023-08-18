import {Router} from 'express';
import citiesController from '../controllers/citiesController.js';
const citiesRouter = Router()
const {getAllCities, getOneCity, createOneCity} = citiesController

citiesRouter.get('/', getAllCities)
citiesRouter.post('/', create)
citiesRouter.get('/:nombre', getOneCity)

export default citiesRouter