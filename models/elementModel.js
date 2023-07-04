import mongoose from "mongoose";

const elementSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            require : true,
            trim: true,
        },
        module: {
            type: mongoose.ObjectId,
            ref: "module",
            required: true,
        },
        professeur: {
            type: mongoose.ObjectId,
            ref: "users",
            required: true,
        },
        coefficient: {
            type: Number,
            default: 50,
        },
    },
    { timestamps: true }
);

export default mongoose.model("element",elementSchema);