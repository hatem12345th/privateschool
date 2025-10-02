import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const studentService = {
  async getAll() {
    return await prisma.student.findMany({
      include: { class:true},
    });
  },

  async getById(id) {
    return await prisma.student.findUnique({
      where: { id: Number(id) },
      include: { class: true },
    });
  },

  async create(data) {
    return await prisma.student.create({ data });
  },

  async update(id, data) {
    return await prisma.student.update({
      where: { id: Number(id) },
      data,
    });
  },

  async remove(id) {
    return await prisma.student.delete({
      where: { id: Number(id) },
    });
  },
};