import { prisma } from './db';

export async function getSiteSettings() {
    const settings = await prisma.siteSettings.findMany();
    const settingsMap: Record<string, string> = {};
    settings.forEach(s => {
        settingsMap[s.key] = s.value;
    });
    return settingsMap;
}

export async function getTestimonials() {
    return await prisma.testimonial.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export const CONTACT_INFO = {
    phone: '+1234567890',
    whatsapp: '+1234567890',
};
