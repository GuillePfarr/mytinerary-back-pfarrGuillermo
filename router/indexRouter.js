// import {Router} from 'express';
// import citiesController from '../controllers/citiesController.js';
// import vanguardController from '../controllers/vanguardController.js';
// import citiesRouter from './citiesRouter.js';
// import itinerariesRouter from './itinerariesRouter.js';
// import authRouter from './authRouter.js';
// import vanguardRouter from './vanguardRouter.js';
// import ajusteRouter from './ajusteRouter.js';
// import mqttTestRouter from './mqttTestRouter.js';
// import devicesRouter from './devicesRouter.js';



// const indexRouter = Router()
// const {getAllCities, getOneCitie} = citiesController

// indexRouter.get('/', (request, response, )=>{

//   response.send('Bienvenido a mi servidor en /api')
// })



// indexRouter.use('/cities', citiesRouter)

// indexRouter.use('/itineraries' , itinerariesRouter)

// indexRouter.use('/auth', authRouter)

// indexRouter.use('/vanguard', vanguardRouter)

// indexRouter.use('/ajuste', ajusteRouter)

// indexRouter.use('/mqtt-test', mqttTestRouter)

// indexRouter.use('/devices', devicesRouter)



// export default indexRouter;


import { Router } from 'express';
import citiesController from '../controllers/citiesController.js';
import vanguardController from '../controllers/vanguardController.js';
import citiesRouter from './citiesRouter.js';
import itinerariesRouter from './itinerariesRouter.js';
import authRouter from './authRouter.js';
import vanguardRouter from './vanguardRouter.js';
import ajusteRouter from './ajusteRouter.js';
import devicesRouter from './devicesRouter.js';

const indexRouter = Router();
const { getAllCities, getOneCitie } = citiesController;

indexRouter.get('/', (request, response) => {
  response.send('Bienvenido a mi servidor en /api');
});

indexRouter.use('/cities', citiesRouter);
indexRouter.use('/itineraries', itinerariesRouter);
indexRouter.use('/auth', authRouter);
indexRouter.use('/vanguard', vanguardRouter);
indexRouter.use('/ajuste', ajusteRouter);

// ✅ NUEVO (devices)
indexRouter.use('/devices', devicesRouter);

export default indexRouter;
