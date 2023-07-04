import express from "express";
import { requireSignIn , isAdmin} from './../middlewares/userMiddlewares.js';
import {addElementController,elementsControlller,deleteElementController
        ,updateElementController} from "../controllers/elementController.js";


//router object
const router = express.Router();


// add elment
router.post("/add-element", requireSignIn, isAdmin, addElementController);

//getALl element
router.get("/get-elements",requireSignIn, isAdmin, elementsControlller);

//update module
router.put("/update-element/:id",requireSignIn,isAdmin,updateElementController);

//delete elment
router.delete("/delete-element/:id",requireSignIn,isAdmin,deleteElementController);


export default router;