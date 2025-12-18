import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function CalculatorSection() {
  const [activeCalc, setActiveCalc] = useState('params');

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Calculadoras de Usinagem</h2>
      
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          onClick={() => setActiveCalc('params')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeCalc === 'params' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
        >
          Parâmetros ($v_c, n, MRR$)
        </button>
        <button 
          onClick={() => setActiveCalc('taylor')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeCalc === 'taylor' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
        >
          Equação de Taylor (Vida)
        </button>
        <button 
          onClick={() => setActiveCalc('power')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeCalc === 'power' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
        >
          Força e Potência
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        {activeCalc === 'params' && <ParametersCalculator />}
        {activeCalc === 'taylor' && <TaylorCalculator />}
        {activeCalc === 'power' && <PowerCalculator />}
      </div>
    </div>
  );
}

// ------------------- SUB-COMPONENTS -------------------

function ParametersCalculator() {
  const [d, setD] = useState('');
  const [n, setN] = useState('');
  const [vc, setVc] = useState('');
  const [f, setF] = useState('');
  const [ap, setAp] = useState('');

  const calculateVc = () => {
    if (d && n) {
      const val = (Math.PI * parseFloat(d) * parseFloat(n)) / 1000;
      setVc(val.toFixed(2));
    }
  };

  const calculateN = () => {
    if (d && vc) {
      const val = (parseFloat(vc) * 1000) / (Math.PI * parseFloat(d));
      setN(val.toFixed(0));
    }
  };

  const getMRR = () => {
    if (vc && f && ap) {
      // Q = vc * f * ap (Simplificado)
      // vc in m/min -> convert to mm/min for MRR in cm3/min? Usually Q = cm3/min
      // Q = (vc*1000) * f * ap  (mm3/min) -> /1000 -> cm3/min = vc * f * ap
      const val = parseFloat(vc) * parseFloat(f) * parseFloat(ap);
      return val.toFixed(2);
    }
    return '---';
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-slate-700">Entradas</h3>
        <div>
          <label className="block text-sm font-medium text-slate-600">Diâmetro ($D$) [mm]</label>
          <input type="number" value={d} onChange={e => setD(e.target.value)} className="w-full p-2 border rounded mt-1" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600">Rotação ($n$) [rpm]</label>
            <input type="number" value={n} onChange={e => setN(e.target.value)} className="w-full p-2 border rounded mt-1" />
            <button onClick={calculateN} className="text-xs text-blue-600 hover:underline mt-1">Calcular n (usando $v_c$)</button>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600">Vel. Corte ($v_c$) [m/min]</label>
            <input type="number" value={vc} onChange={e => setVc(e.target.value)} className="w-full p-2 border rounded mt-1" />
            <button onClick={calculateVc} className="text-xs text-blue-600 hover:underline mt-1">Calcular $v_c$ (usando n)</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600">Avanço ($f$) [mm/rev]</label>
            <input type="number" value={f} onChange={e => setF(e.target.value)} className="w-full p-2 border rounded mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600">Profundidade ($a_p$) [mm]</label>
            <input type="number" value={ap} onChange={e => setAp(e.target.value)} className="w-full p-2 border rounded mt-1" />
          </div>
        </div>
        <button onClick={() => {setD(''); setN(''); setVc(''); setF(''); setAp('');}} className="flex items-center gap-2 text-slate-500 hover:text-slate-800">
          <RotateCcw size={16} /> Limpar
        </button>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col justify-center items-center text-center">
        <h3 className="font-bold text-xl text-slate-800 mb-4">Resultados</h3>
        <div className="space-y-6 w-full">
          <div>
            <span className="block text-sm text-slate-500">Velocidade de Corte</span>
            <span className="text-3xl font-bold text-blue-600">{vc || '---'} <span className="text-lg text-slate-400">m/min</span></span>
          </div>
          <div>
            <span className="block text-sm text-slate-500">Rotação</span>
            <span className="text-3xl font-bold text-blue-600">{n || '---'} <span className="text-lg text-slate-400">rpm</span></span>
          </div>
          <div>
            <span className="block text-sm text-slate-500">Taxa de Remoção (MRR)</span>
            <span className="text-3xl font-bold text-green-600">{getMRR()} <span className="text-lg text-slate-400">cm³/min</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaylorCalculator() {
  const [c, setC] = useState('300'); // Taylor Constant
  const [x, setX] = useState('0.25'); // Exponent (usually 1/n slope, represented as x here for T = C/v^x formula logic adaptation or vT^n=C)
  // Taylor: v * T^n = C => T = (C/v)^(1/n)
  
  const [vc, setVc] = useState('150');

  const getLife = (vel: number) => {
    // T = (C / v)^(1/n) where 'x' in input acts as 'n'
    const exponent = parseFloat(x);
    if (exponent === 0) return 0;
    return Math.pow(parseFloat(c) / vel, 1 / exponent);
  };

  const calculatedLife = vc && c && x ? getLife(parseFloat(vc)).toFixed(1) : '---';

  // Generate chart data
  const data = [];
  if (c && x) {
    for (let v = 50; v <= 400; v += 50) {
      data.push({ v, T: parseFloat(getLife(v).toFixed(1)) });
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-600">Constante C (v para T=1min)</label>
          <input type="number" value={c} onChange={e => setC(e.target.value)} className="w-full p-2 border rounded mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600">Expoente n (inclinação)</label>
          <input type="number" value={x} onChange={e => setX(e.target.value)} className="w-full p-2 border rounded mt-1" step="0.01" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600">Velocidade de Corte Usada</label>
          <input type="number" value={vc} onChange={e => setVc(e.target.value)} className="w-full p-2 border rounded mt-1" />
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg text-center">
        <span className="block text-sm text-blue-800 font-semibold mb-1">Vida Estimada da Ferramenta ($T$)</span>
        <span className="text-4xl font-bold text-blue-700">{calculatedLife} <span className="text-xl">min</span></span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="v" label={{ value: 'Vc (m/min)', position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: 'Vida T (min)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="T" stroke="#8884d8" name="Curva de Vida (Taylor)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function PowerCalculator() {
  const [kc, setKc] = useState('2000'); // Specific cutting force N/mm2
  const [ap, setAp] = useState('2');
  const [f, setF] = useState('0.2');
  const [vc, setVc] = useState('150');
  const [eff, setEff] = useState('0.85'); // Efficiency

  // Fc = kc * ap * f (Simplified Kienzle)
  // Pc = Fc * vc / 60000 (kW)
  // P_motor = Pc / eff

  const force = kc && ap && f ? parseFloat(kc) * parseFloat(ap) * parseFloat(f) : 0;
  const power = force && vc ? (force * parseFloat(vc)) / 60000 : 0;
  const motorPower = power && eff ? power / parseFloat(eff) : 0;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-slate-700">Entradas (Modelo Simplificado)</h3>
        <div>
          <label className="block text-sm font-medium text-slate-600">Força Específica ($k_c$) [N/mm²]</label>
          <input type="number" value={kc} onChange={e => setKc(e.target.value)} className="w-full p-2 border rounded mt-1" />
          <p className="text-xs text-slate-400 mt-1">Ex: Aço ≈ 2000-2500, Alumínio ≈ 700</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600">Profundidade ($a_p$) [mm]</label>
            <input type="number" value={ap} onChange={e => setAp(e.target.value)} className="w-full p-2 border rounded mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600">Avanço ($f$) [mm]</label>
            <input type="number" value={f} onChange={e => setF(e.target.value)} className="w-full p-2 border rounded mt-1" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600">Vel. Corte ($v_c$) [m/min]</label>
            <input type="number" value={vc} onChange={e => setVc(e.target.value)} className="w-full p-2 border rounded mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600">Eficiência Máquina ($\eta$)</label>
            <input type="number" value={eff} onChange={e => setEff(e.target.value)} className="w-full p-2 border rounded mt-1" step="0.01" />
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col justify-center space-y-6">
        <div>
          <span className="block text-sm text-slate-500 mb-1">Força de Corte Estimada ($F_c$)</span>
          <span className="text-3xl font-bold text-slate-800">{force.toFixed(0)} <span className="text-lg text-slate-400">N</span></span>
        </div>
        <div>
          <span className="block text-sm text-slate-500 mb-1">Potência de Corte ($P_c$)</span>
          <span className="text-3xl font-bold text-indigo-600">{power.toFixed(2)} <span className="text-lg text-slate-400">kW</span></span>
        </div>
        <div className="pt-4 border-t border-slate-200">
          <span className="block text-sm text-slate-500 mb-1">Potência do Motor Necessária</span>
          <span className="text-4xl font-bold text-green-600">{motorPower.toFixed(2)} <span className="text-xl text-slate-400">kW</span></span>
        </div>
      </div>
    </div>
  );
}