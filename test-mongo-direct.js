const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb://root:iapqIvsm1GACa6OPHFnqQhWl@el-capitan.liara.cloud:34070/app2?authSource=admin';

async function testRegistration() {
    console.log('[Test] Starting MongoDB registration test...');

    try {
        // Test connection
        console.log('[Test] Connecting to MongoDB...');
        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        console.log('[Test] ✓ Connected successfully');

        const db = client.db('app2');
        console.log('[Test] ✓ Database selected: app2');

        // Test data
        const testUser = {
            user_id: `user_${Date.now()}_test`,
            name: 'Test User Direct',
            email: `test_${Date.now()}@example.com`,
            phone: '09123456789',
            password_hash: await bcrypt.hash('testpassword123', 12),
            is_active: true,
            registration_date: new Date(),
            last_login: null,
            created_at: new Date(),
            updated_at: new Date(),
            preferences: {},
            profile_picture: null,
            date_of_birth: null,
            gender: null,
            address: null,
            city: null,
        };

        console.log('[Test] Inserting test user:', testUser.email);

        // Insert user
        const result = await db.collection('users').insertOne(testUser);
        console.log('[Test] ✓ User inserted successfully:', result.insertedId);

        // Verify insertion by reading it back
        const foundUser = await db.collection('users').findOne({ user_id: testUser.user_id });
        if (foundUser) {
            console.log('[Test] ✓ User verified in database:', foundUser.email);
        } else {
            console.log('[Test] ✗ User not found after insertion');
        }

        // List all users to check
        const allUsers = await db.collection('users').find({}).toArray();
        console.log('[Test] Total users in database:', allUsers.length);

        await client.close();
        console.log('[Test] ✓ Connection closed');

    } catch (error) {
        console.error('[Test] Error:', error);
    }
}

testRegistration();