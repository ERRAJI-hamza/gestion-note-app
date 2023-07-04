import express from "express";
import { requireSignIn , isAdmin} from './../middlewares/userMiddlewares.js';
import {addModuleController ,modulesControlller ,deleteModuleController,
        updateModuleController,getModuleControlller} from "../controllers/moduleController.js";
//router object
const router = express.Router();


// add module
router.post("/add-module", requireSignIn, isAdmin,addModuleController);

//getALl module
router.get("/get-modules",requireSignIn, isAdmin, modulesControlller);

//delete module
router.delete("/delete-module/:id",requireSignIn,isAdmin,deleteModuleController);

//update module
router.put("/update-module/:id",requireSignIn,isAdmin,updateModuleController);


//get module
router.get("/get-module/:id",requireSignIn, getModuleControlller);

export default router;