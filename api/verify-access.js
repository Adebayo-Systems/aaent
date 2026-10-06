/**
 * Vercel Serverless Function: Verify Site Access Password
 * Endpoint: POST /api/verify-access
 * Secure server-side gate verification — password is never exposed to browser bundles.
 */

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { password } = body ?? {};
    const configuredPassword = process.env.SITE_ACCESS_PASSWORD;

    if (!configuredPassword) {
      return res.status(500).json({
        success: false,
        message: 'SITE_ACCESS_PASSWORD is not configured on the server.',
      });
    }

    if (typeof password === 'string' && password.trim() === configuredPassword.trim()) {
      return res.status(200).json({ success: true });
    }

    return res.status(401).json({ success: false, message: 'Invalid password' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
