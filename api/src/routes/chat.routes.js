import express from "express";
import {
  getchats,
  getchat,
  addchat,
  readchat,
} from "../controllers/chat.controllers.js";
import { VerifyToken } from "../middlewares/VerifyToke.js";


const router = express.Router();

router.get("/getchats", VerifyToken, getchats);
router.get("/getchat/:id", VerifyToken, getchat);
router.post("/addchat", VerifyToken, addchat);
router.put("/read/:id", VerifyToken, readchat);

export default router;
