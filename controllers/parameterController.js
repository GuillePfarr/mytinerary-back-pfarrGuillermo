import Parameter from '../config/Models/Parameter.js';

const parameterController = {
  getAllParameter: async (request, response, next) => {
    try {
      const allParameter = await Parameter.find();

      response.json({
        response: allParameter,
        success: true,
        error: null
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneParameter: async (req, res, next) => {
    try {
      console.log(req.params);
      const { id } = req.params;
      const parameter = await Parameter.findById(id);
      res.json({
        response: parameter,
        success: true,
        error: null
      });
    } catch (error) {
      console.log(error);
    }
  },

  createOneParameter: async (req, res, next) => {
    try {
      const parameter = await Parameter.create(req.body);
      res.json({
        response: parameter,
        success: true,
        error: null
      });
    } catch (error) {
      console.log(error);
    }
  },

  updateOneParameter: async (req, res, next) => {
    const { id } = req.params;
    let error = null;
    let success = true;
    try {
      const updatedParameter = await Parameter.findOneAndUpdate({ _id: id }, req.body, { new: true });
      res.json({
        response: updatedParameter,
        success: true,
        error: null
      });
    } catch (error) {
      success = false;
      error = err;
      next(err);
    }
  },

  deleteOneParameter: async (req, res, next) => {
    const { id } = req.params;
    let error = null;
    let success = true;
    try {
      const deletedParameter = await Parameter.findOneAndDelete({ _id: id });
      res.json({
        response: deletedParameter,
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

export default parameterController;