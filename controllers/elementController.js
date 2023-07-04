import elementModel from "../models/elementModel.js";
import moduleModel from "../models/moduleModel.js";

export const addElementController = async (req, res) => {
    try {
       const { name, module, professeur} = req.body;
       //validations
       if(!name) {
           return res.send({ message: "name is Required" });
       }
       if(!module) {
           return res.send({ message: "module is Required" });
       }
       if(!professeur) {
           return res.send({ message: "prof is Required" });
       }
    
    try {
      const m = await moduleModel.findById(module);
      if(m.elementNumber >= 2){
        return res.send({
          success:false,
          message:'this module have two elment',
         })
      }
      else{
        const result = await moduleModel.findByIdAndUpdate(module, { $inc: { elementNumber: 1 } }, {
          returnOriginal: false, // Return the updated document
        });
      }

      const element = await new elementModel({
        name,
        module,
        professeur,
      }).save();

     res.status(201).send({
        success: true,
        message: "element saved Successfully",
        element,
      });
    } catch (error) {
      console.log(error)
      res.status(500).send({
          success:false,
          message:'Error in sssave element',
      })
    }
    
    } catch (error) {
       console.log(error)
       res.status(500).send({
           success:false,
           message:'Error in save element',
       })
    }
};

// get all modules
export const elementsControlller = async (req, res) => {
    try {
      const elements = await elementModel.find({});
      res.status(200).send({
        success: true,
        message: "All elment List",
        elements,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all element",
      });
    }
  };


//update element
export const updateElementController = async (req, res) => {
  try {
    const { name, module, professeur} = req.body;
    const { id } = req.params;
    const m = await moduleModel.findById(module);
      if(m.elementNumber >= 2){
        return res.send({
          success:false,
          message:'this module have two elment',
         })
      }
      else{
        const result = await moduleModel.findByIdAndUpdate(module, { $inc: { elementNumber: 1 } }, {
          returnOriginal: false, // Return the updated document
        });
      }

    const elementbeforupdate = await elementModel.findById(id);
    console.log(elementbeforupdate.module)
    const result = await moduleModel.findByIdAndUpdate(elementbeforupdate.module, { $inc: { elementNumber: -1 } }, {
      returnOriginal: false, // Return the updated document
    });

    const element = await elementModel.findByIdAndUpdate(
      id,
      { name, module, professeur},
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "elment Updated Successfully",
      element,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      error,
      message: "Error while updating element",
    });
  }
};


//delete elment
export const deleteElementController = async (req, res) => {
  try {
    const { id } = req.params;
    const element = await elementModel.findById(id);
    console.log(element.module)
    const result = await moduleModel.findByIdAndUpdate(element.module, { $inc: { elementNumber: -1 } }, {
      returnOriginal: false, // Return the updated document
    });
    await elementModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Element Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "error while deleting Module",
      error,
    });
  }
};