import express from "express";
import {
    addmessages
} from "../controllers/messge.controllers.js";
import { VerifyToken } from "../middlewares/VerifyToke.js";

const router = express.Router();

router.post("/addmessages/:chatid", VerifyToken,addmessages);


export default router;
