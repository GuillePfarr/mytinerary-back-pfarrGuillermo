import {Router} from 'express';
import citiesController from '../controllers/citiesController.js';
import citiesRouter from './citiesRouter.js';
import itinerariesRouter from './itinerariesRouter.js';
import authRouter from './authRouter.js';

const indexRouter = Router()
const {getAllCities, getOneCitie} = citiesController

indexRouter.get('/', (request, response, )=>{

  response.send('Bienvenido a mi servidor en /api')
})



indexRouter.use('/cities', citiesRouter)

indexRouter.use('/itineraries' , itinerariesRouter)

indexRouter.use('/auth', authRouter)

export default indexRouter;