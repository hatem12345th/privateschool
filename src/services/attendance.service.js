import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const attendanceService = {
  async getAll() {
    return await prisma.attendance.findMany({
      include: { student: true },
    });
  },

  async getById(id) {
    return await prisma.attendance.findUnique({
      where: { id: Number(id) },
      include: { student: true },
    });
  },

  async create(data) {
    return await prisma.attendance.create({
      data,
    });
  },

  async update(id, data) {
    return await prisma.attendance.update({
      where: { id: Number(id) },
      data,
    });
  },

  async remove(id) {
    return await prisma.attendance.delete({
      where: { id: Number(id) },
    });
  },
};