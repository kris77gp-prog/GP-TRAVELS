const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    try {
        const tours = await prisma.tour.count();
        const cars = await prisma.car.count();
        const users = await prisma.user.count();
        const admin = await prisma.user.findFirst({ where: { role: 'admin' } });
        console.log({ 
            tours, 
            cars, 
            users, 
            adminUsername: admin?.username,
            adminRole: admin?.role 
        });
    } catch (error) {
        console.error("Database check failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

check();
