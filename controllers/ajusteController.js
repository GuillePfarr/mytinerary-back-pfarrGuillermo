import Ajuste from '../config/Models/Ajuste.js';

const ajusteController = {
  getAllAjuste: async (request, response, next) => {
    try {
      const allAjuste = await Ajuste.find();

      response.json({
        response: allAjuste,
        success: true,
        error: null
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneAjuste: async (req, res, next) => {
    try {
      console.log(req.params);
      const { id } = req.params;
      const ajuste = await Ajuste.findById(id);
      res.json({
        response: ajuste,
        success: true,
        error: null
      });
    } catch (error) {
      console.log(error);
    }
  },

  createOneAjuste: async (req, res, next) => {
    try {
      const ajuste = await Ajuste.create(req.body);
      res.json({
        response: ajuste,
        success: true,
        error: null
      });
    } catch (error) {
      console.log(error);
    }
  },

  updateOneAjuste: async (req, res, next) => {
    const { id } = req.params;
    let error = null;
    let success = true;
    try {
      const updatedAjuste = await Ajuste.findOneAndUpdate({ _id: id }, req.body, { new: true });
      res.json({
        response: updatedAjuste,
        success: true,
        error: null
      });
    } catch (error) {
      success = false;
      error = err;
      next(err);
    }
  },

  deleteOneAjuste: async (req, res, next) => {
    const { id } = req.params;
    let error = null;
    let success = true;
    try {
      const deletedAjuste = await Ajuste.findOneAndDelete({ _id: id });
      res.json({
        response: deletedAjuste,
        success: true,
        error: null
      });
    } catch (error) {
      success = false;
      error = err;
      next(err);
    }
  }
};

export default ajusteController;