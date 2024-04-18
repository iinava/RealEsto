import express, { Router } from "express";
import { VerifyToken } from "../middlewares/VerifyToke.js";
import { addpost, deletepost, getpost, getposts, saveposts, updatepost } from "../controllers/post.controllers.js";

const router = express.Router();

router.get('/getposts',getposts)
router.post('/save',VerifyToken,saveposts)
router.get('/getpost/:id',getpost)
router.post('/addpost',VerifyToken,addpost)
router.put('/updatepost/:id',VerifyToken,updatepost)
router.delete('/deletepost/:id',VerifyToken,deletepost)

export default router; 