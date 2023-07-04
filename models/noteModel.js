import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        element: {
            type: mongoose.ObjectId,
            ref: "element",
            required: true,
        },
        etudiants:
        [  
           {
            etudiant: {
                type : String,
                require : true,
                trim: true,
            },
            noteCC: {
                type: Number,
                require : true,
             },
            noteTP: {
                type: Number,
                require : true,
             },
            notePr: {
                type: Number,
                require : true,
             },
           }
        ]
       
    },
    { timestamps: true }
);

export default mongoose.model("note",noteSchema);