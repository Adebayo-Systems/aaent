/**
 * Vercel Serverless Function: Verify Paystack Payment
 * Endpoint: POST /api/verify-payment or GET /api/verify-payment?reference=...
 */

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const reference =
      req.method === 'POST'
        ? (typeof req.body === 'string' ? JSON.parse(req.body) : req.body)?.reference
        : req.query?.reference;

    if (!reference) {
      return res.status(400).json({
        success: false,
        message: 'Transaction reference is required',
      });
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      // In local dev without secret key, return fallback test confirmation
      return res.status(200).json({
        success: true,
        message: 'Verified in development sandbox mode',
        data: {
          reference,
          status: 'success',
          isDevFallback: true,
        },
      });
    }

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const result = await response.json();

    if (!response.ok || !result.status) {
      return res.status(response.status || 400).json({
        success: false,
        message: result.message || 'Unable to verify transaction with Paystack',
        data: result.data || null,
      });
    }

    const tx = result.data;

    if (tx.status !== 'success') {
      return res.status(400).json({
        success: false,
        message: `Transaction is in status: ${tx.status}`,
        data: tx,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Transaction verified successfully',
      data: {
        reference: tx.reference,
        amount: tx.amount / 100, // In Naira
        currency: tx.currency,
        channel: tx.channel,
        paidAt: tx.paid_at,
        customer: {
          email: tx.customer?.email,
          name: `${tx.customer?.first_name || ''} ${tx.customer?.last_name || ''}`.trim(),
        },
        metadata: tx.metadata,
      },
    });
  } catch (error) {
    console.error('Paystack verification error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error occurred during payment verification',
    });
  }
}
