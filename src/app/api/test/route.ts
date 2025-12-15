export async function GET() {
    console.log('[API Test] GET request received');
    return new Response(JSON.stringify({
        message: 'API is working!',
        timestamp: new Date().toISOString()
    }), { headers: { 'Content-Type': 'application/json' } });
}

export async function POST(request: Request) {
    console.log('[API Test] POST request received');
    try {
        console.log('[API Test] Reading request body...');
        const bodyText = await request.text();
        console.log('[API Test] Body text:', bodyText);

        console.log('[API Test] Parsing JSON...');
        const body = JSON.parse(bodyText);
        console.log('[API Test] Received POST data:', body);

        console.log('[API Test] Creating response...');
        const response = new Response(JSON.stringify({
            message: 'POST received successfully!',
            receivedData: body,
            timestamp: new Date().toISOString()
        }), { headers: { 'Content-Type': 'application/json' } });
        console.log('[API Test] Response created, returning...');
        return response;
    } catch (error) {
        console.error('[API Test] Error in catch block:', error);
        return new Response(JSON.stringify({
            error: 'Failed to process request',
            errorMessage: error instanceof Error ? error.message : String(error),
            timestamp: new Date().toISOString()
        }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}