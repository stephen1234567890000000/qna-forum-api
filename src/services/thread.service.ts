import { prisma } from "../lib/prisma";
import { AppError } from "../utils/appError";

interface CreateThreadInput {
  title: string;
  content: string;
}

interface UpdateThreadInput {
  title: string;
  content: string;
}

export const createThread = async (
  input: CreateThreadInput,
  userId: string,
) => {
  return prisma.thread.create({
    data: {
      userId,
      title: input.title,
      content: input.content,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
};

export const getAllThreads = async () => {
  return prisma.thread.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
};

export const getMyThreads = async (userId: string) => {
  return prisma.thread.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getThreadById = async (threadId: string) => {
  const thread = await prisma.thread.findUnique({
    where: {
      id: threadId,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  if (!thread) {
    throw new AppError("Thread not found", 404);
  }

  return thread;
};

export const updateThread = async (
  id: string,
  userId: string,
  input: UpdateThreadInput,
) => {
  const thread = await prisma.thread.findUnique({
    where: { id },
  });

  if (!thread) {
    throw new AppError("Thread not found", 404);
  }

  if (thread.userId !== userId) {
    throw new AppError("You are not authorized to update this thread", 403);
  }

  return prisma.thread.update({
    where: { id },
    data: {
      title: input.title,
      content: input.content,
    },
  });
};

export const deleteThread = async (id: string, userId: string) => {
  const thread = await prisma.thread.findUnique({
    where: { id },
  });

  if (!thread) {
    throw new AppError("Thread not found", 404);
  }

  if (thread.userId !== userId) {
    throw new AppError("You are not authorized to delete this thread", 403);
  }

  return prisma.thread.delete({
    where: { id },
  });
};
