import React, { useState } from 'react';
import { ArrowLeft, Calculator, Info, Zap, Clock, TrendingUp, BarChart, Settings } from 'lucide-react';
import { PageID } from '../types';

interface CalculatorsProps {
  activePage: PageID;
  onNavigateHome: () => void;
}

export default function Calculators({ activePage, onNavigateHome }: CalculatorsProps) {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="fade-in">
        {activePage === 'tempos' && <TemposCalculator />}
        {activePage === 'velocidade' && <VelocidadeCalculator />}
        {activePage === 'forca' && <ForcaCalculator />}
        {activePage === 'potencia' && <PotenciaCalculator />}
        {activePage === 'vida-ferramenta' && <VidaCalculator />}
        {activePage === 'economia' && <EconomiaCalculator />}
        {activePage === 'rugosidade' && <RugosidadeCalculator />}
        {activePage === 'otimizacao' && <OtimizacaoCalculator />}
      </div>
    </div>
  );
}

// Helper: UI Components
const Card = ({ children, title, description }: { children?: React.ReactNode, title: string, description?: string }) => (
  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
    <div className="p-6 border-b border-gray-100">
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

const InputGroup = ({ label, value, onChange, unit, placeholder }: any) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all pr-12"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 pointer-events-none">
        {unit}
      </span>
    </div>
  </div>
);

const ResultBox = ({ label, value, unit, color = "blue" }: any) => (
  <div className={`p-4 rounded-xl border ${color === 'blue' ? 'bg-blue-50 border-blue-100' : 'bg-green-50 border-green-100'} flex flex-col items-center justify-center text-center`}>
    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">{label}</span>
    <div className="flex items-baseline gap-1">
      <span className={`text-2xl font-black ${color === 'blue' ? 'text-blue-700' : 'text-green-700'}`}>{value}</span>
      <span className="text-sm font-semibold text-gray-400">{unit}</span>
    </div>
  </div>
);

// --- CALCULATORS ---

function TemposCalculator() {
  const [l, setL] = useState('100');
  const [f, setF] = useState('0.2');
  const [n, setN] = useState('1000');
  const [ap, setAp] = useState('2');
  const [vc, setVc] = useState('150');

  const tc = (parseFloat(l) / (parseFloat(f) * parseFloat(n))).toFixed(2);
  const mrr = (parseFloat(vc) * parseFloat(f) * parseFloat(ap)).toFixed(2);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card title="Tempos de Corte" description="Cálculo fundamental para produtividade.">
        <div className="grid gap-6">
          <InputGroup label="Comprimento de Corte (L)" value={l} onChange={setL} unit="mm" />
          <InputGroup label="Avanço (f)" value={f} onChange={setF} unit="mm/v" />
          <InputGroup label="Rotação (n)" value={n} onChange={setN} unit="rpm" />
          <div className="grid grid-cols-2 gap-4">
            <ResultBox label="Tempo de Corte (Tc)" value={tc} unit="min" />
            <ResultBox label="MRR (Taxa de Remoção)" value={mrr} unit="cm³/min" color="green" />
          </div>
        </div>
      </Card>
      <div className="bg-gray-50 p-6 rounded-xl text-sm text-gray-600 space-y-4">
        <h4 className="font-bold text-gray-900 flex items-center gap-2"><Info size={16} /> Teoria</h4>
        <p>O tempo de corte (Tc) é o tempo efetivo em que a ferramenta está em contato com a peça removendo material.</p>
        <p className="font-mono bg-white p-2 border border-gray-200 rounded">Tc = L / (f * n)</p>
        <p>MRR (Material Removal Rate) indica o volume de cavaco removido por unidade de tempo, essencial para dimensionamento de lote e capacidade de motor.</p>
      </div>
    </div>
  );
}

