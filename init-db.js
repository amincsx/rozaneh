// Save this as: init-db.js and run with: node init-db.js

const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb://root:iapqIvsm1GACa6OPHFnqQhWl@el-capitan.liara.cloud:34070/app2?authSource=admin';

async function initializeDatabase() {
    const client = new MongoClient(MONGODB_URI);

    try {
        await client.connect();
        console.log('✓ Connected to MongoDB');

        const db = client.db('app2');
        console.log('✓ Using database: app2');

        // Insert sample data to create collections
        const users = await db.collection('users').insertOne({
            user_id: 'user_sample_' + Date.now(),
            name: 'احمد علی',
            email: 'ahmad@rozaneh.com',
            phone: '09123456789',
            is_active: true,
            created_at: new Date(),
            updated_at: new Date(),
        });
        console.log('✓ users collection created');

        const therapists = await db.collection('therapists').insertOne({
            therapist_id: 'therapist_sample_' + Date.now(),
            name: 'دکتر محمد',
            email: 'doctor@rozaneh.com',
            specializations: ['مشاوره فردی'],
            experience_years: 10,
            languages: ['فارسی'],
            rating: 4.5,
            hourly_rate: 300000,
            is_active: true,
            created_at: new Date(),
            updated_at: new Date(),
        });
        console.log('✓ therapists collection created');

        const employees = await db.collection('employees').insertOne({
            employee_id: 'emp_sample_' + Date.now(),
            name: 'فاطمه',
            email: 'fateme@rozaneh.com',
            position: 'مشاور',
            department: 'Clinical',
            status: 'active',
            is_active: true,
            created_at: new Date(),
            updated_at: new Date(),
        });
        console.log('✓ employees collection created');

        const assessments = await db.collection('assessments_results').insertOne({
            assessment_id: 'assess_sample_' + Date.now(),
            user_id: users.insertedId.toString(),
            test_name: 'Depression Scale',
            score: 45,
            percentage: 75,
            result_date: new Date(),
            duration_minutes: 15,
            created_at: new Date(),
            updated_at: new Date(),
        });
        console.log('✓ assessments_results collection created');

        // List collections
        const collectionsList = await db.listCollections().toArray();
        console.log('\n✓ Collections in app2:');
        collectionsList.forEach(col => console.log(`  - ${col.name}`));

        console.log('\n✅ SUCCESS! Database app2 initialized with data');
        console.log('Now open MongoDB Compass and connect with:');
        console.log('mongodb://root:iapqIvsm1GACa6OPHFnqQhWl@el-capitan.liara.cloud:34070/app2?authSource=admin');
        console.log('\nYou should see app2 database with 4 collections');

    } catch (error) {
        console.error('✗ Error:', error.message);
        process.exit(1);
    } finally {
        await client.close();
    }
}

initializeDatabase();
