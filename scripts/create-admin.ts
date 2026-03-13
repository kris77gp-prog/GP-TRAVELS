import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const username = process.env.ADMIN_USERNAME || "admin";
    const password = process.env.ADMIN_PASSWORD || "admin123";

    // Enforce strong password policy
    if (password.length < 12 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
        throw new Error("Password must be at least 12 characters long and include uppercase, lowercase, numeric, and special characters.");
    }

    const email = "admin@gptour.com";

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
        where: { username },
    });

    if (existingAdmin) {
        console.log("Admin user already exists. Updating password...");
        const hashedPassword = await bcrypt.hash(password, 12);
        await prisma.user.update({
            where: { username },
            data: { password: hashedPassword },
        });
        console.log("Admin password updated.");
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
            role: "admin",
        },
    });

    console.log("Admin user created successfully with hashed password!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
