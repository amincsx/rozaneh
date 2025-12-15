// Absolute minimal test endpoint
export async function GET() {
    return new Response('pong', { status: 200 });
}
