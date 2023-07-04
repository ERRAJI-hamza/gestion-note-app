import express from "express";
import { requireSignIn , isAdmin} from './../middlewares/userMiddlewares.js';
import {elementsbyProfControlller} from "../controllers/profController.js";


//router object
const router = express.Router();


//getALl element
router.get("/get-elements-by-prof/:id",requireSignIn, elementsbyProfControlller);



export default router;