function VelocidadeCalculator() {
  const [d, setD] = useState('50');
  const [n, setN] = useState('1000');
  const [vc, setVc] = useState('157.08');

  const calcVc = (diam: string, rot: string) => {
    const val = (Math.PI * parseFloat(diam) * parseFloat(rot)) / 1000;
    setVc(val.toFixed(2));
  };

  const calcN = (diam: string, vel: string) => {
    const val = (parseFloat(vel) * 1000) / (Math.PI * parseFloat(diam));
    setN(val.toFixed(0));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card title="Velocidade de Corte" description="Conversão entre Vc e Rotação.">
        <div className="grid gap-6">
          <InputGroup label="Diâmetro da Peça/Ferramenta (D)" value={d} onChange={(v: any) => { setD(v); calcVc(v, n); }} unit="mm" />
          <InputGroup label="Rotação (n)" value={n} onChange={(v: any) => { setN(v); calcVc(d, v); }} unit="rpm" />
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-gray-400 font-bold uppercase">Ou calcule Rotação</span></div>
          </div>
          <InputGroup label="Velocidade de Corte (Vc)" value={vc} onChange={(v: any) => { setVc(v); calcN(d, v); }} unit="m/min" />
          <ResultBox label="Resultado Final (Vc)" value={vc} unit="m/min" />
        </div>
      </Card>
      <div className="bg-gray-50 p-6 rounded-xl text-sm text-gray-600 space-y-4">
        <h4 className="font-bold text-gray-900 flex items-center gap-2"><Info size={16} /> Teoria</h4>
        <p>A velocidade de corte é a velocidade tangencial no ponto de contato entre ferramenta e peça.</p>
        <div className="bg-white p-3 rounded border border-gray-200 font-mono text-center">
          Vc = (π * D * n) / 1000
        </div>
        <p>Para materiais duros, utiliza-se baixas Vc. Para materiais macios ou alumínio, Vc altas são recomendadas.</p>
      </div>
    </div>
  );
}

