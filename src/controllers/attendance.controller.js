import { attendanceService } from "../services/attendance.service.js";

export const attendanceController = {
  async getAll(req, res) {
    try {
      const records = await attendanceService.getAll();
      res.json(records);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const record = await attendanceService.getById(req.params.id);
      if (!record) return res.status(404).json({ message: "Attendance not found" });
      res.json(record);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const record = await attendanceService.create(req.body);
      res.status(201).json(record);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const record = await attendanceService.update(req.params.id, req.body);
      res.json(record);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async remove(req, res) {
    try {
      await attendanceService.remove(req.params.id);
      res.json({ message: "Attendance deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};