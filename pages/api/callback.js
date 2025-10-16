import axios from 'axios';

export default async function handler(req, res) {
  const code = req.query.code;
  console.log("Received code:", code);
  const redirect_uri = 'https://oauth-proxy-steel.vercel.app/api/callback';

  try {
    const tokenRes = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri,
      grant_type: 'authorization_code',
    });

    const tokens = tokenRes.data;
    console.log("Tokens received:", tokens);

    // Send tokens to n8n webhook
    const webhookUrl = "https://n8n.dynamis-ai.com/webhook-test/webhook/oauth-received";
    const response = await axios.post(webhookUrl, tokens);
    console.log("Sent tokens to n8n:", response.status);

   res.status(200).send("✅ Success! You can close this tab now.");
  } catch (error) {
    console.error("Error during OAuth callback:", error.message, error.stack);
    res.status(500).send("❌ Something went wrong. Please contact support.");
  }
}
