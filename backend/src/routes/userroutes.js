import express from "express";
import User from "../models/Usermodel.js";
import History from "../models/Historymodel.js";
import { addUser, Claimpoint, getLeaderBoard, getUserHistory } from "../controller/usercontroller.js";

const router = express.Router();


router.post("/add", addUser);
router.get("/leaderboard", getLeaderBoard);
router.post("/claim/:id", Claimpoint);
router.get("/history/:id",getUserHistory);

export default router;
