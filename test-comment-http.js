const http = require('http');

const postData = JSON.stringify({
    therapist_id: '1',
    user_name: 'تست کاربر',
    user_email: 'test@test.com',
    message: 'این یک نظر تستی است',
    rating: 5
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/comments',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log('Response Status:', res.statusCode);
        console.log('Response:', JSON.parse(data));
        process.exit(0);
    });
});

req.on('error', (e) => {
    console.error('Error:', e.message);
    process.exit(1);
});

req.write(postData);
req.end();
