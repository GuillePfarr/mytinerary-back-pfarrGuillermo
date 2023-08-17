import {Router} from 'express';
import citiesController from '../controllers/citiesController.js';
const citiesRouter = Router()
const {getAllCities, getOneCitie, createOneCity} = citiesController

citiesRouter.get('/', getAllCities)
citiesRouter.post('/', create)
citiesRouter.get('/:nombre', getOneCitie)

export default citiesRouter;