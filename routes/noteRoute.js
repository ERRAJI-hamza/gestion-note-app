import express from "express";
import { requireSignIn} from './../middlewares/userMiddlewares.js';
import {notesControlller,addNotesController} from "../controllers/noteController.js";


//router object
const router = express.Router();

// add notes
router.post("/add-notes", requireSignIn, addNotesController);

//getALl note
router.get("/get-notes/:id",requireSignIn, notesControlller);

export default router;