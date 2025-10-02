import * as paymentService from "../services/payment.service.js";


export const createPayment = async (req, res) => {
  try {
    const payment = await paymentService.createPayment(req.body);
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPayments = async (req, res) => {
  try {
    const payments = await paymentService.getPayments();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const payment = await paymentService.getPaymentById(req.params.id);
    if (!payment) return res.status(404).json({ error: "Payment not found" });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePayment = async (req, res) => {
  try {
    const payment = await paymentService.updatePayment(req.params.id, req.body);
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePayment = async (req, res) => {
  try {
    await paymentService.deletePayment(req.params.id);
    res.json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import * as staffService from "../services/staff.service.js";

export const createStaff = async (req, res) => {
  try {
    const staff = await staffService.createStaff(req.body);
    res.status(201).json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStaff = async (req, res) => {
  try {
    const staff = await staffService.getStaff();
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStaffById = async (req, res) => {
  try {
    const staff = await staffService.getStaffById(req.params.id);
    if (!staff) return res.status(404).json({ error: "Staff not found" });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const staff = await staffService.updateStaff(req.params.id, req.body);
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    await staffService.deleteStaff(req.params.id);
    res.json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
