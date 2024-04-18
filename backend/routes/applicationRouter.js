import express from "express";
import {
  employerGetAllApplication,
  jobSeekerGetAllApplication,
  jobSeekerDeleteApplication,
  postApplication,
} from "../controllers/applicationController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.route("/jobseeker/getall").get(isAuthorized, jobSeekerGetAllApplication);
router.route("/employer/getall").get(isAuthorized, employerGetAllApplication);
router.route("/delete/:id").delete(isAuthorized, jobSeekerDeleteApplication);
router.route("/post").post(isAuthorized, postApplication);

export default router;
