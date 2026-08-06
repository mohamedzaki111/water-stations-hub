import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { initDb } from './src/db/database.js';
import { apiRouter } from './src/db/api.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  // Initialize MySQL
  await initDb();

  const app    = express();
  const PORT   = parseInt(process.env.PORT || '3000');
  const isDev  = process.env.NODE_ENV !== 'production';

  app.use(express.json({ limit: '10mb' }));

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
    console.log(`\n💧 Water Stations Hub`);
    console.log(`🚀 Server:   http://localhost:${PORT}`);
    console.log(`📡 API:      http://localhost:${PORT}/api/health`);
    console.log(`🗄️  Database: MySQL → ${process.env.DB_NAME || 'water_stations'}@${process.env.DB_HOST || 'localhost'}\n`);
  });
}

startServer().catch(err => {
  console.error('❌ Server failed to start:', err);
  process.exit(1);
});
