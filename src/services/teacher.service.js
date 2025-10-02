import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const teacherService = {
  async getAll() {
    return await prisma.teacher.findMany();
  },

  async getById(id) {
    return await prisma.teacher.findUnique({
      where: { id: Number(id) },
    });
  },

  async create(data) {
    return await prisma.teacher.create({ data });
  },

  async update(id, data) {
    return await prisma.teacher.update({
      where: { id: Number(id) },
      data,
    });
  },

  async remove(id) {
    return await prisma.teacher.delete({
      where: { id: Number(id) },
    });
  },
};