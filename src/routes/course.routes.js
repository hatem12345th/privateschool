import express from "express";
import { courseController } from "../controllers/course.controller.js";

const router = express.Router();

router.get("/", courseController.getAll);
router.get("/:id", courseController.getById);
router.post("/", courseController.create);
router.put("/:id", courseController.update);
router.delete("/:id", courseController.remove);

export default router;
