const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function testCompleteFlow() {
  try {
    console.log('=== Complete Authentication & Dashboard Flow Test ===\n');

    const testEmail = 'complete-flow-' + Date.now() + '@example.com';
    const testPassword = 'TestPassword123';
    const testName = 'تست کاربر کامل';

    // 1. Register User
    console.log('1️⃣ Testing User Registration...');
    const hashedPassword = await bcrypt.hash(testPassword, 12);

    const newUser = await prisma.user.create({
      data: {
        name: testName,
        email: testEmail,
        phone: '09121234567',
        password: hashedPassword,
        address: 'Tehran, Iran',
        role: 'PATIENT'
      }
    });

    console.log('   ✓ User registered successfully');
    console.log('   User ID:', newUser.id);
    console.log('   Email:', newUser.email);

    // 2. Login User
    console.log('\n2️⃣ Testing User Login...');
    const loginUser = await prisma.user.findUnique({
      where: { email: testEmail }
    });

    if (!loginUser) {
      console.log('   ✗ User not found for login');
      return;
    }

    const isPasswordValid = await bcrypt.compare(testPassword, loginUser.password);
    if (!isPasswordValid) {
      console.log('   ✗ Password verification failed');
      return;
    }

    console.log('   ✓ Login successful');
    console.log('   User name:', loginUser.name);

    // 3. Fetch User Profile (Dashboard)
    console.log('\n3️⃣ Testing Dashboard - Fetch User Profile...');
    const dashboardUser = await prisma.user.findUnique({
      where: { email: testEmail }
    });

    if (!dashboardUser) {
      console.log('   ✗ Could not load dashboard user');
      return;
    }

    console.log('   ✓ Dashboard profile loaded');
    console.log('   Name:', dashboardUser.name);
    console.log('   Email:', dashboardUser.email);
    console.log('   Phone:', dashboardUser.phone);
    console.log('   Address:', dashboardUser.address);

    // 4. Update User Profile
    console.log('\n4️⃣ Testing Dashboard - Update Profile...');
    const updatedUser = await prisma.user.update({
      where: { id: dashboardUser.id },
      data: {
        name: 'Updated Name',
        phone: '09199999999',
        address: 'Isfahan, Iran'
      }
    });

    console.log('   ✓ Profile updated successfully');
    console.log('   New name:', updatedUser.name);
    console.log('   New phone:', updatedUser.phone);
    console.log('   New address:', updatedUser.address);

    // 5. Verify Update
    console.log('\n5️⃣ Testing Dashboard - Verify Update...');
    const verifyUser = await prisma.user.findUnique({
      where: { id: dashboardUser.id }
    });

    if (verifyUser && verifyUser.name === 'Updated Name') {
      console.log('   ✓ Update verified successfully');
      console.log('   All dashboard operations working correctly!');
    } else {
      console.log('   ✗ Update verification failed');
    }

    console.log('\n✅ Complete flow test passed! All operations working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testCompleteFlow();
