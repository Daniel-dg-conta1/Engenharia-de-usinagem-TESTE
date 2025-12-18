import React, { useState } from 'react';
import { Menu, X, BookOpen, Calculator, GraduationCap, UserCog } from 'lucide-react';
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
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-100 flex flex-col items-center py-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Usinagem Hub</h1>
        <p className="text-sm text-gray-500 font-medium uppercase tracking-widest mt-1">Engenharia de Usinagem & Educação</p>
      </header>

      {/* Nav Bar */}
      <nav className="w-full sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50 flex justify-center shadow-sm">
        <div className="max-w-custom w-full px-6 flex items-center justify-between md:justify-center h-14">
          <button className="md:hidden text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
          
          <ul className={`
            fixed md:static top-14 left-0 w-full md:w-auto bg-white md:bg-transparent border-b md:border-none border-gray-100
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
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}
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
              <h2 className="text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">Portal de Engenharia e Aprendizado</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Acesse calculadoras técnicas, estude a teoria dos processos e teste seus conhecimentos com simulados interativos.
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div onClick={() => navigate('theory')} className="group p-6 bg-slate-50 border border-slate-200 rounded-2xl hover:border-blue-300 transition-all cursor-pointer shadow-sm hover:shadow-md">
                <BookOpen className="text-blue-600 mb-4" size={32} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Base Teórica</h3>
                <p className="text-sm text-gray-600">Explore slides e conteúdos sobre fluidos, Taylor, Kienzle e mais.</p>
              </div>
              <div onClick={() => navigate('tempos')} className="group p-6 bg-slate-50 border border-slate-200 rounded-2xl hover:border-blue-300 transition-all cursor-pointer shadow-sm hover:shadow-md">
                <Calculator className="text-green-600 mb-4" size={32} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Calculadoras</h3>
                <p className="text-sm text-gray-600">8 módulos de cálculo para parâmetros de corte e forças.</p>
              </div>
              <div onClick={() => navigate('quiz')} className="group p-6 bg-slate-50 border border-slate-200 rounded-2xl hover:border-blue-300 transition-all cursor-pointer shadow-sm hover:shadow-md">
                <GraduationCap className="text-purple-600 mb-4" size={32} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Simulado</h3>
                <p className="text-sm text-gray-600">Teste seus conhecimentos para exames técnicos e acadêmicos.</p>
              </div>
              <div onClick={() => navigate('teacher')} className="group p-6 bg-slate-50 border border-slate-200 rounded-2xl hover:border-blue-300 transition-all cursor-pointer shadow-sm hover:shadow-md">
                <UserCog className="text-orange-600 mb-4" size={32} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Professor</h3>
                <p className="text-sm text-gray-600">Crie e gerencie questões para o banco de dados do portal.</p>
              </div>
            </section>
          </>
        )}

        {currentPage === 'theory' && <TheorySection />}
        
        {currentPage === 'quiz' && <QuizSection questions={questions} />}

        {currentPage === 'teacher' && <TeacherSection onAddQuestion={handleAddQuestion} />}

        {(isCalcPage || currentPage === 'tempos') && (
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap gap-2 justify-center border-b border-gray-100 pb-4">
              {CALC_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all ${currentPage === item.id ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
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
      <footer className="w-full py-8 border-t border-gray-100 flex flex-col items-center gap-4 bg-slate-50">
        <p className="text-sm text-gray-400 font-medium tracking-wide uppercase">&copy; 2024 Usinagem Hub - Engenharia Mecânica & Educação</p>
      </footer>
    </div>
  );
}