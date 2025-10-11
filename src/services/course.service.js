import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const courseService = {
  async getAll() {
    return await prisma.course.findMany({
      select:{
        id:true,
        teacherId:true,
        credits:true,
        classId:true
      }
    });
  },

  async getById(id) {
    return await prisma.course.findUnique({
      where: { id: Number(id) },
      include: { class: true },
    });
  },

  async create(data) {
    return await prisma.course.create({
      data:{
        name:data.name,
        credits:data.credits,
        teacherId:data.teacherId,
        classId:data.c
      },
    });
  },

  async update(id, data) {
    return await prisma.course.update({
      where: { id: Number(id) },
      data,
    });
  },

  async remove(id) {
    return await prisma.course.delete({
      where: { id: Number(id) },
    });
  },
};