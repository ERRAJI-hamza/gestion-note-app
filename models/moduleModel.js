import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            require : true,
            trim: true,
        },
        filiere: {
            type : String,
            require : true,
            enum : ["GI","IID","GE","IRIC","GPEE"],
        },
        semestre:{
            type : String,
            require : true,
            enum : ["S1","S2","S3","S4","S5"],
        },
        elementNumber: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.model("module",moduleSchema);