import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Activity,
  Dna,
  Cpu,
  Zap,
  Layers,
  ArrowRight,
  TrendingUp,
  Sparkles,
  GitMerge,
  Atom,
} from 'lucide-react';

export const BioDeepTechSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kinetics' | 'flux' | 'autograd'>('kinetics');

  const pillars = [
    {
      id: 'kinetics',
      title: 'Reactor Dynamics & ODEs',
      subtitle: 'Van Heerden Stability & Runge-Kutta 4',
      icon: <Activity className="w-5 h-5 text-emerald-400" />,
      bioConcept: 'Non-isothermal CSTR mass & energy balance with Arrhenius reaction kinetics.',
      deepTechAnalogy:
        'Continuous dynamical systems in neural ODEs and recurrent residual state transitions.',
      mathEquation: 'dC_A/dt = (v_0/V)(C_{A0} - C_A) - k_0 e^{-E/RT} C_A',
      codeSnippet: `// Runge-Kutta 4 Integration in TypeScript
const k1 = f(t, y);
const k2 = f(t + dt/2, y + (dt/2)*k1);
const k3 = f(t + dt/2, y + (dt/2)*k2);
const k4 = f(t + dt, y + dt*k3);
const yNext = y + (dt/6)*(k1 + 2*k2 + 2*k3 + k4);`,
    },
    {
      id: 'flux',
      title: 'Metabolic Networks vs Neural Nets',
      subtitle: 'Stoichiometric Matrices vs Weight Tensors',
      icon: <Dna className="w-5 h-5 text-cyan-400" />,
      bioConcept: 'Cellular pathway regulation via stoichiometric matrix S · v = 0 constraint optimization.',
      deepTechAnalogy:
        'Layer-by-layer forward activation flow with constrained sparse activations and ReLU gating.',
      mathEquation: 'S_{m \\times n} \\cdot v_{n \\times 1} = 0 \\quad \\Longleftrightarrow \\quad Z^{[l]} = W^{[l]} A^{[l-1]} + b^{[l]}',
      codeSnippet: `// Matrix multiplication forward pass in pure NumPy
def forward(self, X):
    self.Z = np.dot(X, self.W) + self.b
    self.A = np.maximum(0, self.Z)  # ReLU
    return self.A`,
    },
    {
      id: 'autograd',
      title: 'Enzyme Allostery & Backpropagation',
      subtitle: 'Feedback Inhibition vs Gradient Descent',
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      bioConcept: 'Allosteric end-product feedback inhibition regulating upstream enzymatic throughput.',
      deepTechAnalogy:
        'Chain rule gradient flow from loss function back to initial layer weight tensors.',
      mathEquation: '\\frac{\\partial L}{\\partial W^{[l]}} = \\frac{\\partial L}{\\partial Z^{[l]}} \\cdot (A^{[l-1]})^T',
      codeSnippet: `// Backward gradient propagation from scratch
def backward(self, dOut, learning_rate=0.01):
    dZ = dOut * (self.Z > 0)  # ReLU derivative
    dW = np.dot(self.X.T, dZ)
    db = np.sum(dZ, axis=0, keepdims=True)
    self.W -= learning_rate * dW
    return np.dot(dZ, self.W.T)`,
    },
  ];

  const currentPillar = pillars.find((p) => p.id === activeTab)!;

  return (
    <section id="bio-tech-fusion" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono"
        >
          <Atom className="w-3.5 h-3.5 text-emerald-400" />
          <span>Interdisciplinary Paradigm</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-100"
        >
          Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400">Deep Tech</span> Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400">Bio-Engineering</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base leading-relaxed"
        >
          My foundation at IIT Delhi blends rigorous biochemical systems modeling with modern computational architectures, translating physical transport laws into high-performance neural and distributed algorithms.
        </motion.p>
      </div>

      {/* Main Interactive Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Navigation Column */}
        <div className="lg:col-span-4 space-y-3">
          {pillars.map((p) => (
            <div
              key={p.id}
              id={`fusion-tab-${p.id}`}
              onClick={() => setActiveTab(p.id as any)}
              className={`p-4 rounded-2xl cursor-pointer border transition-all duration-300 ${
                activeTab === p.id
                  ? 'bg-slate-900/90 border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.2)]'
                  : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/50 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  {p.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">{p.title}</h4>
                  <p className="text-[11px] font-mono text-slate-400">{p.subtitle}</p>
                </div>
              </div>
            </div>
          ))}

          {/* IIT Delhi Academic Note */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/30 to-emerald-950/30 border border-cyan-500/20 text-xs text-slate-300 space-y-1.5">
            <div className="font-semibold text-cyan-300 font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              IIT Delhi Curriculum Rigor:
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Applying differential equation kinematics, mass transfer operations, and thermodynamic phase equilibria directly to numerical solver design.
            </p>
          </div>
        </div>

        {/* Detailed Concept & Mathematical Equivalence View */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-slate-950/80 border border-slate-800/90 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700">
                  {currentPillar.icon}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-100">{currentPillar.title}</h3>
                  <p className="text-xs font-mono text-cyan-400">{currentPillar.subtitle}</p>
                </div>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                IIT Delhi Specialization
              </span>
            </div>

            {/* Comparison Cards: Biological Realm vs Computational Realm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/20 space-y-2">
                <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                  <Dna className="w-3.5 h-3.5" />
                  Biological / Reaction System
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{currentPillar.bioConcept}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20 space-y-2">
                <div className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  Computational / Neural System
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{currentPillar.deepTechAnalogy}</p>
              </div>
            </div>

            {/* Mathematical Formulation */}
            <div className="p-4 rounded-xl bg-slate-900/95 border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-slate-400 font-semibold">
                Underlying Mathematical Equivalence:
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 font-mono text-xs sm:text-sm text-cyan-300 border border-slate-800/80 overflow-x-auto">
                {currentPillar.mathEquation}
              </div>
            </div>

            {/* Code Implementation Preview */}
            <div className="p-4 rounded-xl bg-slate-900/95 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Algorithmic Implementation:</span>
                <span className="text-emerald-400 text-[11px]">Production Python / TS</span>
              </div>
              <pre className="p-3 rounded-lg bg-slate-950 font-mono text-[11px] sm:text-xs text-slate-300 border border-slate-800 overflow-x-auto">
                <code>{currentPillar.codeSnippet}</code>
              </pre>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>First-Principles Engineering</span>
            <span className="text-cyan-400">Zero Black-Boxes</span>
          </div>
        </div>
      </div>
    </section>
  );
};
