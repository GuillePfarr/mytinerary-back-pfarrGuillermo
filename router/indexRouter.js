import {Router} from 'express';
import citiesController from '../controllers/citiesController.js';
import citiesRouter from './citiesRouter.js';


const indexRouter = Router()
const {getAllCities, getOneCitie} = citiesController

indexRouter.get('/', (request, response, next)=>{

  response.send('Bienvenido a mi servidor en /api')
})



indexRouter.use('/cities', citiesRouter)
// indexRouter.get('/cities/one', getOneCitie)


export default indexRouter;