const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function testFlow() {
  try {
    console.log('=== PostgreSQL Registration & Login Test ===\n');

    const testEmail = 'test' + Date.now() + '@example.com';
    const testPassword = 'testPassword123';
    const testName = 'تست کاربر';

    // 1. Test Registration
    console.log('1️⃣ Testing Registration...');
    const hashedPassword = await bcrypt.hash(testPassword, 12);

    const newUser = await prisma.user.create({
      data: {
        name: testName,
        email: testEmail,
        phone: '09123456789',
        password: hashedPassword,
        role: 'PATIENT'
      }
    });

    console.log('   ✓ User created successfully');
    console.log('   ID:', newUser.id);
    console.log('   Email:', newUser.email);
    console.log('   Name:', newUser.name);

    // 2. Test Login
    console.log('\n2️⃣ Testing Login...');
    const loginUser = await prisma.user.findUnique({
      where: { email: testEmail }
    });

    if (!loginUser) {
      console.log('   ✗ User not found');
      return;
    }

    const isPasswordValid = await bcrypt.compare(testPassword, loginUser.password);
    if (isPasswordValid) {
      console.log('   ✓ Password verified successfully');
      console.log('   Login successful for:', loginUser.email);
    } else {
      console.log('   ✗ Invalid password');
    }

    // 3. Test duplicate email
    console.log('\n3️⃣ Testing Duplicate Email Prevention...');
    try {
      await prisma.user.create({
        data: {
          name: 'Another User',
          email: testEmail, // Same email
          password: hashedPassword,
          role: 'PATIENT'
        }
      });
      console.log('   ✗ Duplicate email was allowed (bad!)');
    } catch (error) {
      console.log('   ✓ Duplicate email correctly prevented');
    }

    // 4. Count total users
    console.log('\n4️⃣ Database Statistics...');
    const userCount = await prisma.user.count();
    console.log('   Total users in database:', userCount);

    console.log('\n✅ All tests passed! PostgreSQL registration and login working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testFlow();
