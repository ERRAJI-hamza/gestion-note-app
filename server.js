import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js"
import moduleRoute from "./routes/moduleRoute.js"
import elementRoute from "./routes/elementRoute.js"
import profRoute from "./routes/profRoute.js"
import noteRoute from "./routes/noteRoute.js"

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/user", userRoute);
app.use("/api/user", moduleRoute);
app.use("/api/user", elementRoute);
app.use("/api/user", profRoute);
app.use("/api/user", noteRoute);

//rest api
app.get('/',(req,res) => {
    res.send({
        message: "bismilah"
    });
});

//port
const PORT = process.env.PORT || 8080;

app.listen(PORT,() => {
    console.log(`Server runing on ${PORT}`.bgCyan.white);
})