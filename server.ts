import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { initDb } from './src/db/database.js';
import { apiRouter } from './src/db/api.js';
import morgan from 'morgan';
import { logger } from './src/utils/logger.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  // Initialize MySQL
  await initDb();

  const app    = express();
  const PORT   = parseInt(process.env.PORT || '3000');
  const isDev  = process.env.NODE_ENV !== 'production';

  app.use(express.json({ limit: '10mb' }));

  // HTTP request logging using morgan and winston
  app.use(morgan('combined', {
    stream: { write: (message) => logger.info(message.trim()) }
  }));

  // API routes
  app.use('/api', apiRouter);

  if (isDev) {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')));
  }

  app.listen(PORT, () => {
    logger.info(`\n💧 Water Stations Hub`);
    logger.info(`🚀 Server:   http://localhost:${PORT}`);
    logger.info(`📡 API:      http://localhost:${PORT}/api/health`);
    logger.info(`🗄️  Database: MySQL → ${process.env.DB_NAME || 'water_stations'}@${process.env.DB_HOST || 'localhost'}\n`);
  });
}

startServer().catch(err => {
  logger.error('❌ Server failed to start:', err);
  process.exit(1);
});
