import { classService } from "../services/class.service.js";

export const classController = {
  async getAll(req, res) {
    try {
      const classes = await classService.getAll();
      res.json(classes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const cls = await classService.getById(req.params.id);
      if (!cls) return res.status(404).json({ message: "Class not found" });
      res.json(cls);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const cls = await classService.create(req.body);
      res.status(201).json(cls);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const cls = await classService.update(req.params.id, req.body);
      res.json(cls);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async remove(req, res) {
    try {
      await classService.remove(req.params.id);
      res.json({ message: "Class deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};