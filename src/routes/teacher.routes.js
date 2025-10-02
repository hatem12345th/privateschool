import express from "express";
import { teacherController } from "../controllers/teacher.controller.js";

const router = express.Router();

router.get("/", teacherController.getAll);
router.get("/:id", teacherController.getById);
router.post("/", teacherController.create);
router.put("/:id", teacherController.update);
router.delete("/:id", teacherController.remove);

export default router;