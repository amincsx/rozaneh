const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testCommentSubmission() {
    try {
        console.log('Testing comment submission...\n');

        // Test 1: Submit a comment with all required fields
        console.log('Test 1: Submit comment with required fields');
        const response = await fetch('http://localhost:3000/api/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                therapist_id: '1',
                user_name: 'تست کاربر',
                user_email: 'test@gmail.com',
                message: 'این یک نظر تستی است',
                rating: 5
            })
        });

        const data = await response.json();
        console.log('Response status:', response.status);
        console.log('Response:', JSON.stringify(data, null, 2));

        if (data.success) {
            console.log('✓ Comment submitted successfully!\n');

            // Test 2: Fetch comments for that therapist
            console.log('Test 2: Fetch comments for therapist 1');
            const getResponse = await fetch('http://localhost:3000/api/comments?therapistId=1');
            const getdata = await getResponse.json();
            console.log('Comments found:', getdata.comments.length);
            console.log('Latest comment:', getdata.comments[0]?.user_name, '-', getdata.comments[0]?.message);
        } else {
            console.log('✗ Failed:', data.message);
        }
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

testCommentSubmission();
