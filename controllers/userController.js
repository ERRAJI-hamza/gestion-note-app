import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/userHelpers.js";
import JWT from "jsonwebtoken";

export const addProfController = async (req, res) => {
             try {
                const { firstName, lastName, email, password, speciality} = req.body;
                //validations
                if(!firstName) {
                    return res.send({ message: "firstName is Required" });
                }
                if(!lastName) {
                    return res.send({ message: "lastName is Required" });
                }
                if(!email) {
                    return res.send({ message: "email is Required" });
                }
                if(!password) {
                   return res.send({ message: " password is Required" });
                }
                if(!speciality) {
                   return res.send({ message: "speciality is Required" });
                }
                //check user
                const exisitingUser = await userModel.findOne({ email });
                //exisiting user
              if (exisitingUser) {
                  return res.status(200).send({
                  success: false,
                  message: "Already Register",
                  });
                }
             //add prof
              const hashedPassword = await hashPassword(password);
              //save
              const user = await new userModel({
                      firstName,
                      lastName,
                      email,
                      password: hashedPassword,
                      speciality,
               }).save();

            res.status(201).send({
                    success: true,
                    message: "User Register Successfully",
                    user,
               });

             } catch (error) {
                console.log(error)
                res.status(500).send({
                    success:false,
                    message:'Error in Registreration',
                    error
                })
             }
};

//POST LOGIN
export const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
      //validation
      if (!email || !password) {
        return res.status(404).send({
          success: false,
          message: "Invalid email or password",
        });
      }
      //check user
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Email is not registerd",
        });
      }
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(200).send({
          success: false,
          message: "Invalid Password",
        });
      }
      //token
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({
        success: true,
        message: "login successfully",
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          speciality: user.speciality,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in login",
        error,
      });
    }
  };

  //test controller
export const testController = (req, res) => {
    try {
      res.send("Protected Routes");
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
  };
  

// get all prof
export const profControlller = async (req, res) => {
  try {
    const profs = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "All prof List",
      profs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all professeur",
    });
  }
};

//update prof
export const updateProfController = async (req, res) => {
  try {
    const { firstName, lastName, email, password, speciality} = req.body;
    const { id } = req.params;
    const prof = await userModel.findByIdAndUpdate(
      id,
      { firstName, lastName , email , password , speciality },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "prof Updated Successfully",
      prof,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating prof",
    });
  }
};

//delete prof
export const deleteProfController = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Prof Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting Prof",
      error,
    });
  }
};

//get prof
export const getProfController = async (req, res) => {
  try {
    const { id } = req.params;
    const prof=await userModel.findById(id);
    res.status(200).send({
      success: true,
      message: "get Prof Successfully",
      prof
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting Prof",
      error,
    });
  }
};