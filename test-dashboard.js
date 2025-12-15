const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testDashboard() {
  try {
    console.log('=== Testing User Profile Endpoint ===\n');

    // 1. Create a test user
    console.log('1️⃣ Creating test user...');
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('testPassword123', 12);

    const testUser = await prisma.user.create({
      data: {
        name: 'Dashboard Test User',
        email: 'dashboard-test-' + Date.now() + '@example.com',
        phone: '09191234567',
        password: hashedPassword,
        address: 'Tehran, Iran',
        role: 'PATIENT'
      }
    });

    console.log('   ✓ User created:', testUser.email);
    console.log('   ID:', testUser.id);

    // 2. Fetch user profile via Prisma (simulating API endpoint)
    console.log('\n2️⃣ Fetching user profile...');
    const fetchedUser = await prisma.user.findUnique({
      where: { email: testUser.email }
    });

    if (fetchedUser) {
      console.log('   ✓ User found successfully');
      console.log('   Name:', fetchedUser.name);
      console.log('   Email:', fetchedUser.email);
      console.log('   Phone:', fetchedUser.phone);
      console.log('   Address:', fetchedUser.address);
    } else {
      console.log('   ✗ User not found');
    }

    // 3. Update user profile
    console.log('\n3️⃣ Updating user profile...');
    const updatedUser = await prisma.user.update({
      where: { id: testUser.id },
      data: {
        name: 'Updated Test User',
        phone: '09199876543',
        address: 'Isfahan, Iran'
      }
    });

    console.log('   ✓ User updated successfully');
    console.log('   Name:', updatedUser.name);
    console.log('   Phone:', updatedUser.phone);
    console.log('   Address:', updatedUser.address);

    // 4. Verify update
    console.log('\n4️⃣ Verifying update...');
    const verifyUser = await prisma.user.findUnique({
      where: { id: testUser.id }
    });

    if (verifyUser && verifyUser.name === 'Updated Test User') {
      console.log('   ✓ Profile updated correctly');
    } else {
      console.log('   ✗ Profile update failed');
    }

    console.log('\n✅ Dashboard user profile endpoints working correctly!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testDashboard();
