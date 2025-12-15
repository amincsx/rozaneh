const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
    try {
        const comments = await prisma.comment.findMany({
            orderBy: { createdAt: 'desc' },
            take: 10
        });
        console.log('\n=== Recent Comments ===');
        console.log(`Total comments: ${comments.length}\n`);
        comments.forEach((comment, i) => {
            console.log(`${i + 1}. Therapist ID: ${comment.therapistId}`);
            console.log(`   User: ${comment.userName}`);
            console.log(`   Message: ${comment.message}`);
            console.log(`   Rating: ${comment.rating}/5`);
            console.log(`   Created: ${comment.createdAt.toLocaleString('fa-IR')}`);
            console.log(`   Status: ${comment.status}`);
            console.log('');
        });
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
})();
