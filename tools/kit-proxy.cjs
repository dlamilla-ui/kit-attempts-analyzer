// kit-proxy.cjs — Proxy local mínimo para la API de Voximplant Kit (sin dependencias).
// Uso:  npm run proxy   (o: node tools/kit-proxy.cjs)   → escucha en http://localhost:8787
//       PORT=9000 node tools/kit-proxy.cjs
// La app envía la petición a http://localhost:8787/api/v3/... con la cabecera X-Kit-Host
// (p. ej. kitapi-us.voximplant.com). El proxy la reenvía a https://{X-Kit-Host}/api/v3/...
// y añade las cabeceras CORS para que el navegador acepte la respuesta.
// Por seguridad solo reenvía a hosts *.voximplant.com y escucha únicamente en 127.0.0.1.
// No guarda ni registra tokens.

const http = require('http');
const https = require('https');

const PORT = Number(process.env.PORT) || 8787;
const ALLOWED_HOST = /^[a-z0-9-]+(\.[a-z0-9-]+)*\.voximplant\.com$/i;

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Kit-Host',
  'Access-Control-Expose-Headers': 'Content-Type, Content-Disposition',
  'Access-Control-Allow-Private-Network': 'true', // Chrome: permite que una página https llame a localhost
};

http.createServer((req, res) => {
  if (req.method === 'OPTIONS') { res.writeHead(204, cors); return res.end(); }

  const host = String(req.headers['x-kit-host'] || '').trim().toLowerCase();
  if (!ALLOWED_HOST.test(host) || !req.url.startsWith('/api/')) {
    res.writeHead(400, { ...cors, 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ success: false, result: { error: 'X-Kit-Host inválido o ruta no permitida', code: 400 } }));
  }

  const upstream = https.request({
    host,
    path: req.url,
    method: req.method,
    headers: {
      'content-type': req.headers['content-type'] || 'application/x-www-form-urlencoded',
      ...(req.headers['content-length'] ? { 'content-length': req.headers['content-length'] } : {}),
    },
  }, (up) => {
    const headers = { ...cors };
    for (const h of ['content-type', 'content-disposition', 'content-length']) {
      if (up.headers[h]) headers[h] = up.headers[h];
    }
    res.writeHead(up.statusCode || 502, headers);
    up.pipe(res);
  });

  upstream.on('error', (err) => {
    res.writeHead(502, { ...cors, 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, result: { error: `Proxy: ${err.message}`, code: 502 } }));
  });
  req.pipe(upstream);
}).listen(PORT, '127.0.0.1', () => {
  console.log(`Proxy de Voximplant Kit escuchando en http://localhost:${PORT}`);
});
