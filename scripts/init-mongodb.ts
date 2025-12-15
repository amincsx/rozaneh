import { MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb://root:iapqIvsm1GACa6OPHFnqQhWl@el-capitan.liara.cloud:34070/app2?authSource=admin';

async function initializeDatabase() {
    const client = new MongoClient(MONGODB_URI);

    try {
        await client.connect();
        console.log('✓ Connected to MongoDB');

        const db = client.db('app2');
        console.log('✓ Using database: app2');

        // Create collections with sample data
        const collections = [
            {
                name: 'users',
                data: {
                    user_id: 'user_test_001',
                    name: 'احمد علی',
                    email: 'ahmad@rozaneh.com',
                    phone: '09123456789',
                    password_hash: 'hashed_password',
                    is_active: true,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            },
            {
                name: 'therapists',
                data: {
                    therapist_id: 'therapist_test_001',
                    name: 'دکتر محمد',
                    email: 'doctor@rozaneh.com',
                    phone: '09123456789',
                    specializations: ['مشاوره فردی', 'خانواده درمانی'],
                    experience_years: 10,
                    bio: 'متخصص مشاوره خانواده',
                    languages: ['فارسی', 'English'],
                    rating: 4.5,
                    hourly_rate: 300000,
                    is_active: true,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            },
            {
                name: 'employees',
                data: {
                    employee_id: 'emp_test_001',
                    name: 'فاطمه',
                    email: 'fateme@rozaneh.com',
                    phone: '09123456789',
                    position: 'مشاور',
                    department: 'Clinical',
                    hire_date: new Date(),
                    salary: 5000000,
                    status: 'active',
                    is_active: true,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            },
            {
                name: 'assessments_results',
                data: {
                    assessment_id: 'assess_test_001',
                    user_id: 'user_test_001',
                    therapist_id: 'therapist_test_001',
                    test_name: 'Depression Scale',
                    test_category: 'Mental Health',
                    score: 45,
                    percentage: 75,
                    result_date: new Date(),
                    interpretation: 'Moderate depression',
                    duration_minutes: 15,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            },
        ];

        for (const collection of collections) {
            try {
                const result = await db.collection(collection.name).insertOne(collection.data);
                console.log(`✓ Created '${collection.name}' and inserted sample data`);
                console.log(`  Document ID: ${result.insertedId}`);
            } catch (error) {
                if (error instanceof Error && error.message.includes('E11000')) {
                    console.log(`✓ Collection '${collection.name}' already exists`);
                } else {
                    throw error;
                }
            }
        }

        // List all collections
        const collections_list = await db.listCollections().toArray();
        console.log('\n✓ All collections in app2:');
        collections_list.forEach(col => console.log(`  - ${col.name}`));

        console.log('\n✅ Database initialization complete!');
        console.log('Now refresh MongoDB Compass - you should see app2 with all collections');

    } catch (error) {
        console.error('✗ Error:', error);
    } finally {
        await client.close();
    }
}

initializeDatabase();
