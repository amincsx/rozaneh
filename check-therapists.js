const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
    try {
        const therapists = await prisma.therapistProfile.findMany({
            select: { id: true, name: true }
        });
        console.log('Number of therapist profiles:', therapists.length);
        if (therapists.length > 0) {
            console.log('Therapist IDs:', therapists.map(t => t.id).join(', '));
        } else {
            console.log('NO THERAPIST PROFILES FOUND IN DATABASE');
        }
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
})();
