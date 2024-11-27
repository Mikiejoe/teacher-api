import express from "express";
import mongoose from "mongoose";
import { config, } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { authRouter } from "./routers/auth.router.js";


const app = express()

config();


const dev = "https://itakuafty.vercel.app"
const prod = "http://localhost:5173"
const allowedOrigins = ["http://localhost:5173", "https://itakuafty.vercel.app"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());    

app.options("*", cors(corsOptions));

app.get("/health",(req,res)=>{
  res.json({"succes":"server running"})
})
app.get("/",(req,res)=>{
  res.json({"message":"Nothing here...!"})
})

app.use("/auth", authRouter);
// app.use("/",authMiddleware, chatRouter);

const PORT = process.env.PORT;
const DEBUG = process.env.DEBUG === "true";
console.log(DEBUG)
const MONGO_URI = DEBUG ? process.env.MONGO_DEV_URL : process.env.MONGO_PROD_URL; 
console.log(MONGO_URI)
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("error connecting to database", err);
  });

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});