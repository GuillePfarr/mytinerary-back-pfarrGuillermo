import {Router} from 'express';
import ajusteController from '../controllers/ajusteController.js';
const ajusteRouter = Router()
const {getAllAjuste, getOneAjuste, createOneAjuste, updateOneAjuste, deleteOneAjuste} = ajusteController

ajusteRouter.get('/', getAllAjuste)
ajusteRouter.post('/', createOneAjuste)
ajusteRouter.get('/:id', getOneAjuste)
ajusteRouter.put('/:id', updateOneAjuste)
ajusteRouter.delete('/:id', deleteOneAjuste)



export default ajusteRouter