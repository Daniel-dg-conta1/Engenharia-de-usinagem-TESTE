import React, { useState } from 'react';
import { CheckCircle, XCircle, RefreshCcw } from 'lucide-react';
import { Question } from '../types';

interface QuizSectionProps {
  questions: Question[];
}

interface AnswersState {
  [key: string]: number;
}

export default function QuizSection({ questions }: QuizSectionProps) {
  const [answers, setAnswers] = useState<AnswersState>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (qId: string, optionIndex: number) => {
    if (showResults) return;
    setAnswers((prev) => ({ ...prev, [qId]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  const resetQuiz = () => {
    setAnswers({});
    setShowResults(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Simulado de Usinagem</h2>
        {showResults && (
          <div className="text-xl font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg">
            Nota: {calculateScore()} / {questions.length}
          </div>
        )}
      </div>

      <div className="space-y-6">
        {questions.map((q, index) => {
          return (
            <div key={q.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-slate-100 text-slate-600 font-bold rounded-full">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="text-lg font-medium text-slate-800 mb-4">{q.text}</p>
                  <div className="space-y-2">
                    {q.options.map((opt, i) => {
                      let btnClass = "w-full text-left p-3 rounded-lg border transition-all ";
                      
                      if (showResults) {
                        if (i === q.correctAnswer) btnClass += "bg-green-100 border-green-500 text-green-800 font-medium";
                        else if (answers[q.id] === i) btnClass += "bg-red-50 border-red-300 text-red-800";
                        else btnClass += "bg-slate-50 border-slate-200 text-slate-400";
                      } else {
                        if (answers[q.id] === i) btnClass += "bg-blue-50 border-blue-500 text-blue-800";
                        else btnClass += "hover:bg-slate-50 border-slate-200";
                      }

                      return (
                        <button
                          key={i}
                          onClick={() => handleSelect(q.id, i)}
                          className={btnClass}
                          disabled={showResults}
                        >
                          <div className="flex items-center justify-between">
                            <span>{opt}</span>
                            {showResults && i === q.correctAnswer && <CheckCircle size={18} className="text-green-600" />}
                            {showResults && answers[q.id] === i && i !== q.correctAnswer && <XCircle size={18} className="text-red-600" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end pt-4">
        {!showResults ? (
          <button
            onClick={() => setShowResults(true)}
            disabled={Object.keys(answers).length !== questions.length}
            className={`
              px-6 py-3 rounded-lg font-bold text-white transition-all
              ${Object.keys(answers).length !== questions.length 
                ? 'bg-slate-300 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl'}
            `}
          >
            Finalizar Simulado
          </button>
        ) : (
          <button
            onClick={resetQuiz}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg"
          >
            <RefreshCcw size={18} /> Tentar Novamente
          </button>
        )}
      </div>
    </div>
  );
}