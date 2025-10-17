import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'mvp.html'));
});

app.get('/presentation', (req, res) => {
  res.sendFile(join(__dirname, 'presentation.html'));
});

app.use(express.static(__dirname));

app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('================================================');
  console.log('🏗️  SPACE-Конструктор');
  console.log('   Цифровая Учётная Политика');
  console.log('================================================');
  console.log('');
  console.log('Команда SPACE:');
  console.log('  • Захар Кондратьев');
  console.log('  • Никита Мусиенко');
  console.log('');
  console.log(`🚀 Сервер запущен: http://0.0.0.0:${PORT}`);
  console.log('');
  console.log('Доступные страницы:');
  console.log(`  → MVP: http://localhost:${PORT}/`);
  console.log(`  → Презентация: http://localhost:${PORT}/presentation`);
  console.log('');
  console.log('================================================');
  console.log('');
});
