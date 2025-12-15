const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function list() {
    try {
        console.log('Listing columns for public.users...');
        const cols = await prisma.$queryRawUnsafe("SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='users'");
        console.log(cols.map(c => c.column_name).join(', '));

        console.log('\nFetching up to 100 users (id, email, name):');
        const users = await prisma.user.findMany({ select: { id: true, email: true, name: true }, take: 100 });
        console.log(`Found ${users.length} users`);
        users.forEach(u => console.log(u.id, u.email, u.name));
    } catch (e) {
        console.error('Error querying users:', e.message || e);
    } finally {
        await prisma.$disconnect();
    }
}

list();
