/**
 * Vercel Serverless Function: Verify Paystack Payment
 * Endpoint: POST /api/verify-payment
 */

const ALLOWED_ORIGINS = [
  'https://aa-entertainment.vercel.app',
  'https://aaentertainment.ng',
  'http://localhost:3000',
  'http://localhost:5173',
];

export default async function handler(req, res) {
  // Lock CORS to known origins only — no wildcard
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // POST only — GET would expose reference in URLs and server logs
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { reference, expectedAmount } = body ?? {};

    if (!reference) {
      return res.status(400).json({
        success: false,
        message: 'Transaction reference is required',
      });
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      if (process.env.NODE_ENV === 'production') {
        console.error('[verify-payment] PAYSTACK_SECRET_KEY is not set in production.');
        return res.status(500).json({ success: false, message: 'Payment service misconfigured' });
      }
      // Development-only fallback
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

    // Validate the paid amount matches the expected booking total (within ₦1 tolerance)
    if (expectedAmount !== undefined && expectedAmount !== null) {
      const paidNaira = tx.amount / 100;
      if (Math.abs(paidNaira - Number(expectedAmount)) > 1) {
        console.error(
          `[verify-payment] Amount mismatch: expected ₦${expectedAmount}, got ₦${paidNaira} for ref ${reference}`
        );
        return res.status(400).json({
          success: false,
          message: 'Payment amount does not match the expected booking total',
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Transaction verified successfully',
      data: {
        reference: tx.reference,
        amount: tx.amount / 100,
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
