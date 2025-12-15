/* eslint-disable @typescript-eslint/no-explicit-any */
import { Db, ObjectId } from 'mongodb';

export interface IUser {
    _id?: ObjectId;
    user_id: string;
    name: string;
    email: string;
    phone?: string;
    password_hash: string;
    profile_picture?: string;
    date_of_birth?: Date;
    gender?: 'male' | 'female' | 'other';
    address?: string;
    city?: string;
    registration_date: Date;
    last_login?: Date;
    preferences?: Record<string, unknown>;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}

export class UserModel {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    async create(userData: Omit<IUser, '_id' | 'registration_date' | 'created_at' | 'updated_at'>): Promise<IUser> {
        const user: IUser = {
            ...userData,
            registration_date: new Date(),
            created_at: new Date(),
            updated_at: new Date(),
        };

        const result = await this.db.collection('users').insertOne(user as any);
        return { ...user, _id: result.insertedId };
    }

    async findById(userId: string): Promise<IUser | null> {
        const result = await this.db.collection('users').findOne({ user_id: userId });
        return result as any as IUser | null;
    }

    async findByEmail(email: string): Promise<IUser | null> {
        const result = await this.db.collection('users').findOne({ email });
        return result as any as IUser | null;
    }

    async findAll(filter: Record<string, unknown> = {}): Promise<IUser[]> {
        const results = await this.db.collection('users').find(filter).toArray();
        return results as any as IUser[];
    }

    async update(userId: string, updateData: Partial<IUser>): Promise<any> {
        return await this.db.collection('users').updateOne(
            { user_id: userId },
            { $set: { ...updateData, updated_at: new Date() } }
        );
    }

    async delete(userId: string): Promise<any> {
        return await this.db.collection('users').deleteOne({ user_id: userId });
    }

    async updateLastLogin(userId: string): Promise<any> {
        return await this.db.collection('users').updateOne(
            { user_id: userId },
            { $set: { last_login: new Date() } }
        );
    }
}
