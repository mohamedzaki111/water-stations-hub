import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { initDb } from './src/db/database.js';
import { apiRouter } from './src/db/api.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// When running as dist/server.cjs, static files are in same dist/ folder
// When running as server.ts (dev), static files are in dist/ subfolder
const isCompiledBundle = __filename.endsWith('server.cjs');
const STATIC_DIR = isCompiledBundle
  ? __dirname                              // dist/server.cjs → serve from dist/
  : path.join(__dirname, 'dist');          // server.ts → serve from ./dist/

async function startServer() {
  await initDb();

  const app   = express();
  const PORT  = parseInt(process.env.PORT || '3000');
  const isDev = process.env.NODE_ENV !== 'production';

  app.use(express.json({ limit: '10mb' }));

  // API routes FIRST
  app.use('/api', apiRouter);

  if (isDev && !isCompiledBundle) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production: serve from dist/
    app.use(express.static(STATIC_DIR));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(STATIC_DIR, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`\n Water Stations Hub`);
    console.log(` URL:  http://localhost:${PORT}`);
    console.log(` API:  http://localhost:${PORT}/api/health`);
    console.log(` Mode: ${isDev && !isCompiledBundle ? 'development' : 'production'}`);
    console.log(` Static: ${STATIC_DIR}\n`);
  });
}

startServer().catch(err => {
  console.error('Server failed to start:', err);
  process.exit(1);
});
