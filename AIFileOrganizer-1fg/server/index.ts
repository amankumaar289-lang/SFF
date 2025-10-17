import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRouter } from './routes';
import { MemStorage } from './storage';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;

app.use(express.json());

const storage = new MemStorage();
const apiRouter = createRouter(storage);
app.use(apiRouter);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '..', 'mvp.html'));
});

app.get('/presentation', (req, res) => {
  res.sendFile(join(__dirname, '..', 'presentation.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🏗️  SPACE-Конструктор: Цифровая Учётная Политика         ║
║                                                              ║
║   Команда SPACE: Захар Кондратьев, Никита Мусиенко          ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

✅ Сервер запущен на http://0.0.0.0:${PORT}

📋 Доступные страницы:
   • Главная страница (MVP):    http://0.0.0.0:${PORT}/
   • Презентация:               http://0.0.0.0:${PORT}/presentation

🔌 API Endpoints (готовы к интеграции с 1С):
   • GET  /api/organizations
   • GET  /api/organizations/:id
   • POST /api/organizations
   • GET  /api/policy-sections
   • GET  /api/generated-policies
   • POST /api/generated-policies

🎯 Готово к демонстрации жюри!
  `);
});
