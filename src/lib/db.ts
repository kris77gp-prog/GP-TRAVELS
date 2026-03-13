import { PrismaClient } from "@prisma/client";

console.log("Initializing Prisma Client...");
console.log("DATABASE_URL present:", !!process.env.DATABASE_URL);

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

console.log("Prisma Client initialized successfully.");

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
