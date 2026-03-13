import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const initialTours = [
    {
        title: "Malam Jabba Ski Resort",
        description: "Experience the thrill of skiing in the heart of the Swat Valley. Perfect for winter sports enthusiasts and families seeking a snowy escape.",
        destination: "Swat Valley, Pakistan",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop",
        price: "$299 - $450",
        duration: "3 Days / 2 Nights",
        featured: true,
    },
    {
        title: "Hunza Valley Autumn Tour",
        description: "Witness the golden colors of autumn in one of the most beautiful valleys on earth. Explore ancient forts and crystal blue lakes.",
        destination: "Gilgit-Baltistan",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop",
        price: "$550 - $800",
        duration: "7 Days / 6 Nights",
        featured: true,
    },
    {
        title: "Skardu Desert Adventure",
        description: "Discover the world's highest cold desert and the breathtaking Shangrila Resort. A unique blend of dunes and snow-capped peaks.",
        destination: "Skardu, Baltistan",
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop",
        price: "$450 - $650",
        duration: "5 Days / 4 Nights",
        featured: true,
    },
    {
        title: "Fairy Meadows Trek",
        description: "Wake up at the base of Nanga Parbat, the killer mountain. One of the most scenic campsites in the entire Himalayan range.",
        destination: "Nanga Parbat Base",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
        price: "$350 - $500",
        duration: "4 Days / 3 Nights",
        featured: false,
    },
    {
        title: "Karachi Beach Getaway",
        description: "Relax at the pristine beaches of Balochistan and Karachi. Enjoy fresh seafood and sunset boat rides.",
        destination: "Sindh/Balochistan Coast",
        image: "https://images.unsplash.com/photo-1506929197327-0e39faa1d62c?q=80&w=1974&auto=format&fit=crop",
        price: "$200 - $350",
        duration: "2 Days / 1 Night",
        featured: false,
    }
];

const additionalTours = [
    {
        title: "Alleppey Backwaters",
        description: "Cruise through the serene backwaters of Alleppey on a traditional houseboat.",
        destination: "Alleppey, Kerala",
        image: "https://images.unsplash.com/photo-1575625769327-5c5b4b3c5a8e",
        price: "$150 - $300",
        duration: "2 Days / 1 Night",
        featured: true,
    },
    {
        title: "Munnar Tea Gardens",
        description: "Explore the lush green tea plantations and enjoy the cool climate of Munnar.",
        destination: "Munnar, Kerala",
        image: "https://images.unsplash.com/photo-1547721064-da6cfb341d50",
        price: "$200 - $400",
        duration: "3 Days / 2 Nights",
        featured: true,
    },
    {
        title: "Kumarakom Bird Sanctuary",
        description: "Witness exotic bird species in the tranquil Kumarakom Bird Sanctuary.",
        destination: "Kumarakom, Kerala",
        image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
        price: "$100 - $250",
        duration: "1 Day",
        featured: false,
    },
    {
        title: "Wayanad Wildlife Safari",
        description: "Experience the thrill of a wildlife safari in the forests of Wayanad.",
        destination: "Wayanad, Kerala",
        image: "https://images.unsplash.com/photo-1541872703-1f2a6a41d6a8",
        price: "$300 - $500",
        duration: "2 Days / 1 Night",
        featured: false,
    },
    {
        title: "Varkala Beach",
        description: "Relax on the pristine beaches of Varkala and enjoy the stunning cliff views.",
        destination: "Varkala, Kerala",
        image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
        price: "$100 - $200",
        duration: "1 Day",
        featured: true,
    }
];

const initialUsers = [
    {
        username: "admin",
        email: "admin@example.com",
        password: "securepassword", // This should be hashed in a real application
        role: "ADMIN",
    },
    {
        username: "user1",
        email: "user1@example.com",
        password: "password123", // This should be hashed in a real application
        role: "USER",
    }
];

const initialTestimonials = [
    {
        name: "John Doe",
        role: "Traveler",
        content: "This was the best tour I have ever been on! Highly recommend.",
        rating: 5,
    },
    {
        name: "Jane Smith",
        role: "Adventurer",
        content: "Amazing experience, great service, and beautiful locations.",
        rating: 4,
    }
];

const initialSiteSettings = [
    {
        key: "site_name",
        value: "GP-Travels",
    },
    {
        key: "contact_email",
        value: "support@gptravels.com",
    }
];

async function main() {
    console.log('Start seeding...');

    try {
        // Clear existing data
        await prisma.tour.deleteMany();
        await prisma.user.deleteMany();
        await prisma.testimonial.deleteMany();
        await prisma.siteSettings.deleteMany();

        // Seed tours
        for (const tour of initialTours) {
            const result = await prisma.tour.create({
                data: tour,
            });
            console.log(`Created tour with id: ${result.id}`);
        }

        // Seed additional tours
        for (const tour of additionalTours) {
            const result = await prisma.tour.create({
                data: tour,
            });
            console.log(`Created additional tour with id: ${result.id}`);
        }

        // Seed users
        for (const user of initialUsers) {
            const result = await prisma.user.create({
                data: user,
            });
            console.log(`Created user with id: ${result.id}`);
        }

        // Seed testimonials
        for (const testimonial of initialTestimonials) {
            const result = await prisma.testimonial.create({
                data: testimonial,
            });
            console.log(`Created testimonial with id: ${result.id}`);
        }

        // Seed site settings
        for (const setting of initialSiteSettings) {
            const result = await prisma.siteSettings.create({
                data: setting,
            });
            console.log(`Created site setting with key: ${result.key}`);
        }
    } catch (error) {
        console.error('Error during seeding:', error);
        process.exit(1);
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
