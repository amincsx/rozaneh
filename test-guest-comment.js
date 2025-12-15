const http = require('http');

// Simulate what the browser form would send
const commentData = {
    therapist_id: '4',
    user_name: 'Test Guest User',
    message: 'This is a test comment from a guest user',
    rating: 5
};

const postData = JSON.stringify(commentData);

console.log('=== Testing Comment Submission ===');
console.log('Sending payload:', commentData);
console.log('JSON:', postData);
console.log('');

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

    console.log(`Status Code: ${res.statusCode}`);
    console.log('Response Headers:', res.headers);

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('');
        console.log('Response Body:', data);
        try {
            const json = JSON.parse(data);
            console.log('Parsed Response:', JSON.stringify(json, null, 2));
        } catch (e) {
            console.log('Could not parse as JSON');
        }
    });
});

req.on('error', (error) => {
    console.error('Request Error:', error.message);
});

// Wait a bit for server to be ready
setTimeout(() => {
    req.write(postData);
    req.end();
}, 2000);
