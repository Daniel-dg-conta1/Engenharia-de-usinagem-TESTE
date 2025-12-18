export type PageID = 
  | 'home' 
  | 'theory'
  | 'quiz'
  | 'teacher'
  | 'tempos' 
  | 'velocidade' 
  | 'forca' 
  | 'potencia' 
  | 'vida-ferramenta' 
  | 'economia' 
  | 'rugosidade' 
  | 'otimizacao';

export interface NavItem {
  label: string;
  id: PageID;
  description?: string;
}

export interface CalculationResult {
  label: string;
  value: string;
  unit: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}