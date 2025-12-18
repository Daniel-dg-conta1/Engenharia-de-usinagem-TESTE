import React, { useState } from 'react';
import { ChevronRight, Beaker, TrendingUp, Cpu, Activity, Ruler, PenTool } from 'lucide-react';

const topics = [
  {
    id: 'coolants',
    title: 'Meios Lubri-refrigerantes',
    icon: <Beaker className="text-blue-500" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">Meios Lubri-refrigerantes (Fluidos de Corte)</h2>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Funções Principais</h3>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li><strong>Refrigeração:</strong> Redução da temperatura na peça e ferramenta. Evita deformações térmicas e erros dimensionais.</li>
            <li><strong>Lubrificação:</strong> Redução do atrito entre ferramenta e cavaco (Zona A) e entre peça e ferramenta (Zona B). Diminui a geração de calor e o desgaste.</li>
            <li><strong>Transporte de Cavacos:</strong> Expulsão dos cavacos da zona de corte (crítico em furação profunda).</li>
            <li><strong>Proteção:</strong> Contra corrosão da peça e da máquina.</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Tipos de Fluidos</h3>
            <ul className="space-y-3 text-slate-700">
              <li className="p-2 bg-slate-50 rounded"><strong>Óleos de Corte (Integrais):</strong> Minerais (ativos/inativos), graxos ou compostos. Ótima lubrificação, baixa refrigeração.</li>
              <li className="p-2 bg-slate-50 rounded"><strong>Emulsionáveis (Solúveis):</strong> Mistura de óleo em água (ex: 5% a 8%). Ótima refrigeração (devido à água), lubrificação média.</li>
              <li className="p-2 bg-slate-50 rounded"><strong>Sintéticos/Químicos:</strong> Soluções isentas de óleo mineral. Alta refrigeração, transparentes.</li>
              <li className="p-2 bg-slate-50 rounded"><strong>Gasosos:</strong> Ar comprimido, Nitrogênio, CO2. Apenas refrigeração e expulsão de cavacos.</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Alternativas Ecológicas</h3>
            <p className="mb-3 text-slate-600">Devido a custos (7-17% do custo de fabricação) e impacto ambiental/saúde:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li><strong>Usinagem a Seco:</strong> Eliminação total. Exige ferramentas especiais (cerâmica, CBN, Metal Duro revestido) e geometrias adaptadas.</li>
              <li><strong>MQL (Mínima Quantidade de Lubrificante):</strong> Vazão &lt; 50 ml/h. Pulverização de óleo em ar comprimido diretamente na zona de corte.</li>
              <li><strong>Usinagem Criogênica:</strong> Uso de Nitrogênio líquido.</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'economics',
    title: 'Condições Econômicas',
    icon: <TrendingUp className="text-green-500" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">Condições Econômicas de Corte</h2>
        
        <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600">
          <h3 className="text-lg font-bold mb-2">Objetivos de Otimização</h3>
          <p>A escolha da Velocidade de Corte (vc) define o desempenho econômico:</p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li><strong>Máxima Produção:</strong> Minimizar o tempo total de ciclo ($T_c$).</li>
            <li><strong>Mínimo Custo:</strong> Minimizar o custo total por peça ($C_p$).</li>
          </ol>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Fórmulas Fundamentais</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="p-3 border">Variável</th>
                <th className="p-3 border">Descrição</th>
                <th className="p-3 border">Fórmula / Relação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border font-mono">T</td>
                <td className="p-3 border">Vida da ferramenta (Taylor)</td>
                <td className="p-3 border font-mono">T = K · v_c^(-1/n) ou T · v_c^(1/n) = C</td>
              </tr>
              <tr>
                <td className="p-3 border font-mono">v_max</td>
                <td className="p-3 border">Velocidade Máxima Produção</td>
                <td className="p-3 border font-mono">v_max = C / [ ((1/n) - 1) · t_troca ]^n</td>
              </tr>
              <tr>
                <td className="p-3 border font-mono">v_min</td>
                <td className="p-3 border">Velocidade Mínimo Custo</td>
                <td className="p-3 border font-mono">v_min = C / [ ((1/n) - 1) · (t_troca + (C_ferramenta/C_maquina)) ]^n</td>
              </tr>
              <tr>
                <td className="p-3 border font-mono">IMEF</td>
                <td className="p-3 border">Intervalo de Máx. Eficiência</td>
                <td className="p-3 border">Entre v_min e v_max</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  },
  {
    id: 'machinability',
    title: 'Usinabilidade',
    icon: <Cpu className="text-purple-500" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">Usinabilidade dos Materiais</h2>
        <p className="text-slate-600">Grau de facilidade de se usinar um material. Avaliada por: Vida da ferramenta, Forças de corte, Acabamento superficial e Formação de cavacos.</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold mb-3 text-slate-800">Aços</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
              <li><strong>Baixo Carbono (Ferrita):</strong> Alta ductilidade, cavaco longo, tendência a gume postiço. Usinabilidade ruim para acabamento.</li>
              <li><strong>Médio Carbono (Perlita+Ferrita):</strong> Melhor usinabilidade. Quebra de cavaco razoável.</li>
              <li><strong>Alto Carbono (Perlita+Cementita):</strong> Abrasivo, desgaste rápido da ferramenta.</li>
              <li><strong>Elementos de Liga:</strong>
                <ul className="list-circle pl-4 mt-1 text-slate-500">
                  <li>Enxofre (S), Chumbo (Pb): Formam inclusões que quebram o cavaco (Aços "Free-Cutting"). Melhora usinabilidade.</li>
                  <li>Cromo, Molibdênio: Aumentam resistência a quente, pioram usinabilidade.</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold mb-3 text-slate-800">Outros Materiais</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
              <li><strong>Ferro Fundido (Cinzento):</strong> Cavacos curtos (quebradiços) devido à grafita. Abrasivo, mas boa usinabilidade geral.</li>
              <li><strong>Alumínio:</strong> Alta condutividade térmica, baixa força de corte. Tendência a empastamento (adesão). Exige altas velocidades.</li>
              <li><strong>Titânio:</strong> Baixa condutividade térmica (calor concentra na ferramenta), alta reatividade química. Difícil usinagem.</li>
              <li><strong>Ligas de Níquel:</strong> Alta resistência a quente, encruamento rápido. Muito difícil.</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'fundamentals',
    title: 'Fundamentos do Corte',
    icon: <Activity className="text-red-500" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">Fundamentos da Usinagem (ABNT 6162)</h2>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Movimentos</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-slate-50 rounded border border-slate-100">
              <h4 className="font-bold text-slate-900">Movimento de Corte</h4>
              <p className="text-sm text-slate-600 mt-2">Movimento principal que remove o cavaco (rotação da peça no torno, rotação da fresa na fresadora). Gera a velocidade de corte ($v_c$).</p>
            </div>
            <div className="p-4 bg-slate-50 rounded border border-slate-100">
              <h4 className="font-bold text-slate-900">Movimento de Avanço</h4>
              <p className="text-sm text-slate-600 mt-2">Movimento contínuo ou intermitente que coloca novo material sob a ação da ferramenta. Gera a velocidade de avanço ($v_f$).</p>
            </div>
            <div className="p-4 bg-slate-50 rounded border border-slate-100">
              <h4 className="font-bold text-slate-900">Movimento Efetivo</h4>
              <p className="text-sm text-slate-600 mt-2">Resultante vetorial dos movimentos de corte e avanço.</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Parâmetros de Corte</h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
            <li><strong>Velocidade de Corte ($v_c$):</strong> Velocidade tangencial instantânea. $v_c = (\pi \cdot D \cdot n) / 1000$ [m/min]. Maior influência na temperatura e vida útil.</li>
            <li><strong>Avanço ($f$):</strong> Deslocamento da ferramenta por volta ou por dente. Influencia o acabamento superficial e a força de corte.</li>
            <li><strong>Profundidade de Corte ($a_p$):</strong> Penetração da ferramenta na peça. Determina a largura do cavaco.</li>
            <li><strong>Taxa de Remoção de Material (MRR):</strong> $Q = v_c \cdot f \cdot a_p$ (aproximado). Volume removido por tempo.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'toollife',
    title: 'Vida da Ferramenta',
    icon: <Ruler className="text-orange-500" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">Vida da Ferramenta e Desgaste</h2>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Mecanismos de Desgaste</h3>
          <ul className="space-y-2 text-slate-700">
            <li><strong>Abrasão:</strong> Perda de material por ação mecânica de partículas duras da peça. Predomina em baixas velocidades.</li>
            <li><strong>Adesão:</strong> Soldagem por pressão (micro-soldas) e arrancamento de partículas. Causa o "Gume Postiço" (BUE). Predomina em velocidades médias/baixas.</li>
            <li><strong>Difusão:</strong> Transferência atômica entre ferramenta e peça em altas temperaturas. Crítico para metal duro em altas velocidades.</li>
            <li><strong>Oxidação:</strong> Reação química superficial com o oxigênio.</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Critérios de Fim de Vida (ISO 3685)</h3>
          <p className="mb-4 text-slate-600">A ferramenta deve ser trocada quando:</p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li>Desgaste de flanco médio ($VB_B$) atinge 0,3 mm.</li>
            <li>Desgaste de flanco máximo ($VB_{'{max}'}$) atinge 0,6 mm.</li>
            <li>Profundidade de cratera ($KT$) excessiva.</li>
            <li>Falha catastrófica (quebra).</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'forces',
    title: 'Força e Potência',
    icon: <TrendingUp className="text-indigo-500" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">Força e Potência de Usinagem</h2>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Modelo de Kienzle</h3>
          <p className="mb-4 text-slate-700">
            A Força de Corte ($F_c$) é a principal componente (consome ~99% da potência).
          </p>
          <div className="p-4 bg-slate-100 rounded font-mono text-center mb-4">
            F_c = k_{'{c1.1}'} · b · h^(1 - m_c)
          </div>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>$k_{'{c1.1}'}$: Força específica de corte para h=1mm e b=1mm (tabelado).</li>
            <li>$b$: Largura de usinagem ($b \approx a_p / \sin(\chi_r)$).</li>
            <li>$h$: Espessura de usinagem ($h \approx f \cdot \sin(\chi_r)$).</li>
            <li>$1-m_c$: Fator de influência da espessura (tabelado).</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Potência de Corte ($P_c$)</h3>
          <div className="p-4 bg-slate-100 rounded font-mono text-center mb-4">
            P_c = (F_c · v_c) / 60000  [kW]
          </div>
          <p className="text-sm text-slate-600">Onde $F_c$ está em Newtons e $v_c$ em m/min. A potência do motor deve considerar o rendimento da máquina ($\eta$).</p>
        </div>
      </div>
    )
  },
  {
    id: 'geometry',
    title: 'Geometria da Ferramenta',
    icon: <PenTool className="text-pink-500" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">Geometria da Cunha Cortante</h2>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Ângulos Fundamentais</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-slate-800">Ângulo de Saída ($\gamma$)</h4>
              <p className="text-slate-600">Influencia o fluxo do cavaco e a força de corte. Positivo (materiais macios) reduz força. Negativo (cerâmica, desbaste pesado) aumenta resistência da aresta.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Ângulo de Folga ($\alpha$)</h4>
              <p className="text-slate-600">Evita atrito entre o flanco da ferramenta e a peça usinada. Valores baixos geram atrito/calor; valores altos fragilizam o gume.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Ângulo de Cunha ($\beta$)</h4>
              <p className="text-slate-600">Define a robustez da ferramenta.</p>
            </div>
            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 font-bold">
              Relação fundamental: $\alpha + \beta + \gamma = 90^\circ$
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Ângulo de Posição ($\chi_r$)</h3>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li>Afeta a espessura do cavaco ($h$) e o comprimento de contato ($b$).</li>
            <li>$\chi_r = 90^\circ$: $h=f$, $b=a_p$. Força radial mínima (bom para peças esbeltas).</li>
            <li>$\chi_r &lt; 90^\circ$ (ex: 45°): $h &lt; f$, $b &gt; a_p$. Protege a ponta na entrada, distribui o calor, mas aumenta vibração radial.</li>
          </ul>
        </div>
      </div>
    )
  }
];

export default function TheorySection() {
  const [activeTopic, setActiveTopic] = useState(topics[0]);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Topics Menu */}
      <div className="w-full lg:w-1/4 space-y-2">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => setActiveTopic(topic)}
            className={`
              w-full flex items-center justify-between p-4 rounded-xl transition-all
              ${activeTopic.id === topic.id 
                ? 'bg-white shadow-md border-l-4 border-blue-600 text-blue-800' 
                : 'bg-white/50 hover:bg-white text-slate-600 hover:shadow-sm'}
            `}
          >
            <div className="flex items-center gap-3">
              {topic.icon}
              <span className="font-medium text-sm md:text-base text-left">{topic.title}</span>
            </div>
            {activeTopic.id === topic.id && <ChevronRight size={16} />}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="w-full lg:w-3/4">
        <div className="bg-slate-50 rounded-2xl p-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTopic.content}
        </div>
      </div>
    </div>
  );
}