import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Question } from '../types';

interface TeacherSectionProps {
  onAddQuestion: (q: Question) => void;
}

export default function TeacherSection({ onAddQuestion }: TeacherSectionProps) {
  const [text, setText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correct, setCorrect] = useState(0);

  const handleOptionChange = (idx: number, val: string) => {
    const newOptions = [...options];
    newOptions[idx] = val;
    setOptions(newOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text || options.some(o => !o)) {
      alert('Preencha o enunciado e todas as alternativas.');
      return;
    }

    const newQuestion: Question = {
      id: Date.now().toString(),
      text,
      options,
      correctAnswer: correct
    };

    onAddQuestion(newQuestion);
    
    // Reset form
    setText('');
    setOptions(['', '', '', '']);
    setCorrect(0);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
            <PlusCircle size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Criar Nova Questão</h2>
            <p className="text-sm text-slate-500">Adicione exercícios para as listas dos alunos.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Enunciado da Questão</label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              placeholder="Digite a pergunta aqui..."
              rows={3}
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">Alternativas</label>
            {options.map((opt, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={correct === idx}
                  onChange={() => setCorrect(idx)}
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500 cursor-pointer"
                />
                <input
                  type="text"
                  value={opt}
                  onChange={e => handleOptionChange(idx, e.target.value)}
                  className={`flex-1 p-2 border rounded-lg focus:ring-2 outline-none transition-all ${correct === idx ? 'border-purple-500 bg-purple-50' : 'border-slate-300'}`}
                  placeholder={`Opção ${idx + 1}`}
                />
              </div>
            ))}
            <p className="text-xs text-slate-500 mt-2">* Selecione o botão de rádio ao lado da resposta correta.</p>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
            >
              <PlusCircle size={20} />
              Adicionar ao Banco de Questões
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}