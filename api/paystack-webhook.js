import crypto from 'crypto';

/**
 * Vercel Serverless Function: Paystack Webhook Listener
 * Endpoint: POST /api/paystack-webhook
 * 
 * Paystack calls this endpoint asynchronously whenever transactions are completed,
 * failed, or refunded (e.g. Bank Transfers, USSD, Cards).
 */
export default async function handler(req, res) {
  // Only accept POST requests from Paystack
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const secret = process.env.PAYSTACK_SECRET_KEY;

  try {
    const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    const signature = req.headers['x-paystack-signature'];

    // In production, cryptographically verify the signature using HMAC SHA512
    if (secret && signature) {
      const hash = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');

      if (hash !== signature) {
        console.error('[Paystack Webhook] Invalid signature detected. Request rejected.');
        return res.status(401).json({ status: 'invalid_signature' });
      }
    } else if (!secret) {
      console.warn('[Paystack Webhook] PAYSTACK_SECRET_KEY is not set. Skipping signature verification (Development mode).');
    }

    const event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    // Process Paystack Events
    switch (event.event) {
      case 'charge.success': {
        const txData = event.data;
        const reference = txData.reference;
        const amountNaira = txData.amount / 100;
        const channel = txData.channel;
        const customerEmail = txData.customer?.email;
        const guestName = txData.metadata?.custom_fields?.find(
          (f) => f.variable_name === 'guest_name'
        )?.value || txData.customer?.first_name || 'Guest';

        console.log(
          `[Paystack Webhook] Charge Success: Ref: ${reference} | Amount: ₦${amountNaira.toLocaleString()} | Channel: ${channel} | Guest: ${guestName} (${customerEmail})`
        );

        // Webhook handler is ready for automated database persistence, invoice generation, or email triggers.
        break;
      }

      case 'refund.processed': {
        console.log(`[Paystack Webhook] Refund processed for reference: ${event.data?.reference}`);
        break;
      }

      default: {
        console.log(`[Paystack Webhook] Received unhandled event: ${event.event}`);
      }
    }

    // Always acknowledge Paystack with 200 OK immediately so Paystack does not retry
    return res.status(200).json({ status: 'success', received: event.event });
  } catch (error) {
    console.error('[Paystack Webhook] Error processing webhook event:', error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
}
