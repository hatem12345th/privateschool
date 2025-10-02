import express from "express";
import { classController } from "../controllers/class.controller.js";

const router = express.Router();

router.get("/", classController.getAll);
router.get("/:id", classController.getById);
router.post("/", classController.create);
router.put("/:id", classController.update);
router.delete("/:id", classController.remove);

export default router;