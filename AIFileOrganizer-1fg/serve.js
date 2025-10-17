import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;

// Serve MVP HTML
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'mvp.html'));
});

// Serve presentation
app.get('/presentation', (req, res) => {
  res.sendFile(join(__dirname, 'presentation.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ SPACE-Конструктор запущен на http://0.0.0.0:${PORT}`);
  console.log(`📋 Главная страница: http://0.0.0.0:${PORT}`);
  console.log(`🎬 Презентация: http://0.0.0.0:${PORT}/presentation`);
  console.log(`\n🎯 Готово к демонстрации жюри!`);
});
