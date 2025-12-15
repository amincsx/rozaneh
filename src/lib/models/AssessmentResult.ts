/* eslint-disable @typescript-eslint/no-explicit-any */
import { Db, ObjectId } from 'mongodb';

export interface IAssessmentResult {
    _id?: ObjectId;
    assessment_id: string;
    user_id: string;
    therapist_id?: string;
    test_name: string;
    test_category?: string;
    score: number;
    percentage: number;
    result_date: Date;
    answers?: Record<string, unknown>[];
    interpretation?: string;
    recommendations?: string[];
    duration_minutes: number;
    notes?: string;
    created_at: Date;
    updated_at: Date;
}

export class AssessmentResultModel {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    async create(resultData: Omit<IAssessmentResult, '_id' | 'created_at' | 'updated_at'>): Promise<IAssessmentResult> {
        const result: IAssessmentResult = {
            ...resultData,
            created_at: new Date(),
            updated_at: new Date(),
        };

        const dbResult = await this.db.collection('assessments_results').insertOne(result as any);
        return { ...result, _id: dbResult.insertedId };
    }

    async findById(assessmentId: string): Promise<IAssessmentResult | null> {
        const result = await this.db.collection('assessments_results').findOne({ assessment_id: assessmentId });
        return result as any as IAssessmentResult | null;
    }

    async findByUserId(userId: string): Promise<IAssessmentResult[]> {
        const results = await this.db.collection('assessments_results')
            .find({ user_id: userId })
            .sort({ result_date: -1 })
            .toArray();
        return results as any as IAssessmentResult[];
    }

    async findByTherapistId(therapistId: string): Promise<IAssessmentResult[]> {
        const results = await this.db.collection('assessments_results')
            .find({ therapist_id: therapistId })
            .sort({ result_date: -1 })
            .toArray();
        return results as any as IAssessmentResult[];
    }

    async findByTestName(testName: string): Promise<IAssessmentResult[]> {
        const results = await this.db.collection('assessments_results')
            .find({ test_name: testName })
            .toArray();
        return results as any as IAssessmentResult[];
    }

    async update(assessmentId: string, updateData: Partial<IAssessmentResult>): Promise<any> {
        return await this.db.collection('assessments_results').updateOne(
            { assessment_id: assessmentId },
            { $set: { ...updateData, updated_at: new Date() } }
        );
    }

    async delete(assessmentId: string): Promise<any> {
        return await this.db.collection('assessments_results').deleteOne({ assessment_id: assessmentId });
    }

    async getAverageScoreByTestName(testName: string): Promise<{ average: number; count: number }> {
        const results = await this.db.collection('assessments_results')
            .aggregate([
                { $match: { test_name: testName } },
                { $group: { _id: null, average: { $avg: '$score' }, count: { $sum: 1 } } },
            ])
            .toArray();
        const result = results[0] as any;
        return result ? { average: result.average, count: result.count } : { average: 0, count: 0 };
    }
}
