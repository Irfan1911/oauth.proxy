import axios from 'axios';

export default async function handler(req, res) {
  const code = req.query.code;
  const redirect_uri = 'https://oauth-proxy-steel.vercel.app/';

  try {
    const tokenRes = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri,
      grant_type: 'authorization_code',
    });

    const tokens = tokenRes.data;

    // Send tokens to your n8n webhook
    await axios.post('https://n8n.dynamis-ai.com/webhook/oauth-received', tokens);

    res.send('✅ Connected successfully! You can close this tab now.');
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send('❌ Something went wrong. Please contact support.');
  }
}
