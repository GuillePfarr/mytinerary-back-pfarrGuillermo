import Parameter from "../models/parameterModel.js";

// Obtener parámetros actuales
export const getParameters = async (req, res) => {
  try {
    const parameters = await Parameter.findOne(); // Supone que solo existe un documento de parámetros
    if (!parameters) {
      return res.status(404).json({ message: "Parameters not found" });
    }
    res.status(200).json(parameters);
  } catch (error) {
    res.status(500).json({ message: "Error fetching parameters", error });
  }
};

// Actualizar parámetros
export const updateParameters = async (req, res) => {
  const { tempMax, tempMin, humidityMax, humidityMin } = req.body;

  try {
    const parameters = await Parameter.findOne();
    if (!parameters) {
      return res.status(404).json({ message: "Parameters not found" });
    }

    // Actualizar los valores
    parameters.tempMax = tempMax;
    parameters.tempMin = tempMin;
    parameters.humidityMax = humidityMax;
    parameters.humidityMin = humidityMin;

    // Guardar los cambios
    const updatedParameters = await parameters.save();
    res.status(200).json(updatedParameters);
  } catch (error) {
    res.status(500).json({ message: "Error updating parameters", error });
  }
};

// Crear un conjunto inicial de parámetros (opcional)
export const createParameters = async (req, res) => {
  const { tempMax, tempMin, humidityMax, humidityMin } = req.body;

  try {
    const parametersExist = await Parameter.findOne();
    if (parametersExist) {
      return res.status(400).json({ message: "Parameters already exist" });
    }

    const newParameters = new Parameter({
      tempMax,
      tempMin,
      humidityMax,
      humidityMin,
    });

    const savedParameters = await newParameters.save();
    res.status(201).json(savedParameters);
  } catch (error) {
    res.status(500).json({ message: "Error creating parameters", error });
  }
};
