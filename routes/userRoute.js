import express from "express";
import {loginController,
        testController,
        addProfController,
        profControlller,
        updateProfController,
        deleteProfController,
        getProfController} 
        from "../controllers/userController.js";
import { requireSignIn , isAdmin} from './../middlewares/userMiddlewares.js';

//router object
const router = express.Router();

//routing

//LOGIN || POST
router.post("/login", loginController);

//test routes
router.get("/test", requireSignIn , isAdmin , testController);

//protected route auth
router.get('/prof-auth',requireSignIn, (req,res)=>{
    res.status(200).send({ok:true});
})

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

// add professeur
router.post("/add-prof", requireSignIn, isAdmin,addProfController);

//getALl prof
router.get("/get-profs",requireSignIn, isAdmin, profControlller);

//update prof
router.put("/update-prof/:id",requireSignIn,isAdmin,updateProfController);

//delete category
router.delete("/delete-prof/:id",requireSignIn,isAdmin,deleteProfController);

//get prof
router.get("/get-prof/:id",requireSignIn, isAdmin,  getProfController);

export default router;