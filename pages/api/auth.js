export default function handler(req, res) {
  const redirect_uri = 'https://your-vercel-app.vercel.app/api/callback';
  const client_id = process.env.CLIENT_ID;
  const scope = encodeURIComponent('https://www.googleapis.com/auth/drive.readonly');
  const state = encodeURIComponent('client_id=xyz'); // optional metadata

  const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&access_type=offline&prompt=consent&state=${state}`;

  res.redirect(url);
}
