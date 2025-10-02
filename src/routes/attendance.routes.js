import express from "express";
import { attendanceController } from "../controllers/attendance.controller.js";

const router = express.Router();

router.get("/", attendanceController.getAll);
router.get("/:id", attendanceController.getById);
router.post("/", attendanceController.create);
router.put("/:id", attendanceController.update);
router.delete("/:id", attendanceController.remove);

export default router;