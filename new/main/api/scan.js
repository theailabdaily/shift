module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(200).json({
      content: [{ type: 'text', text: '⚠️ ANTHROPIC_API_KEY not set.\n\nGo to: Vercel Dashboard → Project → Settings → Environment Variables\nAdd: ANTHROPIC_API_KEY = sk-ant-...\nThen: Deployments → latest → Redeploy' }]
    });
  }

  try {
    const body = req.body;
    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    };
    if (body.tools?.some(t => t.name === 'web_search')) {
      headers['anthropic-beta'] = 'web-search-2025-03-05';
    }

    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const data = await upstream.json();

    if (!upstream.ok || data.type === 'error') {
      const msg = data.error?.message || JSON.stringify(data.error || data);
      return res.status(200).json({
        content: [{ type: 'text', text: `⚠️ API Error ${upstream.status}: ${msg}` }]
      });
    }

    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      content: [{ type: 'text', text: `⚠️ Function error: ${e.message}` }]
    });
  }
};
