
import Vanguard from '../config/Models/Vanguard.js';
const vanguardController = {
  getAllVanguard: async (request, response, next) => {
    try {
      const allVanguard = await Vanguard.find()

      response.json({
        response: allVanguard,
        succes: true,
        error: null
      })
    }
    catch (error) {
      console.log(error)

    }
  },

  getOneVanguard: async (req, res, next) => {

    try {
      console.log(req.params)
      const { id } = req.params
      const vanguard = await Vanguard.findById(id)
      res.json({
        response: vanguard,
        succes: true,
        error: null
      })
    } catch (error) {
      console.log(error)
      ///next (error)
    }
  },

  createOneVanguard: async (req, res, next) => {

    try {
      const vanguard = await Vanguard.create(req.body)
      res.json({
        response: vanguard,
        success: true,
        error: null
      })

    } catch (error) {
      console.log(error)

    }
  },



  updateOneVanguard: async (req, res, next) => {
    const { id } = req.params
    let vanguard;
    let error = null;
    let succes = true;
    try {
      const vanguard = await Vanguard.findOneAndUpdate({ _id: id }, req.body, { new: true })
      res.json({
        response: Vanguard,
        success: true,
        error: null
      })
    } catch (error) {
      succes = false;
      error = err;
      next(err)

    }




  },

  deleteOneVanguard: async (req, res, next) => {

    const { id } = req.params
    let vanguards;
    let error = null;
    let succes = true;
    try {
      const vanguard = await Vanguard.findOneAndDelete({ _id: id })
      res.json({
        response: Vanguard,
        success: true,
        error: null
      })
    } catch (error) {
      succes = false;
      error = err;
      next(err)

    }
  },


 
updateMinTempInt1Reg: async () => {
  try {
    // Encuentra el objeto con el id específico
    const targetTempsEntry = await Vanguard.findOne({ _id: '65e19f1ad57c4b0469da4d0a' });

    console.log('Objeto encontrado:', targetTempsEntry ? targetTempsEntry.toObject() : null);

    // Maneja el caso en que no se encuentre el objeto
    if (!targetTempsEntry) {
      console.error('No se encontró el objeto con el id específico.');
      return;
    }

    // Crea una instancia de Mongoose para asegurarte de que sea un documento Mongoose
    const targetTempsDocument = new Vanguard(targetTempsEntry);

    // Actualiza directamente el valor de minTempInt1Reg
    console.log('Actualizando minTempInt1Reg a -9');
    targetTempsDocument.minTempInt1Reg = -9;

    // También actualiza la fecha si es necesario
    targetTempsDocument.date = new Date();  // Puedes ajustar esto según tu lógica

    // Guarda el documento
    await targetTempsDocument.save();

    console.log('minTempInt1Reg actualizado correctamente.');

  } catch (error) {
    console.error('Error al actualizar minTempInt1Reg:', error);
  }
},








}

export default vanguardController;