import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createStaff = async (data) => {
  return await prisma.staff.create({ data });
};

export const getStaff = async () => {
  return await prisma.staff.findMany();
};

export const getStaffById = async (id) => {
  return await prisma.staff.findUnique({
    where: { id: parseInt(id) },
  });
};

export const updateStaff = async (id, data) => {
  return await prisma.staff.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const deleteStaff = async (id) => {
  return await prisma.staff.delete({
    where: { id: parseInt(id) },
  });
};