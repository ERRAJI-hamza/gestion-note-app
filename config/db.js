import mongoose from "mongoose";
import colors from 'colors';

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connect to mongodb database ${conn.connection.host}`.bgMagenta.white)
    }catch(error){
        console.log(`error in mongodb database ${error}`.bgRed.white)
    }
};

export default connectDB;