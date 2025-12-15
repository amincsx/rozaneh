import { initializeModels } from '@/lib/models';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { assessmentResultModel } = await initializeModels();

        const resultData = await request.json();

        // Create a new assessment result
        const newResult = await assessmentResultModel.create({
            assessment_id: `assessment_${Date.now()}`,
            user_id: resultData.user_id || `user_${Date.now()}`,
            therapist_id: resultData.therapist_id,
            test_name: resultData.test_name || 'Depression Scale',
            test_category: resultData.test_category || 'Mental Health',
            score: resultData.score || 45,
            percentage: resultData.percentage || 75,
            result_date: new Date(),
            answers: resultData.answers || [],
            interpretation: resultData.interpretation || 'Moderate depression',
            duration_minutes: resultData.duration_minutes || 15,
        });

        return NextResponse.json({
            success: true,
            message: 'Assessment result added to MongoDB app2.assessments_results',
            data: newResult,
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { assessmentResultModel } = await initializeModels();

        const userId = request.nextUrl.searchParams.get('userId');

        let results;
        if (userId) {
            results = await assessmentResultModel.findByUserId(userId);
        } else {
            results = await assessmentResultModel.findByTestName('Depression Scale');
        }

        return NextResponse.json({
            success: true,
            message: 'Retrieved assessment results from MongoDB app2.assessments_results',
            count: results.length,
            data: results,
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
