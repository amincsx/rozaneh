/* eslint-disable @typescript-eslint/no-explicit-any */
import { Db, ObjectId } from 'mongodb';

export interface ITherapist {
    _id?: ObjectId;
    therapist_id: string;
    name: string;
    email: string;
    phone?: string;
    specializations: string[];
    experience_years: number;
    bio?: string;
    education?: string[];
    certifications?: string[];
    languages: string[];
    rating: number;
    hourly_rate: number;
    availability?: Record<string, unknown>;
    profile_picture?: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}

export class TherapistModel {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    async create(therapistData: Omit<ITherapist, '_id' | 'created_at' | 'updated_at'>): Promise<ITherapist> {
        const therapist: ITherapist = {
            ...therapistData,
            created_at: new Date(),
            updated_at: new Date(),
        };

        const result = await this.db.collection('therapists').insertOne(therapist as any);
        return { ...therapist, _id: result.insertedId };
    }

    async findById(therapistId: string): Promise<ITherapist | null> {
        const result = await this.db.collection('therapists').findOne({ therapist_id: therapistId });
        return result as any as ITherapist | null;
    }

    async findAll(filter: Record<string, unknown> = {}): Promise<ITherapist[]> {
        const results = await this.db.collection('therapists').find(filter).toArray();
        return results as any as ITherapist[];
    }

    async findBySpecialization(specialization: string): Promise<ITherapist[]> {
        const results = await this.db.collection('therapists').find({
            specializations: specialization,
            is_active: true,
        }).toArray();
        return results as any as ITherapist[];
    }

    async findActive(): Promise<ITherapist[]> {
        const results = await this.db.collection('therapists').find({ is_active: true }).toArray();
        return results as any as ITherapist[];
    }

    async update(therapistId: string, updateData: Partial<ITherapist>): Promise<any> {
        return await this.db.collection('therapists').updateOne(
            { therapist_id: therapistId },
            { $set: { ...updateData, updated_at: new Date() } }
        );
    }

    async delete(therapistId: string): Promise<any> {
        return await this.db.collection('therapists').deleteOne({ therapist_id: therapistId });
    }
}
