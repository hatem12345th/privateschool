import { teacherService } from "../services/teacher.service.js";

export const teacherController = {
  async getAll(req, res) {
    try {
      const teachers = await teacherService.getAll();
      res.json(teachers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const teacher = await teacherService.getById(req.params.id);
      if (!teacher) return res.status(404).json({ message: "Teacher not found" });
      res.json(teacher);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const teacher = await teacherService.create(req.body);
      res.status(201).json(teacher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const teacher = await teacherService.update(req.params.id, req.body);
      res.json(teacher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async remove(req, res) {
    try {
      await teacherService.remove(req.params.id);
      res.json({ message: "Teacher deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};