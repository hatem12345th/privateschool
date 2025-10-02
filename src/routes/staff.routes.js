import express from "express";
import * as staffController from "../controllers/staff.controller.js";  

const router = express.Router();

router.post("/", staffController.studentController.createStaff);
router.get("/", staffController.studentController.getStaff);
router.get("/:id", staffController.studentController.getStaffById);
router.put("/:id", staffController.studentController.updateStaff);
router.delete("/:id", staffController.studentController.deleteStaff);

export default router;