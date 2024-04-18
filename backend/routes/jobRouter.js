import express from "express";
import {
  deleteJob,
  getAllJobs,
  getMyJobs,
  getSingleJob,
  postJobs,
  updateJob,
} from "../controllers/jobController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();
router.route("/getall").get(getAllJobs);
router.route("/postjob").post(isAuthorized, postJobs);
router.route("/getmyjob").get(isAuthorized, getMyJobs);
router.route("/updatejob/:id").put(isAuthorized, updateJob);
router.route("/deletejob/:id").delete(isAuthorized, deleteJob);
router.route("/:id").get(isAuthorized, getSingleJob);

export default router;
