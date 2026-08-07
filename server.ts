import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { initDb } from './src/db/database.js';
import { apiRouter } from './src/db/api.js';

dotenv.config();

// CJS-safe __dirname (works in both ESM and compiled CJS)
const __dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : path.dirname(process.argv[1]);

const isBundle = process.argv[1]?.endsWith('server.cjs') ?? false;
const STATIC   = isBundle ? __dirname : path.join(__dirname, 'dist');
const isDev    = process.env.NODE_ENV !== 'production' && !isBundle;

async function startServer() {
  await initDb();

  const app  = express();
  const PORT = parseInt(process.env.PORT || '3000');

  app.use(express.json({ limit: '10mb' }));
  app.use('/api', apiRouter);

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(STATIC));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(STATIC, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`\n Water Stations Hub running`);
    console.log(` URL:  http://localhost:${PORT}`);
    console.log(` Mode: ${isDev ? 'development' : 'production'}`);
    console.log(` Static dir: ${STATIC}\n`);
  });
}

startServer().catch(err => {
  console.error('Server failed:', err.message);
  process.exit(1);
});
