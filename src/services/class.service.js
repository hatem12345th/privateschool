import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const classService = {
  async getAll() {
    return await prisma.class.findMany({
      include: {
        teacher: true,
        students: true,
        courses: true,
      },
    });
  },

  async getById(id) {
    return await prisma.class.findUnique({
      where: { id: Number(id) },
      include: {
        teacher: true,
        students: true,
        courses: true,
      },
    });
  },

  async create(data) {
    return await prisma.class.create({
      data,
    });
  },

  async update(id, data) {
    return await prisma.class.update({
      where: { id: Number(id) },
      data,
    });
  },

  async remove(id) {
    await prisma.student.updateMany({
      where: { classId: Number(id) },
      data: { classId: null },
    });

    return await prisma.class.delete({
      where: { id: Number(id) },
    });
  },
};
