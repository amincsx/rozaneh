const http = require('http');

async function testComment() {
    const payload = JSON.stringify({
        therapist_id: '4',
        user_name: 'تست کاربر',
        message: 'این یک نظر تستی است',
        rating: 5
    });

    console.log('=== Comment Submission Test ===');
    console.log('Payload:', payload);

    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/comments',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload)
        }
    };

    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                console.log('\n--- Response ---');
                console.log('Status:', res.statusCode);
                console.log('Headers:', res.headers);
                try {
                    const json = JSON.parse(data);
                    console.log('Body:', JSON.stringify(json, null, 2));
                } catch (e) {
                    console.log('Body (raw):', data);
                }
                resolve();
            });
        });

        req.on('error', err => {
            console.error('Request error:', err.message);
            reject(err);
        });

        req.write(payload);
        req.end();
    });
}

// Wait a bit for server to start, then test
setTimeout(() => {
    testComment().catch(console.error).finally(() => process.exit(0));
}, 3000);
