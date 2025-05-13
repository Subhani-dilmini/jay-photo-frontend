// server.js
import express from 'express';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env['PORT'] || 4000;

app.use(express.static(join(__dirname, 'dist')));

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://sandbox.payhere.lk; " +
    "frame-src https://sandbox.payhere.lk; " +
    "connect-src 'self' https://sandbox.payhere.lk; " +
    "style-src 'self' 'unsafe-inline';"
  );
  next();
});


app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
