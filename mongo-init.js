// MongoDB Initialization Script
// This script creates databases and collections with proper structure

db = db.getSiblingDB('admin');
db.auth('root', 'iapqIvsm1GACa6OPHFnqQhWl');

// Create app database
db = db.getSiblingDB('my-app');

// Create app1 database reference
db = db.getSiblingDB('app1');
print('Created app1 database');

// Create app2 database with Rozaneh data
db = db.getSiblingDB('app2');
print('Created app2 database');

// Create collections for Rozaneh in app2
db.createCollection('users', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['email', 'name'],
            properties: {
                user_id: { bsonType: 'string' },
                name: { bsonType: 'string' },
                email: { bsonType: 'string' },
                phone: { bsonType: 'string' },
                password_hash: { bsonType: 'string' },
                is_active: { bsonType: 'bool' },
                created_at: { bsonType: 'date' },
                updated_at: { bsonType: 'date' }
            }
        }
    }
});
print('Created users collection in app2');

db.createCollection('therapists', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['name', 'email', 'specializations'],
            properties: {
                therapist_id: { bsonType: 'string' },
                name: { bsonType: 'string' },
                email: { bsonType: 'string' },
                phone: { bsonType: 'string' },
                specializations: { bsonType: 'array' },
                experience_years: { bsonType: 'int' },
                rating: { bsonType: 'double' },
                hourly_rate: { bsonType: 'int' },
                is_active: { bsonType: 'bool' },
                created_at: { bsonType: 'date' },
                updated_at: { bsonType: 'date' }
            }
        }
    }
});
print('Created therapists collection in app2');

db.createCollection('employees', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['name', 'email', 'position'],
            properties: {
                employee_id: { bsonType: 'string' },
                name: { bsonType: 'string' },
                email: { bsonType: 'string' },
                phone: { bsonType: 'string' },
                position: { bsonType: 'string' },
                department: { bsonType: 'string' },
                hire_date: { bsonType: 'date' },
                status: { enum: ['active', 'inactive', 'on_leave'] },
                is_active: { bsonType: 'bool' },
                created_at: { bsonType: 'date' },
                updated_at: { bsonType: 'date' }
            }
        }
    }
});
print('Created employees collection in app2');

db.createCollection('assessments_results', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['user_id', 'test_name', 'result_date'],
            properties: {
                assessment_id: { bsonType: 'string' },
                user_id: { bsonType: 'string' },
                therapist_id: { bsonType: 'string' },
                test_name: { bsonType: 'string' },
                test_category: { bsonType: 'string' },
                score: { bsonType: 'int' },
                percentage: { bsonType: 'double' },
                result_date: { bsonType: 'date' },
                interpretation: { bsonType: 'string' },
                created_at: { bsonType: 'date' },
                updated_at: { bsonType: 'date' }
            }
        }
    }
});
print('Created assessments_results collection in app2');

// Create indexes for better performance
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ user_id: 1 });
db.therapists.createIndex({ therapist_id: 1 });
db.therapists.createIndex({ specializations: 1 });
db.employees.createIndex({ employee_id: 1 });
db.employees.createIndex({ department: 1 });
db.assessments_results.createIndex({ user_id: 1 });
db.assessments_results.createIndex({ assessment_id: 1 });
db.assessments_results.createIndex({ test_name: 1 });

print('✓ All collections and indexes created successfully in app2');
