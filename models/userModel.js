import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName : {
            type : String,
            require : true,
            trim: true,
        },
        lastName : {
            type : String,
            require : true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        speciality: {
            type: String,
            required: true,
        },
        role: {
            type: Number,
            default: 0,
        },  
    },
    { timestamps: true }
);

export default mongoose.model("users",userSchema);