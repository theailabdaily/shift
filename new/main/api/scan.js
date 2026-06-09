export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(200).json({
      content: [{ type: 'text', text: '⚠️ ANTHROPIC_API_KEY not configured.\n\nGo to:\nVercel Dashboard → Your Project → Settings → Environment Variables\n→ Add: ANTHROPIC_API_KEY = (your key from console.anthropic.com)\n→ Then: Deployments tab → latest → Redeploy' }]
    });
  }

  try {
    const body = req.body;
    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    };
    const hasWebSearch = body.tools?.some(t => t.name === 'web_search');
    if (hasWebSearch) headers['anthropic-beta'] = 'web-search-2025-03-05';

    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const data = await upstream.json();

    // Anthropic API returned an error object (model not found, auth failed, etc.)
    if (data.type === 'error' || !upstream.ok) {
      const errMsg = data.error?.message || data.message || JSON.stringify(data);
      return res.status(200).json({
        content: [{ type: 'text', text: `⚠️ API Error (${upstream.status}): ${errMsg}\n\nCommon fixes:\n• Invalid key → check console.anthropic.com\n• Rate limit → wait a moment and retry\n• Model unavailable → already handled by proxy` }]
      });
    }

    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      content: [{ type: 'text', text: `⚠️ Network error: ${e.message}\n\nCheck your Vercel function logs for details.` }]
    });
  }
}
