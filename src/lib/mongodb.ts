/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://root:iapqIvsm1GACa6OPHFnqQhWl@el-capitan.liara.cloud:34070/app2?authSource=admin';
const DATABASE_NAME = process.env.MONGODB_DB || 'app2';

console.log('[MongoDB] Connecting to:', MONGODB_URI?.replace(/password[^@]*@/, 'password:***@'));
console.log('[MongoDB] Database:', DATABASE_NAME);

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

interface GlobalWithMongo {
    mongo?: {
        client: MongoClient | null;
        db: Db | null;
        promise?: Promise<any> | null;
    };
}

let cached = (global as unknown as GlobalWithMongo).mongo;

if (!cached) {
    cached = (global as unknown as GlobalWithMongo).mongo = { client: null, db: null, promise: null };
}

export async function connectToDatabase() {
    if (cached!.client && cached!.db) {
        console.log('[MongoDB] Using cached connection');
        return cached!;
    }

    if (!cached!.promise) {
        cached!.promise = (async () => {
            try {
                console.log('[MongoDB] Creating new connection...');
                const client = new MongoClient(MONGODB_URI, {
                    maxPoolSize: 10,
                    minPoolSize: 2,
                    serverSelectionTimeoutMS: 30000,
                    connectTimeoutMS: 30000,
                    socketTimeoutMS: 30000,
                });

                // Create a timeout promise that rejects after 35 seconds
                const timeoutPromise = new Promise<void>((_, reject) => {
                    setTimeout(() => reject(new Error('MongoDB connection timeout')), 35000);
                });

                // Race between connection and timeout
                await Promise.race([client.connect(), timeoutPromise]);
                console.log('[MongoDB] ✓ Connected successfully');

                const db = client.db(DATABASE_NAME);
                console.log('[MongoDB] ✓ Database selected:', DATABASE_NAME);

                cached!.client = client;
                cached!.db = db;

                return cached!;
            } catch (error) {
                console.error('[MongoDB] ✗ Connection failed:', error);
                throw error;
            }
        })();
    }

    return await cached!.promise;
}

export async function getCollections() {
    const { db } = await connectToDatabase();

    if (!db) throw new Error('Database not connected');

    console.log('[MongoDB] Getting collections from database:', DATABASE_NAME);

    return {
        users: db.collection('users'),
        therapists: db.collection('therapists'),
        employees: db.collection('employees'),
        assessmentsResults: db.collection('assessments_results'),
    };
}

export async function closeDatabase() {
    if (cached!.client) {
        await cached!.client.close();
        console.log('[MongoDB] ✓ Connection closed');
        cached!.client = null;
        cached!.db = null;
        cached!.promise = null;
    }
}

export default connectToDatabase;
