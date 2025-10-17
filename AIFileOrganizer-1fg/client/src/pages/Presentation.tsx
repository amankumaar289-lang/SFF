import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, FileText, Building, Cog, Sparkles, CheckCircle, Users } from 'lucide-react';

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 8;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const slides = [
    // Slide 1: Title
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <div className="mb-8">
        <FileText className="w-24 h-24 text-blue-500 mx-auto mb-6" />
      </div>
      <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent" data-testid="text-project-title">
        SPACE-Конструктор:<br />Цифровая Учётная Политика
      </h1>
      <p className="text-3xl text-gray-600 mb-12" data-testid="text-hackathon-name">
        Лидеры цифровой трансформации 2025
      </p>
      <div className="mt-8 text-2xl text-gray-700" data-testid="text-team-title">
        <Users className="w-8 h-8 inline-block mr-3" />
        Команда SPACE
      </div>
      <p className="text-xl text-gray-600 mt-4" data-testid="text-team-members">
        Захар Кондратьев, Никита Мусиенко
      </p>
    </div>,

    // Slide 2: Problem Statement
    <div className="flex flex-col justify-center h-full px-16">
      <h2 className="text-5xl font-bold mb-12 text-blue-700" data-testid="text-slide-2-title">
        Проблема
      </h2>
      <div className="space-y-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg" data-testid="card-problem-1">
          <h3 className="text-2xl font-semibold mb-3 text-red-800">Ручные процессы</h3>
          <p className="text-xl text-gray-700">
            Создание учётной политики требует значительных временных затрат и ручной работы бухгалтеров
          </p>
        </div>
        <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg" data-testid="card-problem-2">
          <h3 className="text-2xl font-semibold mb-3 text-orange-800">Несогласованность</h3>
          <p className="text-xl text-gray-700">
            Различные организации используют разные подходы, что усложняет контроль и аудит
          </p>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg" data-testid="card-problem-3">
          <h3 className="text-2xl font-semibold mb-3 text-yellow-800">Высокая трудоёмкость</h3>
          <p className="text-xl text-gray-700">
            Процесс создания и актуализации учётной политики занимает недели работы специалистов
          </p>
        </div>
      </div>
    </div>,

    // Slide 3: Solution Overview
    <div className="flex flex-col justify-center h-full px-16">
      <h2 className="text-5xl font-bold mb-12 text-green-700" data-testid="text-slide-3-title">
        Решение
      </h2>
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-xl border border-blue-200" data-testid="card-solution-1">
          <Cog className="w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-3xl font-semibold mb-4 text-blue-900">Цифровой конструктор</h3>
          <p className="text-xl text-gray-700">
            Автоматизированная система для создания стандартизированной учётной политики
          </p>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl border border-green-200" data-testid="card-solution-2">
          <Sparkles className="w-12 h-12 text-green-600 mb-4" />
          <h3 className="text-3xl font-semibold mb-4 text-green-900">Умная генерация</h3>
          <p className="text-xl text-gray-700">
            Автоматическое формирование документа на основе параметров организации
          </p>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-xl border border-blue-200" data-testid="card-solution-3">
          <CheckCircle className="w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-3xl font-semibold mb-4 text-blue-900">Соответствие требованиям</h3>
          <p className="text-xl text-gray-700">
            Обеспечение единообразия и соответствия нормативным актам Москвы
          </p>
        </div>
      </div>
    </div>,

    // Slide 4: Architecture
    <div className="flex flex-col justify-center h-full px-16">
      <h2 className="text-5xl font-bold mb-12 text-blue-700" data-testid="text-slide-4-title">
        Архитектура системы
      </h2>
      <div className="grid grid-cols-3 gap-8 mb-8">
        <div className="bg-blue-100 p-6 rounded-xl text-center" data-testid="card-arch-frontend">
          <div className="text-4xl mb-4">🖥️</div>
          <h3 className="text-xl font-semibold mb-2 text-blue-900">Frontend</h3>
          <p className="text-gray-700">React + TypeScript<br />Пошаговый визард</p>
        </div>
        <div className="bg-green-100 p-6 rounded-xl text-center" data-testid="card-arch-backend">
          <div className="text-4xl mb-4">⚙️</div>
          <h3 className="text-xl font-semibold mb-2 text-green-900">Mock 1C Backend</h3>
          <p className="text-gray-700">Express.js<br />API симуляция 1C</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-xl text-center" data-testid="card-arch-storage">
          <div className="text-4xl mb-4">💾</div>
          <h3 className="text-xl font-semibold mb-2 text-purple-900">Хранилище</h3>
          <p className="text-gray-700">In-Memory Storage<br />Быстрый доступ</p>
        </div>
      </div>
      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-8 rounded-xl" data-testid="card-tech-stack">
        <h3 className="text-2xl font-semibold mb-4">Технологический стек</h3>
        <div className="grid grid-cols-2 gap-4 text-lg">
          <div>✓ React + TypeScript</div>
          <div>✓ Tailwind CSS</div>
          <div>✓ Express.js</div>
          <div>✓ Zod валидация</div>
          <div>✓ React Hook Form</div>
          <div>✓ Drizzle ORM</div>
        </div>
      </div>
    </div>,

    // Slide 5: Key Features
    <div className="flex flex-col justify-center h-full px-16">
      <h2 className="text-5xl font-bold mb-12 text-green-700" data-testid="text-slide-5-title">
        Ключевые возможности
      </h2>
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white border-2 border-blue-300 p-6 rounded-xl" data-testid="card-feature-1">
          <div className="text-5xl mb-4">🎯</div>
          <h3 className="text-2xl font-semibold mb-3 text-blue-900">Пошаговый визард</h3>
          <p className="text-lg text-gray-700">
            Интуитивный интерфейс с пошаговым заполнением параметров организации
          </p>
        </div>
        <div className="bg-white border-2 border-green-300 p-6 rounded-xl" data-testid="card-feature-2">
          <div className="text-5xl mb-4">🏢</div>
          <h3 className="text-2xl font-semibold mb-3 text-green-900">Кастомизация</h3>
          <p className="text-lg text-gray-700">
            Настройка под специфику конкретной организации и её деятельность
          </p>
        </div>
        <div className="bg-white border-2 border-purple-300 p-6 rounded-xl" data-testid="card-feature-3">
          <div className="text-5xl mb-4">📊</div>
          <h3 className="text-2xl font-semibold mb-3 text-purple-900">Отраслевые вариации</h3>
          <p className="text-lg text-gray-700">
            Учёт отраслевой специфики: образование, здравоохранение, культура и др.
          </p>
        </div>
        <div className="bg-white border-2 border-orange-300 p-6 rounded-xl" data-testid="card-feature-4">
          <div className="text-5xl mb-4">⚡</div>
          <h3 className="text-2xl font-semibold mb-3 text-orange-900">Мгновенная генерация</h3>
          <p className="text-lg text-gray-700">
            Автоматическое создание готового документа учётной политики за минуты
          </p>
        </div>
      </div>
    </div>,

    // Slide 6: Demo/Screenshots
    <div className="flex flex-col justify-center h-full px-16">
      <h2 className="text-5xl font-bold mb-12 text-blue-700" data-testid="text-slide-6-title">
        Демонстрация работы
      </h2>
      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-300" data-testid="card-demo-step-1">
          <h3 className="text-2xl font-semibold mb-3 text-gray-900">Шаг 1: Основная информация</h3>
          <p className="text-lg text-gray-700">
            Ввод базовых данных организации: наименование, ИНН, КПП, организационно-правовая форма
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-300" data-testid="card-demo-step-2">
          <h3 className="text-2xl font-semibold mb-3 text-gray-900">Шаг 2: Отраслевая специфика</h3>
          <p className="text-lg text-gray-700">
            Выбор отрасли и специфических параметров деятельности организации
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-300" data-testid="card-demo-step-3">
          <h3 className="text-2xl font-semibold mb-3 text-gray-900">Шаг 3: Учётные параметры</h3>
          <p className="text-lg text-gray-700">
            Настройка методов учёта, амортизации и других бухгалтерских параметров
          </p>
        </div>
        <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-xl" data-testid="card-demo-result">
          <h3 className="text-2xl font-semibold mb-3">Результат: Готовый документ</h3>
          <p className="text-lg">
            Автоматически сформированная учётная политика, готовая к утверждению руководителем
          </p>
        </div>
      </div>
    </div>,

    // Slide 7: Benefits
    <div className="flex flex-col justify-center h-full px-16">
      <h2 className="text-5xl font-bold mb-12 text-green-700" data-testid="text-slide-7-title">
        Преимущества решения
      </h2>
      <div className="grid grid-cols-2 gap-8">
        <div className="flex items-start space-x-4" data-testid="card-benefit-1">
          <div className="flex-shrink-0 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            ⏱️
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-blue-900">Экономия времени</h3>
            <p className="text-lg text-gray-700">
              Сокращение времени создания учётной политики с недель до минут
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4" data-testid="card-benefit-2">
          <div className="flex-shrink-0 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            📋
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-green-900">Стандартизация</h3>
            <p className="text-lg text-gray-700">
              Единый подход для всех организаций государственного сектора Москвы
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4" data-testid="card-benefit-3">
          <div className="flex-shrink-0 w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            ✅
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-purple-900">Соответствие требованиям</h3>
            <p className="text-lg text-gray-700">
              Автоматическое соблюдение всех нормативных требований и стандартов
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4" data-testid="card-benefit-4">
          <div className="flex-shrink-0 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            📈
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-orange-900">Масштабируемость</h3>
            <p className="text-lg text-gray-700">
              Возможность внедрения в тысячах организаций государственного сектора
            </p>
          </div>
        </div>
      </div>
    </div>,

    // Slide 8: Thank You
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <div className="mb-8">
        <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
      </div>
      <h1 className="text-6xl font-bold mb-8 text-blue-700" data-testid="text-thank-you">
        Спасибо за внимание!
      </h1>
      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-2xl border-2 border-blue-300 mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800" data-testid="text-project-by">
          Проект команды SPACE
        </h2>
        <p className="text-2xl text-gray-700 mb-6" data-testid="text-final-team-members">
          Захар Кондратьев, Никита Мусиенко
        </p>
        <div className="text-xl text-gray-600">
          Лидеры цифровой трансформации 2025
        </div>
      </div>
      <div className="text-2xl text-blue-600 font-semibold" data-testid="text-call-to-action">
        Готовы к внедрению! 🚀
      </div>
    </div>
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Slide Content */}
      <div className="absolute inset-0 transition-opacity duration-500">
        {slides[currentSlide]}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-3 rounded-full bg-blue-600 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          data-testid="button-prev-slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div className="px-6 py-3 bg-white rounded-full shadow-lg border border-gray-200" data-testid="text-slide-counter">
          <span className="text-lg font-semibold text-gray-800">
            {currentSlide + 1} / {totalSlides}
          </span>
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className="p-3 rounded-full bg-blue-600 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          data-testid="button-next-slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Keyboard Navigation Hint */}
      <div className="absolute top-8 right-8 text-sm text-gray-500 bg-white px-4 py-2 rounded-lg shadow" data-testid="text-keyboard-hint">
        ← → или пробел для навигации
      </div>
    </div>
  );
}
