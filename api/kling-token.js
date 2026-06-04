const crypto = require('crypto');

const TOKEN_TTL_SECONDS = 1800;

function createKlingToken(apiKey, apiSecret) {
  const now = Math.floor(Date.now() / 1000);
  const exp = now + TOKEN_TTL_SECONDS;

  const header = Buffer.from(
    JSON.stringify({ alg: 'HS256', typ: 'JWT' })
  ).toString('base64url');

  const payload = Buffer.from(
    JSON.stringify({
      iss: apiKey,
      exp,
      nbf: now - 5,
    })
  ).toString('base64url');

  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(`${header}.${payload}`)
    .digest('base64url');

  return {
    token: `${header}.${payload}.${signature}`,
    exp,
    expires_at: new Date(exp * 1000).toISOString(),
    expires_in: TOKEN_TTL_SECONDS,
  };
}
module.exports = (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const API_KEY = process.env.KLING_API_KEY;
  const API_SECRET = process.env.KLING_API_SECRET;

  if (!API_KEY || !API_SECRET) {
    return res.status(500).json({
      error: 'Server misconfiguration: KLING_API_KEY and KLING_API_SECRET must be set',
    });
  }

  return res.status(200).json(createKlingToken(API_KEY, API_SECRET));
};