function ForcaCalculator() {
  const [mode, setMode] = useState<'calc' | 'exp'>('calc');
  // Calc inputs
  const [kc1, setKc1] = useState('2500');
  const [mc, setMc] = useState('0.25');
  const [b, setB] = useState('2');
  const [h, setH] = useState('0.2');
  // Exp inputs
  const [h1, setH1] = useState('0.1');
  const [fc1, setFc1] = useState('500');
  const [h2, setH2] = useState('0.3');
  const [fc2, setFc2] = useState('1200');

  let resultFc = "0";
  let expKc = "0";
  let expMc = "0";

  if (mode === 'calc') {
    resultFc = (parseFloat(kc1) * parseFloat(b) * Math.pow(parseFloat(h), 1 - parseFloat(mc))).toFixed(1);
  } else {
    // Experimental calculation
    // Fc = ks * b * h^(1-mc) -> assume b constant for simplicity or b=1
    // Ratio Fc1/Fc2 = (h1/h2)^(1-mc)
    // log(Fc1/Fc2) = (1-mc) * log(h1/h2)
    // 1-mc = log(Fc1/Fc2) / log(h1/h2)
    const ratioFc = parseFloat(fc1) / parseFloat(fc2);
    const ratioH = parseFloat(h1) / parseFloat(h2);
    const oneMinusMc = Math.log(ratioFc) / Math.log(ratioH);
    expMc = (1 - oneMinusMc).toFixed(3);
    expKc = (parseFloat(fc1) / Math.pow(parseFloat(h1), oneMinusMc)).toFixed(0);
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card title="Força de Corte (Kienzle)" description="Cálculo da força principal de corte.">
        <div className="flex gap-2 mb-6">
          <button onClick={() => setMode('calc')} className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${mode === 'calc' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-500'}`}>Calculadora</button>
          <button onClick={() => setMode('exp')} className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${mode === 'exp' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-500'}`}>Módulo Experimental</button>
        </div>

        {mode === 'calc' ? (
          <div className="grid gap-6">
            <InputGroup label="kc1.1 (Força específica)" value={kc1} onChange={setKc1} unit="N/mm²" />
            <InputGroup label="mc (Coeficiente Kienzle)" value={mc} onChange={setMc} unit="-" />
            <div className="grid grid-cols-2 gap-4">
              <InputGroup label="Largura (b)" value={b} onChange={setB} unit="mm" />
              <InputGroup label="Espessura (h)" value={h} onChange={setH} unit="mm" />
            </div>
            <ResultBox label="Força de Corte (Fc)" value={resultFc} unit="N" />
          </div>
        ) : (
          <div className="grid gap-4">
            <p className="text-xs text-gray-400 mb-2">Insira dois pontos de medição (Fc, h) para determinar os coeficientes do material.</p>
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <InputGroup label="h1" value={h1} onChange={setH1} unit="mm" />
              <InputGroup label="Fc1" value={fc1} onChange={setFc1} unit="N" />
            </div>
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <InputGroup label="h2" value={h2} onChange={setH2} unit="mm" />
              <InputGroup label="Fc2" value={fc2} onChange={setFc2} unit="N" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <ResultBox label="kc1.1 calculado" value={expKc} unit="N/mm²" color="green" />
              <ResultBox label="mc calculado" value={expMc} unit="-" color="green" />
            </div>
          </div>
        )}
      </Card>
      <div className="bg-gray-50 p-6 rounded-xl text-sm text-gray-600 space-y-4">
        <h4 className="font-bold text-gray-900 flex items-center gap-2"><Info size={16} /> Equação de Kienzle</h4>
        <p className="font-mono bg-white p-3 border border-gray-200 rounded">Fc = kc1.1 · b · h<sup>(1 - mc)</sup></p>
        <p>A força específica de corte (ks) não é constante; ela aumenta quando a espessura do cavaco (h) diminui.</p>
        <p>O módulo experimental permite que você calcule as propriedades do seu material específico a partir de testes em dinamômetro.</p>
      </div>
    </div>
  );
}

function PotenciaCalculator() {
  const [fc, setFc] = useState('1000');
  const [vc, setVc] = useState('150');
  const [eff, setEff] = useState('0.8');

  const pc = (parseFloat(fc) * parseFloat(vc) / 60000).toFixed(2);
  const pmot = (parseFloat(pc) / parseFloat(eff)).toFixed(2);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card title="Potência de Corte" description="Verificação energética do processo.">
        <div className="grid gap-6">
          <InputGroup label="Força de Corte (Fc)" value={fc} onChange={setFc} unit="N" />
          <InputGroup label="Velocidade de Corte (Vc)" value={vc} onChange={setVc} unit="m/min" />
          <InputGroup label="Rendimento da Máquina (η)" value={eff} onChange={setEff} unit="-" />
          <div className="grid grid-cols-2 gap-4">
            <ResultBox label="Potência de Corte (Pc)" value={pc} unit="kW" />
            <ResultBox label="Potência Motor (Pm)" value={pmot} unit="kW" color="green" />
          </div>
        </div>
      </Card>
      <div className="bg-gray-50 p-6 rounded-xl text-sm text-gray-600 space-y-4">
        <h4 className="font-bold text-gray-900 flex items-center gap-2"><Zap size={16} /> Dimensionamento</h4>
        <p>A potência mecânica necessária deve ser menor que a potência nominal do motor da máquina, considerando o rendimento das engrenagens e rolamentos.</p>
        <p className="font-mono bg-white p-2 border border-gray-200 rounded">Pc (kW) = (Fc · Vc) / 60000</p>
      </div>
    </div>
  );
}

function VidaCalculator() {
  const [mode, setMode] = useState<'calc' | 'exp'>('calc');
  const [c, setC] = useState('300');
  const [n, setN] = useState('0.25');
  const [vc, setVc] = useState('150');

  const [v1, setV1] = useState('200');
  const [t1, setT1] = useState('15');
  const [v2, setV2] = useState('100');
  const [t2, setT2] = useState('60');

  let resultT = "0";
  let expC = "0";
  let expN = "0";

  if (mode === 'calc') {
    resultT = Math.pow(parseFloat(c) / parseFloat(vc), 1 / parseFloat(n)).toFixed(1);
  } else {
    // Taylor: V * T^n = C -> V1 * T1^n = V2 * T2^n
    // V1/V2 = (T2/T1)^n -> n = log(V1/V2) / log(T2/T1)
    const ratioV = parseFloat(v1) / parseFloat(v2);
    const ratioT = parseFloat(t2) / parseFloat(t1);
    const calculatedN = Math.log(ratioV) / Math.log(ratioT);
    expN = calculatedN.toFixed(3);
    expC = (parseFloat(v1) * Math.pow(parseFloat(t1), calculatedN)).toFixed(0);
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card title="Vida de Ferramenta (Taylor)" description="Previsão de desgaste e tempo de troca.">
        <div className="flex gap-2 mb-6">
          <button onClick={() => setMode('calc')} className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${mode === 'calc' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-500'}`}>Calculadora</button>
          <button onClick={() => setMode('exp')} className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${mode === 'exp' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-500'}`}>Módulo Experimental</button>
        </div>

        {mode === 'calc' ? (
          <div className="grid gap-6">
            <InputGroup label="Constante C" value={c} onChange={setC} unit="-" />
            <InputGroup label="Coeficiente n" value={n} onChange={setN} unit="-" />
            <InputGroup label="Velocidade de Corte (Vc)" value={vc} onChange={setVc} unit="m/min" />
            <ResultBox label="Vida da Ferramenta (T)" value={resultT} unit="min" />
          </div>
        ) : (
          <div className="grid gap-4">
            <p className="text-xs text-gray-400 mb-2">Insira dois testes (Vc, T) para encontrar a reta de Taylor do material.</p>
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <InputGroup label="Vc1" value={v1} onChange={setV1} unit="m/min" />
              <InputGroup label="T1" value={t1} onChange={setT1} unit="min" />
            </div>
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <InputGroup label="Vc2" value={v2} onChange={setV2} unit="m/min" />
              <InputGroup label="T2" value={t2} onChange={setT2} unit="min" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <ResultBox label="C calculado" value={expC} unit="-" color="green" />
              <ResultBox label="n calculado" value={expN} unit="-" color="green" />
            </div>
          </div>
        )}
      </Card>
      <div className="bg-gray-50 p-6 rounded-xl text-sm text-gray-600 space-y-4">
        <h4 className="font-bold text-gray-900 flex items-center gap-2"><Clock size={16} /> Vida de Taylor</h4>
        <p>A vida da ferramenta é o tempo de corte acumulado até que ela perca sua capacidade de usinar dentro das tolerâncias.</p>
        <p className="font-mono bg-white p-2 border border-gray-200 rounded">V · T<sup>n</sup> = C</p>
        <p>Valores típicos de n: <br/>- Metal duro: 0.2 a 0.3 <br/>- Cerâmica: 0.4 a 0.6 <br/>- Aço rápido: 0.1 a 0.15</p>
      </div>
    </div>
  );
}

function EconomiaCalculator() {
  const [c, setC] = useState('300');
  const [n, setN] = useState('0.25');
  const [k1, setK1] = useState('1.5'); // Custo máquina por min
  const [kf, setKf] = useState('45'); // Custo ferramenta por aresta
  const [td, setTd] = useState('3'); // Tempo troca

  // Taylor: T_opt = (1/n - 1) * (td + kf/k1)
  const nVal = parseFloat(n);
  const tOpt = ((1/nVal - 1) * (parseFloat(td) + parseFloat(kf) / parseFloat(k1))).toFixed(1);
  const vcOpt = (parseFloat(c) / Math.pow(parseFloat(tOpt), nVal)).toFixed(1);
  
  // Max prod: T_max = (1/n - 1) * td
  const tMax = ((1/nVal - 1) * parseFloat(td)).toFixed(1);
  const vcMax = (parseFloat(c) / Math.pow(parseFloat(tMax), nVal)).toFixed(1);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card title="Condições Econômicas" description="Velocidade ideal de usinagem.">
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <InputGroup label="Constante C" value={c} onChange={setC} unit="-" />
            <InputGroup label="Coeficiente n" value={n} onChange={setN} unit="-" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <InputGroup label="Custo Máquina" value={k1} onChange={setK1} unit="$/min" />
            <InputGroup label="Custo Ferram." value={kf} onChange={setKf} unit="$/aresta" />
            <InputGroup label="Tempo Troca" value={td} onChange={setTd} unit="min" />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <h4 className="text-xs font-bold text-blue-800 uppercase mb-2">Mínimo Custo</h4>
              <p className="text-xl font-black text-blue-900">{vcOpt} <span className="text-sm font-normal text-blue-400">m/min</span></p>
              <p className="text-xs text-blue-600 mt-1">Vida ideal: {tOpt} min</p>
            </div>
            <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
              <h4 className="text-xs font-bold text-orange-800 uppercase mb-2">Máxima Produção</h4>
              <p className="text-xl font-black text-orange-900">{vcMax} <span className="text-sm font-normal text-orange-400">m/min</span></p>
              <p className="text-xs text-orange-600 mt-1">Vida ideal: {tMax} min</p>
            </div>
          </div>
        </div>
      </Card>
      <div className="bg-gray-50 p-6 rounded-xl text-sm text-gray-600 space-y-4">
        <h4 className="font-bold text-gray-900 flex items-center gap-2"><TrendingUp size={16} /> Otimização Econômica</h4>
        <p>A velocidade de corte econômica (v_opt) busca o equilíbrio entre o custo de tempo da máquina e o custo de troca da ferramenta.</p>
        <p>O intervalo entre V_min_cost e V_max_prod é chamado de <strong>Intervalo de Máxima Eficiência</strong>.</p>
      </div>
    </div>
  );
}

function RugosidadeCalculator() {
  const [f, setF] = useState('0.2');
  const [re, setRe] = useState('0.8');

  const ra = (1000 * Math.pow(parseFloat(f), 2) / (32 * parseFloat(re))).toFixed(2);
  const rt = (1000 * Math.pow(parseFloat(f), 2) / (8 * parseFloat(re))).toFixed(2);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card title="Rugosidade Teórica" description="Previsão de acabamento superficial.">
        <div className="grid gap-6">
          <InputGroup label="Avanço (f)" value={f} onChange={setF} unit="mm/v" />
          <InputGroup label="Raio da Ponta (r_ε)" value={re} onChange={setRe} unit="mm" />
          <div className="grid grid-cols-2 gap-4">
            <ResultBox label="Ra Teórico" value={ra} unit="μm" />
            <ResultBox label="Rt Teórico" value={rt} unit="μm" color="green" />
          </div>
        </div>
      </Card>
      <div className="bg-gray-50 p-6 rounded-xl text-sm text-gray-600 space-y-4">
        <h4 className="font-bold text-gray-900 flex items-center gap-2"><BarChart size={16} /> Acabamento</h4>
        <p>A rugosidade teórica depende da geometria da ferramenta e do avanço, ignorando vibrações e gume postiço.</p>
        <p className="font-mono bg-white p-2 border border-gray-200 rounded">Ra ≈ f² / (32 · r_ε)</p>
        <p>Aumentar o raio de ponta ou diminuir o avanço melhora drasticamente o acabamento.</p>
      </div>
    </div>
  );
}

function OtimizacaoCalculator() {
  const [pLim, setPLim] = useState('15');
  const [raLim, setRaLim] = useState('1.6');
  
  const [vc, setVc] = useState('200');
  const [f, setF] = useState('0.15');
  const [ap, setAp] = useState('2');
  const [kc1, setKc1] = useState('2500');
  const [re, setRe] = useState('0.8');

  // Calcs
  const fc = parseFloat(kc1) * parseFloat(ap) * Math.pow(parseFloat(f), 0.75); // Using standard mc=0.25
  const pc = (fc * parseFloat(vc) / 60000);
  const ra = (1000 * Math.pow(parseFloat(f), 2) / (32 * parseFloat(re)));

  const pOk = pc <= parseFloat(pLim);
  const raOk = ra <= parseFloat(raLim);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card title="Otimização de Parâmetros" description="Verifique restrições técnicas.">
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <InputGroup label="Potência Limite" value={pLim} onChange={setPLim} unit="kW" />
            <InputGroup label="Rugosidade Max (Ra)" value={raLim} onChange={setRaLim} unit="μm" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <InputGroup label="Vc" value={vc} onChange={setVc} unit="m/min" />
            <InputGroup label="f" value={f} onChange={setF} unit="mm/v" />
            <InputGroup label="ap" value={ap} onChange={setAp} unit="mm" />
          </div>
          <div className="mt-4 space-y-3">
            <div className={`p-4 rounded-xl flex items-center justify-between border ${pOk ? 'bg-green-50 border-green-100 text-green-800' : 'bg-red-50 border-red-100 text-red-800'}`}>
              <span className="font-bold">Potência: {pc.toFixed(2)} kW</span>
              <span className="text-xs uppercase font-black">{pOk ? 'DENTRO' : 'EXCEDE LIMITE'}</span>
            </div>
            <div className={`p-4 rounded-xl flex items-center justify-between border ${raOk ? 'bg-green-50 border-green-100 text-green-800' : 'bg-red-50 border-red-100 text-red-800'}`}>
              <span className="font-bold">Rugosidade: {ra.toFixed(2)} μm</span>
              <span className="text-xs uppercase font-black">{raOk ? 'DENTRO' : 'EXCEDE LIMITE'}</span>
            </div>
          </div>
        </div>
      </Card>
      <div className="bg-gray-50 p-6 rounded-xl text-sm text-gray-600 space-y-4">
        <h4 className="font-bold text-gray-900 flex items-center gap-2"><Settings size={16} /> Restrições</h4>
        <p>A otimização em usinagem envolve escolher a maior taxa de remoção possível (produtividade) sem violar:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Potência disponível na máquina.</li>
          <li>Qualidade superficial (Rugosidade).</li>
          <li>Esforços mecânicos (Força de Corte).</li>
          <li>Vibrações e estabilidade.</li>
        </ul>
      </div>
    </div>
  );
}