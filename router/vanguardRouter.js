import {Router} from 'express';
import vanguardController from '../controllers/vanguardController.js';
const vanguardRouter = Router()
const {getAllVanguard, getOneVanguard, createOneVanguard, updateOneVanguard, deleteOneVanguard} = vanguardController

vanguardRouter.get('/', getAllVanguard)
vanguardRouter.post('/', createOneVanguard)
vanguardRouter.get('/:id', getOneVanguard)
vanguardRouter.put('/:id', updateOneVanguard)
vanguardRouter.delete('/:id', deleteOneVanguard)

export default vanguardRouter