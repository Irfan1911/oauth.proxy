import axios from "axios";
import { google } from "googleapis";

export default async function handler(req, res) {
  try {
    const { code } = req.query;
    console.log("Received code:", code);

    const oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI
    );

    const { tokens } = await oauth2Client.getToken(code);
    console.log("Tokens obtained:", tokens);

    // Send tokens to n8n webhook
    const webhookUrl = "https://n8n.dynamis-ai.com/webhook/oauth-received";
    const response = await axios.post(webhookUrl, tokens);

    console.log("Sent tokens to n8n:", response.status);

    res.status(200).send("✅ Success! You can close this tab now.");
  } catch (error) {
    console.error("Error during OAuth callback:", error.message, error.stack);
    res.status(500).send("❌ Something went wrong. Please contact support.");
  }
}
