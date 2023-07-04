import moduleModel from "../models/moduleModel.js";
import userModel from "../models/userModel.js";

export const addModuleController = async (req, res) => {
    try {
       const { name, filiere, semestre} = req.body;
       //validations
       if(!name) {
           return res.send({ message: "name is Required" });
       }
       if(!filiere) {
           return res.send({ message: "filiere is Required" });
       }
       if(!semestre) {
           return res.send({ message: "semestre is Required" });
       }
       //check user
     //  const module = await moduleModel.findOne({ name });
       //exisiting user
     //if (module.filiere === filiere) {
     //    return res.status(200).send({
      //      success: false,
     //       message: "module Already exisite",
     //      });
     //  }
     //save
     const user = await new moduleModel({
           name,
           filiere,
           semestre,
      }).save();

   res.status(201).send({
           success: true,
           message: "module saved Successfully",
           user,
      });

    } catch (error) {
       console.log(error)
       res.status(500).send({
           success:false,
           message:'Error in save module',
           error
       })
    }
};


// get all modules
export const modulesControlller = async (req, res) => {
    try {
      const modules = await moduleModel.find({});
      res.status(200).send({
        success: true,
        message: "All module List",
        modules,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all module",
      });
    }
  };


//update module
export const updateModuleController = async (req, res) => {
    try {
      const { name, filiere, semestre} = req.body;
      const { id } = req.params;
      const module = await moduleModel.findByIdAndUpdate(
        id,
        { name, filiere, semestre},
        { new: true }
      );
      res.status(200).send({
        success: true,
        messsage: "module Updated Successfully",
        module,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while updating module",
      });
    }
  };

//delete module
export const deleteModuleController = async (req, res) => {
    try {
      const { id } = req.params;
      await moduleModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "Module Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while deleting Module",
        error,
      });
    }
  };


  //get module
export const getModuleControlller = async (req, res) => {
  try {
    const { id } = req.params;
    const module=await moduleModel.findById(id);
    res.status(200).send({
      success: true,
      message: "Module Deleted Successfully",
      module
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting Module",
      error,
    });
  }
};