const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

(async () => {
    try {
        // Create user aaa@gmail.com with password "123456"
        const hashedPassword = await bcrypt.hash('123456', 10);

        const newUser = await prisma.user.create({
            data: {
                email: 'aaa@gmail.com',
                name: 'Test User',
                password: hashedPassword,
                role: 'USER',
                emailVerified: new Date()
            }
        });

        console.log('\n✓ User created successfully!');
        console.log('Email:', newUser.email);
        console.log('Name:', newUser.name);
        console.log('Role:', newUser.role);
        console.log('ID:', newUser.id);
        console.log('\nYou can now login with:');
        console.log('Email: aaa@gmail.com');
        console.log('Password: 123456');

    } catch (error) {
        if (error.code === 'P2002') {
            console.log('✗ User with email aaa@gmail.com already exists');
        } else {
            console.error('Error:', error.message);
        }
    } finally {
        await prisma.$disconnect();
    }
})();
