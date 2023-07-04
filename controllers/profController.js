import elementModel from "../models/elementModel.js";
import moduleModel from "../models/moduleModel.js";


// get all modules
export const elementsbyProfControlller = async (req, res) => {
    try {
      const {id} = req.params;
      const elements = await elementModel.find({ professeur: id });
      console.log(elements);
      res.status(200).send({
        success: true,
        message: "All element List",
        elements,
      });
    } catch (error) {
      console.log(error);
      res.send({
        success: false,
        error,
        message: "Error while getting all element",
      });
    }
  };