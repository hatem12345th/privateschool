import { studentService } from "../services/student.service.js";

export const studentController = {
  async getStaff(req, res) {
    try {
      const students = await studentService.getAll();
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getStaffById(req, res) {
    try {
      const student = await studentService.getById(req.params.id);
      if (!student) return res.status(404).json({ message: "Student not found" });
      res.json(student);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createStaff(req, res) {
    try {
      const student = await studentService.create(req.body);
      res.status(201).json(student);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateStaff(req, res) {
    try {
      const student = await studentService.update(req.params.id, req.body);
      res.json(student);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteStaff(req, res) {
    try {
      await studentService.remove(req.params.id);
      res.json({ message: "Student deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};