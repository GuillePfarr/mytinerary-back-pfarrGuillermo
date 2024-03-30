
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

  // createOneVanguard: async (req, res, next) => {

  //   try {
  //     const vanguard = await Vanguard.create(req.body)
  //     res.json({
  //       response: vanguard,
  //       success: true,
  //       error: null
  //     })

  //   } catch (error) {
  //     console.log(error)

  //   }
  // },

createOneVanguard: async (req, res, next) => {
  try {
    // Obtener el ID del objeto padre
    const { id } = req.body.parentId;
    
    // Obtener el objeto padre
    const parentVanguard = await Vanguard.findById(id);

    // Agregar el nuevo objeto al array dentro del objeto padre
    parentVanguard.data.push(req.body);

    // Guardar el objeto padre actualizado en la base de datos
    const updatedParentVanguard = await parentVanguard.save();

    res.json({
      response: updatedParentVanguard,
      success: true,
      error: null
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      response: null,
      success: false,
      error: "Error al agregar un nuevo objeto al array dentro del objeto padre"
    });
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


 
 
};










export default vanguardController;