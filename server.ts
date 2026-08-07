import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { initDb } from './src/db/database.js';
import { apiRouter } from './src/db/api.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// When running as dist/server.cjs → static files are in same dir (dist/)
// When running as server.ts (dev) → static files are in ./dist/
const isBundle  = __filename.endsWith('server.cjs');
const STATIC    = isBundle ? __dirname : path.join(__dirname, 'dist');
const isDev     = process.env.NODE_ENV !== 'production' && !isBundle;

async function startServer() {
  await initDb();

  const app  = express();
  const PORT = parseInt(process.env.PORT || '3000');

  app.use(express.json({ limit: '10mb' }));
  app.use('/api', apiRouter);

  if (isDev) {
    // Dynamic import so vite is NOT included in production bundle
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production: serve pre-built static files
    app.use(express.static(STATIC));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(STATIC, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`\n Water Stations Hub`);
    console.log(` URL:  http://localhost:${PORT}`);
    console.log(` Mode: ${isDev ? 'development (vite)' : 'production'}`);
    console.log(` Static: ${STATIC}\n`);
  });
}

startServer().catch(err => {
  console.error('Server failed:', err.message);
  process.exit(1);
});
