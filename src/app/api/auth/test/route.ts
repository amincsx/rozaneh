import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    console.log('[Test] Request received');
    return NextResponse.json({ success: true, message: 'Test OK' });
}

export async function GET() {
    console.log('[Test] GET request');
    return NextResponse.json({ success: true, message: 'Test GET OK' });
}
