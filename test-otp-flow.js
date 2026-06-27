const fetch = require('node-fetch')

async function run() {
    const phoneNumber = '09123456789'

    console.log('1️⃣ Sending OTP...')
    const sendResponse = await fetch('http://localhost:3000/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
    })
    const sendResult = await sendResponse.json()
    console.log('send-otp status:', sendResponse.status, sendResult)

    if (!sendResponse.ok) {
        return
    }

    console.log('2️⃣ Verifying OTP with a fake code...')
    const verifyResponse = await fetch('http://localhost:3000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, otp: '000000' }),
    })
    const verifyResult = await verifyResponse.json()
    console.log('verify-otp status:', verifyResponse.status, verifyResult)
}

run().catch(err => {
    console.error(err)
    process.exit(1)
})
