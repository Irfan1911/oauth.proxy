export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Missing code parameter' });
  }

  const tokenUrl = 'https://oauth2.googleapis.com/token';
  const params = new URLSearchParams({
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    grant_type: 'authorization_code',
  });

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const tokens = await response.json();

    if (tokens.error) {
      return res.status(400).json({ error: tokens.error });
    }

    // Display tokens directly in browser for testing
    return res.status(200).json({
      message: 'OAuth success! Copy these tokens into n8n.',
      tokens,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Token exchange failed', details: error.message });
  }
}

