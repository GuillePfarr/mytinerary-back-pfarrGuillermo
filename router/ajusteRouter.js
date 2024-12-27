import {Router} from 'express';
import ajusteController from '../controllers/ajusteController.js';
const ajusteRouter = Router()
const {getAllAjuste, getOneAjuste, createOneAjuste, updateOneAjuste, deleteOneAjuste} = ajusteController

vanguardRouter.get('/', getAllAjuste)
vanguardRouter.post('/', createOneAjuste)
vanguardRouter.get('/:id', getOneAjuste)
vanguardRouter.put('/:id', updateOneAjuste)
vanguardRouter.delete('/:id', deleteOneAjuste)

export default ajusteRouter