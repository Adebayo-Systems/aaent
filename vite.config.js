import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'api-serverless-dev-middleware',
        configureServer(server) {
          server.middlewares.use('/api/verify-payment', async (req, res) => {
            res.setHeader('Content-Type', 'application/json');

            if (req.method !== 'POST' && req.method !== 'GET') {
              res.statusCode = 405;
              res.end(JSON.stringify({ success: false, message: 'Method Not Allowed' }));
              return;
            }

            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });

            req.on('end', async () => {
              try {
                let reference = '';
                if (req.method === 'POST' && body) {
                  try {
                    const parsed = JSON.parse(body);
                    reference = parsed.reference;
                  } catch {
                    reference = '';
                  }
                } else if (req.url) {
                  const url = new URL(req.url, 'http://localhost:3000');
                  reference = url.searchParams.get('reference');
                }

                if (!reference) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ success: false, message: 'Transaction reference is required' }));
                  return;
                }

                const secretKey = env.PAYSTACK_SECRET_KEY || process.env.PAYSTACK_SECRET_KEY;

                if (!secretKey) {
                  res.statusCode = 200;
                  res.end(
                    JSON.stringify({
                      success: true,
                      message: 'Verified in local development mode',
                      data: {
                        reference,
                        status: 'success',
                        isDevFallback: true,
                      },
                    })
                  );
                  return;
                }

                const paystackRes = await fetch(
                  `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
                  {
                    headers: {
                      Authorization: `Bearer ${secretKey}`,
                      'Content-Type': 'application/json',
                    },
                  }
                );
                const paystackData = await paystackRes.json();
                res.statusCode = paystackRes.status || 200;
                res.end(JSON.stringify(paystackData));
              } catch (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({ success: false, message: err.message }));
              }
            });
          });
        },
      },
    ],
    server: {
      port: 3000,
      open: true,
    },
  };
});

