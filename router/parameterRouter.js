import {Router} from 'express';
import parameterController from '../controllers/parameterController.js';
const parameterRouter = Router()
const {getAllParameter, getOneParameter, createOneParameter, updateOneParameter, deleteOneParameter} = parameterController

parameterRouter.get('/', getAllParameter)
parameterRouter.post('/', createOneParameter)
parameterRouter.get('/:id', getOneParameter)
parameterRouter.put('/:id', updateOneParameter)
parameterRouter.delete('/:id', deleteOneParameter)

export default parameterRouter;
