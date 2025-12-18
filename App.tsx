import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen, Calculator, GraduationCap, UserCog, Moon, Sun } from 'lucide-react';
import { PageID, NavItem, Question } from './types';
import Calculators from './components/Calculators';
import TheorySection from './components/TheorySection';
import QuizSection from './components/QuizSection';
import TeacherSection from './components/TeacherSection';

const INITIAL_QUESTIONS: Question[] = [
  {
    id: '1',
    text: 'Qual parâmetro de corte tem a maior influência na temperatura da zona de corte e na vida útil da ferramenta?',
    options: ['Avanço (f)', 'Profundidade de corte (ap)', 'Velocidade de corte (vc)', 'Ângulo de posição (kr)'],
    correctAnswer: 2
  },
  {
    id: '2',
    text: 'Segundo a equação de Taylor (v.T^n = C), o que acontece com a vida da ferramenta se dobrarmos a velocidade de corte?',
    options: ['Aumenta proporcionalmente', 'Diminui drasticamente', 'Permanece inalterada', 'Aumenta exponencialmente'],
    correctAnswer: 1
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageID>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const navigate = (id: PageID) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleAddQuestion = (q: Question) => {
    setQuestions(prev => [...prev, q]);
    alert('Questão adicionada com sucesso ao simulado!');
  };

  const MAIN_NAV: NavItem[] = [
    { id: 'home', label: 'Início' },
    { id: 'theory', label: 'Teoria' },
    { id: 'tempos', label: 'Calculadoras' },
    { id: 'quiz', label: 'Simulado' },
    { id: 'teacher', label: 'Área do Professor' },
  ];

  const CALC_ITEMS: NavItem[] = [
    { id: 'tempos', label: 'Tempos de Corte' },
    { id: 'velocidade', label: 'Velocidade de Corte' },
    { id: 'forca', label: 'Força de Corte' },
    { id: 'potencia', label: 'Potência de Corte' },
    { id: 'vida-ferramenta', label: 'Vida de Ferramenta' },
    { id: 'economia', label: 'Condições Econômicas' },
    { id: 'rugosidade', label: 'Rugosidade' },
    { id: 'otimizacao', label: 'Otimização' },
  ];

  const isCalcPage = CALC_ITEMS.some(item => item.id === currentPage);

  return (
    <div className="min-h-screen bg-background-primary text-text-primary flex flex-col items-center transition-colors duration-300">
      {/* Header */}
      <header className="w-full bg-background-primary border-b border-border-color flex flex-col items-center py-6 relative">
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">Usinagem Hub</h1>
        <p className="text-sm text-text-secondary font-medium uppercase tracking-widest mt-1">Engenharia de Usinagem & Educação</p>
        <button
          onClick={toggleTheme}
          className="absolute top-1/2 right-6 -translate-y-1/2 p-2 rounded-full bg-background-secondary hover:bg-border-color transition-colors"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </header>

      {/* Nav Bar */}
      <nav className="w-full sticky top-0 bg-background-primary/95 backdrop-blur-sm border-b border-border-color z-50 flex justify-center shadow-sm">
        <div className="max-w-custom w-full px-6 flex items-center justify-between md:justify-center h-14">
          <button className="md:hidden text-text-secondary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
          
          <ul className={`
            fixed md:static top-14 left-0 w-full md:w-auto bg-background-primary md:bg-transparent border-b md:border-none border-border-color
            flex flex-col md:flex-row items-center gap-1 md:gap-4 p-4 md:p-0 transition-all duration-200
            ${mobileMenuOpen ? 'flex' : 'hidden md:flex'}
          `}>
            {MAIN_NAV.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => navigate(item.id)}
                  className={`
                    px-3 py-1.5 text-sm font-medium transition-colors rounded-md
                    ${(currentPage === item.id || (item.id === 'tempos' && isCalcPage))
                      ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/50 dark:text-blue-400'
                      : 'text-text-secondary hover:text-text-primary hover:bg-background-secondary'}
                  `}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-custom w-full px-6 py-12 flex flex-col gap-12 fade-in flex-grow">
        {currentPage === 'home' && (
          <>
            <section className="text-center max-w-3xl mx-auto flex flex-col gap-4">
              <h2 className="text-4xl font-extrabold text-text-primary leading-tight tracking-tight">Portal de Engenharia e Aprendizado</h2>
              <p className="text-xl text-text-secondary leading-relaxed">
                Acesse calculadoras técnicas, estude a teoria dos processos e teste seus conhecimentos com simulados interativos.
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div onClick={() => navigate('theory')} className="group p-6 bg-background-secondary border border-border-color rounded-2xl hover:border-blue-300 transition-all cursor-pointer shadow-sm hover:shadow-md">
                <BookOpen className="text-blue-600 mb-4" size={32} />
                <h3 className="text-lg font-bold text-text-primary mb-2">Base Teórica</h3>
                <p className="text-sm text-text-secondary">Explore slides e conteúdos sobre fluidos, Taylor, Kienzle e mais.</p>
              </div>
              <div onClick={() => navigate('tempos')} className="group p-6 bg-background-secondary border border-border-color rounded-2xl hover:border-blue-300 transition-all cursor-pointer shadow-sm hover:shadow-md">
                <Calculator className="text-green-600 mb-4" size={32} />
                <h3 className="text-lg font-bold text-text-primary mb-2">Calculadoras</h3>
                <p className="text-sm text-text-secondary">8 módulos de cálculo para parâmetros de corte e forças.</p>
              </div>
              <div onClick={() => navigate('quiz')} className="group p-6 bg-background-secondary border border-border-color rounded-2xl hover:border-blue-300 transition-all cursor-pointer shadow-sm hover:shadow-md">
                <GraduationCap className="text-purple-600 mb-4" size={32} />
                <h3 className="text-lg font-bold text-text-primary mb-2">Simulado</h3>
                <p className="text-sm text-text-secondary">Teste seus conhecimentos para exames técnicos e acadêmicos.</p>
              </div>
              <div onClick={() => navigate('teacher')} className="group p-6 bg-background-secondary border border-border-color rounded-2xl hover:border-blue-300 transition-all cursor-pointer shadow-sm hover:shadow-md">
                <UserCog className="text-orange-600 mb-4" size={32} />
                <h3 className="text-lg font-bold text-text-primary mb-2">Professor</h3>
                <p className="text-sm text-text-secondary">Crie e gerencie questões para o banco de dados do portal.</p>
              </div>
            </section>
          </>
        )}

        {currentPage === 'theory' && <TheorySection />}
        
        {currentPage === 'quiz' && <QuizSection questions={questions} />}

        {currentPage === 'teacher' && <TeacherSection onAddQuestion={handleAddQuestion} />}

        {(isCalcPage || currentPage === 'tempos') && (
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap gap-2 justify-center border-b border-border-color pb-4">
              {CALC_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all ${currentPage === item.id ? 'bg-blue-600 text-white shadow-md' : 'bg-background-secondary text-text-secondary hover:bg-border-color'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <Calculators activePage={currentPage as PageID} onNavigateHome={() => setCurrentPage('home')} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-border-color flex flex-col items-center gap-4 bg-background-secondary">
        <p className="text-sm text-text-secondary font-medium tracking-wide uppercase">&copy; 2024 Usinagem Hub - Engenharia Mecânica & Educação</p>
      </footer>
    </div>
  );
}