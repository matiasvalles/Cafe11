// api/index.js - Unified Serverless Router (1 function total on Vercel)
export default async function handler(req, res) {
  const url = req.url || '';
  const pathname = url.split('?')[0].replace(//$/, '') || '/api';

  try {
    if (pathname === '/api/checkout' || pathname === '/api/create-preference') {
      const { default: fn } = await import('./_checkout.js');
      return fn(req, res);
    }
    if (pathname === '/api/webhook') {
      const { default: fn } = await import('./_webhook.js');
      return fn(req, res);
    }
    if (pathname === '/api/zipnova-quote' || pathname === '/api/zipnova/quote' || pathname === '/api/quote') {
      const { default: fn } = await import('./_zipnovaQuote.js');
      return fn(req, res);
    }
    if (pathname === '/api/mailerlite/subscribe') {
      const { default: fn } = await import('./_mailerliteSubscribe.js');
      return fn(req, res);
    }
    if (pathname === '/api/mailerlite/verify') {
      const { default: fn } = await import('./_mailerliteVerify.js');
      return fn(req, res);
    }
    if (pathname === '/api/resend/send' || pathname === '/api/send-order-email') {
      const { default: fn } = await import('./_resendSend.js');
      return fn(req, res);
    }
    if (pathname === '/api/resend/verify') {
      const { default: fn } = await import('./_resendVerify.js');
      return fn(req, res);
    }
    if (pathname === '/api/merchant/feed' || pathname === '/api/merchant/feed.xml') {
      const { default: fn } = await import('./_merchantFeed.js');
      return fn(req, res);
    }

    return res.status(404).json({ error: `Ruta de API no encontrada: ${pathname}` });
  } catch (err) {
    console.error(`[API Router Error on ${pathname}]:`, err);
    return res.status(500).json({ error: err.message || 'Error interno en API router' });
  }
}
