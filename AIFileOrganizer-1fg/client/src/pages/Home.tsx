import { Link } from 'wouter';
import { FileText, Sparkles, Users, ArrowRight, CheckCircle, Presentation } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <FileText className="relative w-24 h-24 text-blue-600" data-testid="icon-hero-main" />
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent" data-testid="text-hero-title">
            SPACE-Конструктор:<br />Цифровая Учётная Политика
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-600 mb-8 max-w-4xl mx-auto" data-testid="text-hero-subtitle">
            Автоматизированная система создания стандартизированной учётной политики для государственных организаций Москвы
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link href="/wizard" data-testid="link-cta-wizard">
              <Button size="lg" className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700">
                <Sparkles className="w-5 h-5 mr-2" />
                Создать политику
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <Link href="/presentation" data-testid="link-cta-presentation">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-blue-600 text-blue-600 hover:bg-blue-50">
                <Presentation className="w-5 h-5 mr-2" />
                Открыть презентацию
              </Button>
            </Link>
            
            <Link href="/policies" data-testid="link-cta-policies">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-green-600 text-green-600 hover:bg-green-50">
                <FileText className="w-5 h-5 mr-2" />
                Просмотр политик
              </Button>
            </Link>
          </div>

          {/* Team Credits */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 inline-block" data-testid="card-team-credits">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <Users className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-800">Команда SPACE</h3>
            </div>
            <p className="text-lg text-gray-600" data-testid="text-team-members">
              Захар Кондратьев, Никита Мусиенко
            </p>
            <p className="text-sm text-gray-500 mt-2" data-testid="text-hackathon">
              Лидеры цифровой трансформации 2025
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800" data-testid="text-features-title">
            Почему SPACE-Конструктор?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow" data-testid="card-feature-automation">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Автоматизация</h3>
              <p className="text-gray-600">
                Создавайте учётную политику за минуты вместо недель ручной работы
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-green-100 hover:shadow-xl transition-shadow" data-testid="card-feature-standardization">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Стандартизация</h3>
              <p className="text-gray-600">
                Единый подход для всех организаций государственного сектора Москвы
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-purple-100 hover:shadow-xl transition-shadow" data-testid="card-feature-compliance">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Соответствие</h3>
              <p className="text-gray-600">
                Автоматическое соблюдение всех нормативных требований и стандартов
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16 mb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800" data-testid="text-how-it-works-title">
            Как это работает?
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center" data-testid="card-step-1">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Ввод данных</h3>
              <p className="text-gray-600">Заполните основную информацию об организации</p>
            </div>

            <div className="text-center" data-testid="card-step-2">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Выбор отрасли</h3>
              <p className="text-gray-600">Укажите отраслевую специфику деятельности</p>
            </div>

            <div className="text-center" data-testid="card-step-3">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Параметры учёта</h3>
              <p className="text-gray-600">Настройте методы учёта и амортизации</p>
            </div>

            <div className="text-center" data-testid="card-step-4">
              <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Готово!</h3>
              <p className="text-gray-600">Получите готовый документ учётной политики</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
