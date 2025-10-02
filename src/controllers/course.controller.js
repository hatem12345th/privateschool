import { courseService } from "../services/course.service.js";

export const courseController = {
  async getAll(req, res) {
    try {
      const courses = await courseService.getAll();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const course = await courseService.getById(req.params.id);
      if (!course) return res.status(404).json({ message: "Course not found" });
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const course = await courseService.create(req.body);
      res.status(201).json(course);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const course = await courseService.update(req.params.id, req.body);
      res.json(course);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async remove(req, res) {
    try {
      await courseService.remove(req.params.id);
      res.json({ message: "Course deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};