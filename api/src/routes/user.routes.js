import express from "express";
import {
  deleteuser,
  getuser,
  getusers,
  profilepost,
  updateuser,
  notificationsNumber
} from "../controllers/User.controllers.js";
import { VerifyToken } from "../middlewares/VerifyToke.js";

const router = express.Router();

router.get("/getusers", getusers);
router.get("/profileposts", VerifyToken, profilepost);
router.get("/notification", VerifyToken, notificationsNumber);
router.get("/get/:id", VerifyToken, getuser);
router.put("/updateuser/:id", VerifyToken, updateuser);
router.delete("/deleteuser:id", VerifyToken, deleteuser);

export default router;
