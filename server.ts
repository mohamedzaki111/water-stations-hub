import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { initDb } from './src/db/database.js';
import { apiRouter } from './src/db/api.js';
import morgan from 'morgan';
import { logger } from './src/utils/logger.js';

dotenv.config();

// CJS-safe __dirname (works in both ESM and compiled CJS)
const dirName = typeof __dirname !== 'undefined'
  ? __dirname
  : path.dirname(process.argv[1] || process.cwd());

const isBundle = process.argv[1]?.endsWith('server.cjs') ?? false;
const STATIC   = isBundle ? dirName : path.join(dirName, 'dist');
const isDev    = process.env.NODE_ENV !== 'production' && !isBundle;

async function startServer() {
  await initDb();

  const app  = express();
  const PORT = parseInt(process.env.PORT || '3000');

  app.use(express.json({ limit: '10mb' }));
  // HTTP request logging using morgan and winston
  app.use(morgan('combined', {
    stream: { write: (message) => logger.info(message.trim()) }
  }));

  // API routes FIRST
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
    logger.info(`\n💧 Water Stations Hub`);
    logger.info(`🚀 URL:      http://localhost:${PORT}`);
    logger.info(`📡 API:      http://localhost:${PORT}/api/health`);
    logger.info(`🗄️  Mode:     ${isDev ? 'development' : 'production'}`);
    logger.info(`📁 Static:   ${STATIC}`);
    logger.info(`💾 Database: MySQL → ${process.env.DB_NAME || 'water_stations'}@${process.env.DB_HOST || 'localhost'}\n`);
  });
}

startServer().catch(err => {
  logger.error('❌ Server failed to start:', err.message);
  process.exit(1);
});
