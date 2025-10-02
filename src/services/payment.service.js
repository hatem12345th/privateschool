import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createPayment = async (data) => {
  return await prisma.payment.create({ data });
};

export const getPayments = async () => {
  return await prisma.payment.findMany({
    include: { student: true },
  });
};

export const getPaymentById = async (id) => {
  return await prisma.payment.findUnique({
    where: { id: parseInt(id) },
    include: { student: true },
  });
};

export const updatePayment = async (id, data) => {
  return await prisma.payment.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const deletePayment = async (id) => {
  return await prisma.payment.delete({
    where: { id: parseInt(id) },
  });
};