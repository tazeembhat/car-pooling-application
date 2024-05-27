//Importing modules
import  express  from "express";
import mongoose from "mongoose";
import models from "../carpooling-app/model/index.js";
import cors from 'cors';
import 'dotenv/config'

import route from '../carpooling-app/routes/index.js'



const carpooling = express();
carpooling.use(cors());
carpooling.use(express.json());
carpooling.use(express.urlencoded());
route(carpooling);

//connecting to mongodb
mongoose.connect(process.env.DATABASE_URI);

export default carpooling;


