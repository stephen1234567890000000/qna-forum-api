import { AppError } from "../utils/appError";
import { prisma } from "../lib/prisma";

export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId }, select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};
