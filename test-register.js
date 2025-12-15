const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testRegistration() {
  try {
    console.log('Testing user registration with PostgreSQL...');

    // Test data
    const testUser = {
      name: 'تست کاربر',
      email: 'test' + Date.now() + '@example.com',
      phone: '09123456789',
      password: 'password123'
    };

    console.log('Creating user:', testUser.email);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: testUser.email }
    });

    if (existingUser) {
      console.log('✗ User already exists');
      return;
    }

    // Hash password
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(testUser.password, 12);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name: testUser.name,
        email: testUser.email,
        phone: testUser.phone,
        password: hashedPassword,
        role: 'PATIENT'
      }
    });

    console.log('✓ User created successfully:');
    console.log('  ID:', newUser.id);
    console.log('  Email:', newUser.email);
    console.log('  Name:', newUser.name);

  } catch (error) {
    console.error('✗ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testRegistration();
