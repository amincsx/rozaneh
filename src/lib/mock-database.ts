// Temporary in-memory storage for when MongoDB is not available
interface UserDocument {
    _id?: string;
    user_id?: string;
    therapist_id?: string;
    employee_id?: string;
    email: string;
    [key: string]: unknown;
}

const inMemoryUsers: UserDocument[] = [];
const inMemoryTherapists: UserDocument[] = [];
const inMemoryEmployees: UserDocument[] = [];

let mockDatabaseInstance: MockDatabase | null = null;

class MockDatabase {
    isConnected: boolean;

    constructor() {
        this.isConnected = true;
    }

    collection(name: string) {
        let storage: UserDocument[];
        switch (name) {
            case 'users': storage = inMemoryUsers; break;
            case 'therapists': storage = inMemoryTherapists; break;
            case 'employees': storage = inMemoryEmployees; break;
            default: storage = [];
        }

        return {
            async findOne(query: Partial<UserDocument>) {
                console.log('[MockDB] Finding in', name, 'with query:', query);
                const result = storage.find(item => {
                    if (query.email) return item.email === query.email;
                    if (query.user_id) return item.user_id === query.user_id;
                    if (query.therapist_id) return item.therapist_id === query.therapist_id;
                    if (query.employee_id) return item.employee_id === query.employee_id;
                    return false;
                });
                console.log('[MockDB] Found:', result ? 'yes' : 'no');
                return result || null;
            },

            async insertOne(document: UserDocument) {
                console.log('[MockDB] Inserting into', name, ':', document);
                const newDoc = {
                    ...document,
                    _id: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
                };
                storage.push(newDoc);
                console.log('[MockDB] Inserted successfully. Total items in', name, ':', storage.length);
                return { insertedId: newDoc._id };
            },

            async updateOne(filter: Partial<UserDocument>, update: { $set?: Partial<UserDocument> }) {
                console.log('[MockDB] Updating in', name);
                const item = storage.find(item => {
                    if (filter.email) return item.email === filter.email;
                    if (filter.user_id) return item.user_id === filter.user_id;
                    if (filter.therapist_id) return item.therapist_id === filter.therapist_id;
                    if (filter.employee_id) return item.employee_id === filter.employee_id;
                    return false;
                });
                if (item && update.$set) {
                    Object.assign(item, update.$set);
                    console.log('[MockDB] Updated successfully');
                }
                return { modifiedCount: item ? 1 : 0 };
            }
        };
    }
}

export function createMockDatabase() {
    if (!mockDatabaseInstance) {
        mockDatabaseInstance = new MockDatabase();
    }
    return mockDatabaseInstance;
}

export function getMockDatabaseStats() {
    return {
        users: inMemoryUsers.length,
        therapists: inMemoryTherapists.length,
        employees: inMemoryEmployees.length,
        totalItems: inMemoryUsers.length + inMemoryTherapists.length + inMemoryEmployees.length
    };
}