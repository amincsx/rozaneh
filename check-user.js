const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
    try {
        // Check if user with email aaa@gmail.com exists
        const user = await prisma.user.findUnique({
            where: { email: 'aaa@gmail.com' },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true
            }
        });

        if (user) {
            console.log('\n✓ User found:');
            console.log(JSON.stringify(user, null, 2));
        } else {
            console.log('\n✗ User NOT found with email: aaa@gmail.com');

            // Show all users in database
            const allUsers = await prisma.user.findMany({
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    createdAt: true
                },
                take: 20
            });

            console.log(`\nTotal users in database: ${allUsers.length}`);
            if (allUsers.length > 0) {
                console.log('\nAll users:');
                allUsers.forEach(u => {
                    console.log(`  • ${u.email} - ${u.name || 'No name'} (${u.role})`);
                });
            }
        }
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
})();
