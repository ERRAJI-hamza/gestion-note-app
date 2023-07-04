import elementModel from "../models/elementModel.js";
import noteModel from "../models/noteModel.js";


export const addNotesController = async (req, res) => {
    try {
       const { element, etudiants} = req.body;
       //validations
       if(!element) {
           return res.send({ message: "element is Required" });
       }
       if(!etudiants) {
           return res.send({ message: "etudiants is Required" });
       }
    
     const notes = await new noteModel({
        element,
        etudiants
      }).save();

   res.status(201).send({
           success: true,
           message: "notes saved Successfully",
           notes,
      });

    } catch (error) {
       console.log(error)
       res.send({
           success:false,
           message:'Error in save notes',
           error
       })
    }
};


// get all notes
export const notesControlller = async (req, res) => {
    try {
      const {id} = req.params;
      const notes = await noteModel.find({element : id});
      res.status(200).send({
        success: true,
        message: "All note List",
        notes,
      });
    } catch (error) {
      console.log(error);
      res.send({
        success: false,
        error,
        message: "Error while getting all note",
      });
    }
  };