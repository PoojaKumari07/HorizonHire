import express from "express"
import { getAllLecture, guestlecture } from "../controllers/guestlecture.controller.js";
import {  singleUpload } from "../middlewares/mutler.js";

const router=express.Router();

router.route("/register").post(singleUpload,guestlecture);
router.route("/get").get( getAllLecture);
export default router; 