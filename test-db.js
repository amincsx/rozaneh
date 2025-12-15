const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function test() {
  try {
    console.log('Testing database connection...');
    const result = await prisma.$executeRawUnsafe('SELECT 1');
    console.log('✓ Database connection successful');

    // Try to fetch comments
    const comments = await prisma.comment.findMany({ take: 5 });
    console.log('✓ Comments fetched:', comments.length, 'comments found');
  } catch (error) {
    console.error('✗ Database error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();
