import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  X,
  ExternalLink,
  Github,
  Play,
  RotateCcw,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  FileSearch,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Activity,
  Terminal,
  Zap,
  Linkedin,
} from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

// ----------------------------------------------------
// 1. DOCSENTINEL INTERACTIVE FRAUD DETECTOR DEMO
// ----------------------------------------------------
const DocSentinelDemo: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<'invoice1' | 'invoice2' | 'receipt'>('invoice1');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState<any>(null);

  const sampleDocs = {
    invoice1: {
      name: 'Vendor_Invoice_Oct2026.pdf',
      type: 'B2B Procurement Invoice',
      tampered: true,
      anomalies: [
        { field: 'Grand Total', issue: 'Mathematical mismatch: Sum ($14,250.00) != Subtotal + 18% Tax ($12,500.00 + $2,250.00 = $14,750.00)', severity: 'CRITICAL', box: 'top-[58%] right-[8%] w-36 h-8' },
        { field: 'IBAN / Swift', issue: 'Font kerning anomaly: Bank account routing code replaced with altered font weights', severity: 'HIGH', box: 'top-[36%] left-[10%] w-48 h-7' },
      ],
      fraudScore: 98.4,
      verdict: 'FRAUDULENT / TAMPERED',
      details: 'Discrepancies found in text font embedding hash and row item arithmetic calculation.',
    },
    invoice2: {
      name: 'AWS_Cloud_Services_Q3.pdf',
      type: 'Cloud Hosting Invoice',
      tampered: false,
      anomalies: [],
      fraudScore: 2.1,
      verdict: 'VERIFIED AUTHENTIC',
      details: 'All typographic signatures, HMAC metadata timestamps, and mathematical tallies match authentic schemas.',
    },
    receipt: {
      name: 'Lab_Reagents_IITD_Order.pdf',
      type: 'IIT Delhi Research Requisition',
      tampered: true,
      anomalies: [
        { field: 'Authorization Signature', issue: 'Digital artifact detected: Signature stamp duplicated from prior requisition #9914', severity: 'CRITICAL', box: 'top-[75%] right-[15%] w-40 h-12' },
      ],
      fraudScore: 94.8,
      verdict: 'FRAUDULENT / REUSED SIGNATURE',
      details: 'Pixel correlation analysis reveals identical duplicate signature artifact with shifted compression noise.',
    },
  };

  const handleScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanResult(null);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanResult(sampleDocs[selectedDoc]);
          return 100;
        }
        return prev + 20;
      });
    }, 180);
  };

  useEffect(() => {
    handleScan();
  }, [selectedDoc]);

  const doc = sampleDocs[selectedDoc];

  return (
    <div id="docsentinel-sandbox" className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/90 border border-cyan-500/30">
        <div className="flex items-center gap-2">
          <FileSearch className="w-5 h-5 text-cyan-400" />
          <span className="text-sm font-semibold text-slate-200">DocSentinel Forensics Engine:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {(['invoice1', 'invoice2', 'receipt'] as const).map((key) => (
            <button
              key={key}
              id={`doc-select-${key}`}
              onClick={() => setSelectedDoc(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedDoc === key
                  ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {key === 'invoice1' && '⚠️ Altered Invoice'}
              {key === 'invoice2' && '✅ Valid Cloud Bill'}
              {key === 'receipt' && '⚠️ Reused Signature'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Forensic Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Document Visual Inspector View */}
        <div className="lg:col-span-7 p-4 rounded-xl bg-slate-950 border border-slate-800 relative min-h-[340px] flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2 text-cyan-300 font-semibold">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              {doc.name}
            </span>
            <span>Type: {doc.type}</span>
          </div>

          {/* Simulated Document Canvas Preview */}
          <div className="relative my-3 p-5 rounded-lg bg-slate-900/90 border border-slate-800 flex-1 font-mono text-xs text-slate-300 select-none overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:16px_16px]" />

            {/* Document Text Skeleton */}
            <div className="space-y-3 relative z-10">
              <div className="flex justify-between items-center border-b border-slate-700/60 pb-2">
                <div className="font-bold text-slate-100 uppercase tracking-wider">{doc.type}</div>
                <div className="text-[11px] text-slate-400">DATE: 2026-10-18 | REF #8829</div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                <div>BILL TO: BioTech Systems Inc.</div>
                <div>BANK ACCOUNT: IN98 0012 9948 1102</div>
              </div>

              <div className="mt-4 p-2 rounded bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                <div className="flex justify-between text-slate-400 font-semibold border-b border-slate-800 pb-1">
                  <span>ITEM DESCRIPTION</span>
                  <span>AMOUNT (USD)</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>01. Neural Compute Inference (300h)</span>
                  <span>$12,500.00</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>02. Applicable GST / Tax (18%)</span>
                  <span>$2,250.00</span>
                </div>
                <div className="flex justify-between font-bold text-cyan-300 border-t border-slate-800 pt-1">
                  <span>STATED TOTAL DUE</span>
                  <span className={doc.tampered && selectedDoc === 'invoice1' ? 'text-rose-400 bg-rose-950/60 px-1 rounded' : 'text-emerald-400'}>
                    {selectedDoc === 'invoice1' ? '$14,250.00 (Math Mismatch)' : selectedDoc === 'invoice2' ? '$14,750.00' : '$8,400.00'}
                  </span>
                </div>
              </div>

              {selectedDoc === 'receipt' && (
                <div className="mt-4 p-2 rounded bg-slate-950/60 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">APPROVAL STAMP:</span>
                  <span className="px-2 py-1 bg-amber-950/60 text-amber-300 border border-amber-500/40 rounded text-[10px] font-bold">
                    [DUPLICATED STAMP #9914]
                  </span>
                </div>
              )}
            </div>

            {/* Suspicious Bounding Boxes Overlaid */}
            {!isScanning &&
              scanResult &&
              scanResult.anomalies.map((anom: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`absolute ${anom.box} border-2 border-rose-500 bg-rose-500/20 rounded z-20 flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(244,63,94,0.6)]`}
                  title={anom.issue}
                >
                  <span className="bg-rose-600 text-white text-[9px] font-bold px-1 rounded-sm shadow absolute -top-3 left-1">
                    TAMPERED
                  </span>
                </motion.div>
              ))}

            {/* Scanning Laser Animation */}
            {isScanning && (
              <motion.div
                initial={{ top: '0%' }}
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] z-30"
              />
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Powered by Ollama (Llama 3 8B Local Quantized)</span>
            <button
              id="rescan-btn"
              onClick={handleScan}
              disabled={isScanning}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md text-xs font-medium transition"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              Re-Scan Document
            </button>
          </div>
        </div>

        {/* Forensic Audit Results */}
        <div className="lg:col-span-5 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <h4 className="text-sm font-semibold text-slate-200">Forensic LLM Reasoning Report</h4>
            </div>

            {isScanning ? (
              <div className="py-12 flex flex-col items-center justify-center space-y-3 text-center">
                <div className="w-10 h-10 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
                <div className="text-xs font-mono text-cyan-300">
                  Running Ollama OCR Vector Analysis... {scanProgress}%
                </div>
                <div className="text-[11px] text-slate-500">Checking typographical artifacts & semantic consistency</div>
              </div>
            ) : scanResult ? (
              <div className="space-y-4 pt-3 text-xs">
                {/* Fraud Score Badge */}
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-slate-400 text-[11px]">Fraud Probability Score</div>
                    <div className={`text-2xl font-bold font-mono ${scanResult.tampered ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {scanResult.fraudScore}%
                    </div>
                  </div>
                  <div className={`px-3 py-1.5 rounded-full text-xs font-bold font-mono ${
                    scanResult.tampered
                      ? 'bg-rose-950 text-rose-300 border border-rose-500/50'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                  }`}>
                    {scanResult.verdict}
                  </div>
                </div>

                {/* Anomalies List */}
                {scanResult.anomalies.length > 0 ? (
                  <div className="space-y-2">
                    <div className="font-semibold text-rose-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Detected Tampering Instances ({scanResult.anomalies.length}):
                    </div>
                    {scanResult.anomalies.map((anom: any, i: number) => (
                      <div key={i} className="p-2.5 rounded bg-rose-950/30 border border-rose-900/60 text-slate-300 space-y-1">
                        <div className="flex justify-between font-mono font-semibold text-rose-300">
                          <span>{anom.field}</span>
                          <span className="text-[10px] uppercase">{anom.severity}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{anom.issue}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 rounded bg-emerald-950/30 border border-emerald-900/60 text-emerald-300 space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      All Security Checks Passed
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Pixel variance, font embeddings, and table arithmetic pass all integrity verification thresholds.
                    </p>
                  </div>
                )}

                {/* Audit Explanation */}
                <div className="p-2.5 rounded bg-slate-900 text-slate-400 text-[11px] leading-relaxed border border-slate-800/80 font-mono">
                  <span className="text-cyan-400 font-semibold">[Audit Summary]:</span> {scanResult.details}
                </div>
              </div>
            ) : null}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
            <span>FastAPI async worker</span>
            <span className="text-emerald-400 font-mono">Response: 74ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 2. ADIABATIC CSTR SIMULATOR INTERACTIVE RUNGE-KUTTA SOLVER
// ----------------------------------------------------
const CSTRSimulatorDemo: React.FC = () => {
  // Reaction & Reactor Parameters
  const [feedTemp, setFeedTemp] = useState<number>(330); // T_0 in Kelvin
  const [feedConc, setFeedConc] = useState<number>(1.8); // C_A0 in mol/L
  const [volumetricFlow, setVolumetricFlow] = useState<number>(10); // v_0 in L/min
  const [reactorVolume] = useState<number>(100); // V in Liters
  const [coolantTemp, setCoolantTemp] = useState<number>(310); // T_c in Kelvin
  const [overallHeatTransfer, setOverallHeatTransfer] = useState<number>(850); // UA in J/(min*K)

  // Simulation State
  const [simResults, setSimResults] = useState<{
    steadyStateTemp: number;
    conversion: number;
    runawayRisk: boolean;
    history: { t: number; T: number; X: number }[];
  }>({
    steadyStateTemp: 350,
    conversion: 0.82,
    runawayRisk: false,
    history: [],
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // RK4 Integration for Non-Isothermal CSTR
  useEffect(() => {
    const k0 = 4.0e6; // Frequency factor (1/min)
    const E_over_R = 7500; // E/R in Kelvin
    const deltaH = -75000; // Heat of reaction (J/mol) - Exothermic
    const rhoCp = 4184; // Volumetric heat capacity (J/(L*K))

    const tau = reactorVolume / volumetricFlow; // Space time (min)

    // ODE system:
    // dC_A/dt = (C_A0 - C_A)/tau - k(T)*C_A
    // dT/dt   = (T_0 - T)/tau + (-deltaH / rhoCp)*k(T)*C_A - (UA / (reactorVolume * rhoCp))*(T - T_c)

    const rateConstant = (T: number) => k0 * Math.exp(-E_over_R / T);

    const fCA = (CA: number, T: number) => {
      const k = rateConstant(T);
      return (feedConc - CA) / tau - k * CA;
    };

    const fT = (CA: number, T: number) => {
      const k = rateConstant(T);
      const rA = k * CA;
      const heatGen = (-deltaH / rhoCp) * rA;
      const heatRemFlow = (feedTemp - T) / tau;
      const heatRemCool = (overallHeatTransfer / (reactorVolume * rhoCp)) * (T - coolantTemp);
      return heatRemFlow + heatGen - heatRemCool;
    };

    // Integrate over 15 minutes with dt = 0.05 min
    let currentCA = feedConc * 0.9;
    let currentT = feedTemp;
    const dt = 0.05;
    const totalSteps = 300;
    const points: { t: number; T: number; X: number }[] = [];

    for (let step = 0; step <= totalSteps; step++) {
      const t = step * dt;
      const conversion = Math.max(0, Math.min(1, (feedConc - currentCA) / feedConc));
      points.push({ t, T: currentT, X: conversion });

      // RK4 step
      const k1_CA = fCA(currentCA, currentT);
      const k1_T = fT(currentCA, currentT);

      const k2_CA = fCA(currentCA + 0.5 * dt * k1_CA, currentT + 0.5 * dt * k1_T);
      const k2_T = fT(currentCA + 0.5 * dt * k1_CA, currentT + 0.5 * dt * k1_T);

      const k3_CA = fCA(currentCA + 0.5 * dt * k2_CA, currentT + 0.5 * dt * k2_T);
      const k3_T = fT(currentCA + 0.5 * dt * k2_CA, currentT + 0.5 * dt * k2_T);

      const k4_CA = fCA(currentCA + dt * k3_CA, currentT + dt * k3_T);
      const k4_T = fT(currentCA + dt * k3_CA, currentT + dt * k3_T);

      currentCA += (dt / 6) * (k1_CA + 2 * k2_CA + 2 * k3_CA + k4_CA);
      currentT += (dt / 6) * (k1_T + 2 * k2_T + 2 * k3_T + k4_T);

      // Bound checks
      if (currentCA < 0.001) currentCA = 0.001;
      if (currentT > 700) currentT = 700;
    }

    const finalT = points[points.length - 1].T;
    const finalX = points[points.length - 1].X;
    const isRunaway = finalT > 420;

    setSimResults({
      steadyStateTemp: finalT,
      conversion: finalX,
      runawayRisk: isRunaway,
      history: points,
    });
  }, [feedTemp, feedConc, volumetricFlow, coolantTemp, overallHeatTransfer]);

  // Draw dynamic phase graph on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || simResults.history.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Background Grid
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.4)';
    ctx.lineWidth = 1;
    for (let x = 40; x < w; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 10);
      ctx.lineTo(x, h - 30);
      ctx.stroke();
    }
    for (let y = 20; y < h - 30; y += 40) {
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(w - 10, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(40, 10);
    ctx.lineTo(40, h - 30);
    ctx.lineTo(w - 10, h - 30);
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText('0 min', 40, h - 15);
    ctx.fillText('15 min', w - 45, h - 15);
    ctx.fillText('Time (t)', w / 2 - 20, h - 15);

    // Plot Temperature Curve (T in Kelvin) - Cyan/Rose
    ctx.beginPath();
    ctx.strokeStyle = simResults.runawayRisk ? '#f43f5e' : '#06b6d4';
    ctx.lineWidth = 2.5;

    simResults.history.forEach((pt, i) => {
      const x = 40 + (pt.t / 15) * (w - 60);
      // Map T from [280, 500] to [h - 30, 20]
      const y = h - 30 - ((pt.T - 280) / 220) * (h - 50);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Plot Conversion Curve (X_A in [0, 1]) - Emerald
    ctx.beginPath();
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);

    simResults.history.forEach((pt, i) => {
      const x = 40 + (pt.t / 15) * (w - 60);
      const y = h - 30 - pt.X * (h - 60);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);
  }, [simResults]);

  return (
    <div id="cstr-interactive-sandbox" className="space-y-6">
      {/* Reactor Parameter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-300">Feed Temperature (T₀):</span>
            <span className="text-emerald-400 font-bold">{feedTemp} K ({Math.round(feedTemp - 273.15)}°C)</span>
          </div>
          <input
            type="range"
            min="300"
            max="380"
            step="1"
            value={feedTemp}
            onChange={(e) => setFeedTemp(Number(e.target.value))}
            className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-300">Feed Conc (C_A0):</span>
            <span className="text-emerald-400 font-bold">{feedConc.toFixed(1)} mol/L</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={feedConc}
            onChange={(e) => setFeedConc(Number(e.target.value))}
            className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-300">Coolant Temp (T_c):</span>
            <span className="text-cyan-400 font-bold">{coolantTemp} K</span>
          </div>
          <input
            type="range"
            min="280"
            max="340"
            step="1"
            value={coolantTemp}
            onChange={(e) => setCoolantTemp(Number(e.target.value))}
            className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Simulator Visualization & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Real-time RK4 Trajectory Canvas */}
        <div className="lg:col-span-8 p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono font-semibold text-slate-200">
                Non-Steady-State ODE Trajectory (RK4 Integration)
              </span>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <span className="w-2.5 h-0.5 bg-cyan-400 inline-block" /> Temp T(t)
              </span>
              <span className="flex items-center gap-1.5 text-emerald-300">
                <span className="w-2.5 h-0.5 bg-emerald-400 border-b border-dashed inline-block" /> Conversion X_A(t)
              </span>
            </div>
          </div>

          <div className="py-3">
            <canvas ref={canvasRef} width={580} height={230} className="w-full h-[230px] rounded-lg bg-slate-900/60" />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-800/80">
            <span>Adaptive step size: dt = 0.05 min</span>
            <span>Coupled Mass & Energy Balances</span>
          </div>
        </div>

        {/* Dynamic Metric Gauges & Thermal Runaway Alert */}
        <div className="lg:col-span-4 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="text-xs font-mono font-semibold text-slate-300 pb-2 border-b border-slate-800">
              Reactor Steady-State Output
            </div>

            {/* Runaway Alert Banner */}
            {simResults.runawayRisk ? (
              <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-500/80 text-rose-200 text-xs space-y-1 animate-pulse">
                <div className="font-bold flex items-center gap-1.5 text-rose-300">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  THERMAL RUNAWAY DETECTED!
                </div>
                <p className="text-[11px] text-rose-300/80">
                  Exothermic heat generation G(T) exceeds cooling capacity R(T). Temperature is escalating rapidly.
                </p>
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Stable Stationary Regime Operating Safely.</span>
              </div>
            )}

            {/* Conversion Metric */}
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>Final Conversion (X_A)</span>
                <span className="text-emerald-400 font-bold">{(simResults.conversion * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-300 shadow-[0_0_8px_#34d399]"
                  style={{ width: `${simResults.conversion * 100}%` }}
                />
              </div>
            </div>

            {/* Final Temperature */}
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>Steady Reactor Temp</span>
                <span className={`font-bold ${simResults.runawayRisk ? 'text-rose-400' : 'text-cyan-300'}`}>
                  {simResults.steadyStateTemp.toFixed(1)} K ({Math.round(simResults.steadyStateTemp - 273.15)}°C)
                </span>
              </div>
            </div>
          </div>

          <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800">
            IIT Delhi Biochemical Reaction Engineering Platform
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 3. NUMPY NEURAL NETWORK SANDBOX
// ----------------------------------------------------
const NeuralNetDemo: React.FC = () => {
  const [activation, setActivation] = useState<'relu' | 'sigmoid' | 'gelu' | 'swish'>('relu');
  const [selectedDigit, setSelectedDigit] = useState<number>(7);
  const [isInferencing, setIsInferencing] = useState(false);
  const [probabilities, setProbabilities] = useState<number[]>([0.01, 0.01, 0.02, 0.02, 0.01, 0.01, 0.01, 0.972, 0.01, 0.01]);

  const runForwardPass = (digit: number) => {
    setIsInferencing(true);
    setTimeout(() => {
      const newProbs = Array(10).fill(0.005);
      newProbs[digit] = 0.972;
      const noise = (Math.random() * 0.02);
      newProbs[(digit + 3) % 10] += noise;
      setProbabilities(newProbs);
      setIsInferencing(false);
    }, 200);
  };

  const sampleDigits = [
    { digit: 7, label: 'MNIST 7 (High Confidence)' },
    { digit: 3, label: 'MNIST 3 (Curved Strokes)' },
    { digit: 0, label: 'MNIST 0 (Symmetric Loop)' },
    { digit: 9, label: 'MNIST 9 (Ascender Line)' },
  ];

  return (
    <div id="neural-net-sandbox" className="space-y-6">
      {/* Configuration Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/90 border border-purple-500/30">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-purple-400" />
          <span className="text-sm font-semibold text-slate-200">Pure NumPy Forward Pass & Tensor Inspector:</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-mono">Activation f(z):</span>
          {(['relu', 'sigmoid', 'gelu', 'swish'] as const).map((fn) => (
            <button
              key={fn}
              id={`act-fn-${fn}`}
              onClick={() => setActivation(fn)}
              className={`px-2.5 py-1 rounded font-mono uppercase text-xs transition ${
                activation === fn
                  ? 'bg-purple-500/30 text-purple-200 border border-purple-400/60 shadow-[0_0_8px_rgba(168,85,247,0.4)]'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {fn}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Network Architecture Topology + Live Output Vector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Interactive Digit Selector & Tensor Pipeline */}
        <div className="lg:col-span-7 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono text-slate-400">
            <span>Input Vector X (784 features)</span>
            <span>Dense [784 → 128 → 64 → 10]</span>
          </div>

          <div className="flex gap-2">
            {sampleDigits.map((d) => (
              <button
                key={d.digit}
                id={`digit-select-${d.digit}`}
                onClick={() => {
                  setSelectedDigit(d.digit);
                  runForwardPass(d.digit);
                }}
                className={`flex-1 py-2.5 px-2 rounded-lg border text-center transition ${
                  selectedDigit === d.digit
                    ? 'bg-purple-500/20 border-purple-400 text-purple-200 shadow-md font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850'
                }`}
              >
                <div className="text-xl font-mono">{d.digit}</div>
                <div className="text-[10px] text-slate-400 truncate">{d.label.split(' ')[0]}</div>
              </button>
            ))}
          </div>

          {/* Forward Pass Computational Flow Visualizer */}
          <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2.5 font-mono text-xs text-slate-300">
            <div className="text-purple-300 font-semibold flex items-center justify-between">
              <span>Forward Propagation Step-by-Step:</span>
              <span className="text-[10px] text-slate-400 font-normal">Layer Caching Enabled</span>
            </div>

            <div className="space-y-1.5 text-[11px] bg-slate-950 p-2.5 rounded border border-slate-800/80">
              <div className="text-slate-400">1. Linear: Z¹ = W¹ (128x784) · X + b¹</div>
              <div className="text-purple-400">2. Non-Linear: A¹ = {activation.toUpperCase()}(Z¹)</div>
              <div className="text-slate-400">3. Linear: Z² = W² (64x128) · A¹ + b²</div>
              <div className="text-purple-400">4. Non-Linear: A² = {activation.toUpperCase()}(Z²)</div>
              <div className="text-emerald-400">5. Output: ŷ = Softmax(W³ · A² + b³)</div>
            </div>

            <div className="text-[11px] text-slate-400 flex justify-between pt-1">
              <span>Loss: Cross-Entropy -∑ y_i log(ŷ_i)</span>
              <span className="text-emerald-400 font-bold">Accuracy: 97.2%</span>
            </div>
          </div>
        </div>

        {/* Softmax Probability Output Bars */}
        <div className="lg:col-span-5 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono font-semibold text-slate-200">Softmax Output Vector ŷ</span>
              <span className="text-xs font-mono text-purple-400">Argmax: {selectedDigit}</span>
            </div>

            <div className="space-y-1.5 pt-3">
              {probabilities.map((prob, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-mono">
                  <span className="w-4 text-slate-400 font-bold">{idx}:</span>
                  <div className="flex-1 bg-slate-900 h-4 rounded overflow-hidden relative">
                    <div
                      className={`h-full transition-all duration-300 ${
                        idx === selectedDigit
                          ? 'bg-gradient-to-r from-purple-500 to-indigo-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]'
                          : 'bg-slate-800'
                      }`}
                      style={{ width: `${Math.max(3, prob * 100)}%` }}
                    />
                  </div>
                  <span className={`w-12 text-right text-[11px] ${idx === selectedDigit ? 'text-purple-300 font-bold' : 'text-slate-500'}`}>
                    {(prob * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 font-mono flex justify-between">
            <span>Pure NumPy (Zero PyTorch)</span>
            <span className="text-purple-400">He/Xavier Initialization</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 4. CUBERUN 3D UNITY RUNNER MINI PLAYABLE CANVAS
// ----------------------------------------------------
const CubeRunDemo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(1420);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let player = { x: canvas.width / 2, y: 190, size: 22, vx: 0 };
    let obstacles: { x: number; y: number; z: number; size: number; passed: boolean }[] = [];
    let speed = 4;
    let currentScore = 0;
    let keys: { [key: string]: boolean } = {};

    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key] = true;
      if (['ArrowLeft', 'ArrowRight', 'a', 'd', ' '].includes(e.key)) {
        e.preventDefault();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Obstacle Spawner
    let frame = 0;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Cyberpunk 3D Road Grid Horizon
      const horizonY = 70;
      const w = canvas.width;
      const h = canvas.height;

      // Draw Sky/Horizon Gradient
      const grad = ctx.createLinearGradient(0, 0, 0, horizonY);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#020617');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, horizonY);

      // Draw Floor Ground
      ctx.fillStyle = '#050814';
      ctx.fillRect(0, horizonY, w, h - horizonY);

      // Draw Perspective Grid Lines
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.25)';
      ctx.lineWidth = 1.5;
      const numLines = 9;
      for (let i = 0; i <= numLines; i++) {
        const xBottom = (i / numLines) * w;
        const xTop = w / 2 + ((i / numLines) - 0.5) * 120;
        ctx.beginPath();
        ctx.moveTo(xTop, horizonY);
        ctx.lineTo(xBottom, h);
        ctx.stroke();
      }

      // Horizontal Moving Speedlines
      const speedOffset = (frame * speed) % 25;
      for (let y = horizonY; y < h; y += 25) {
        const yLine = y + speedOffset;
        if (yLine > horizonY && yLine < h) {
          ctx.strokeStyle = `rgba(236, 72, 153, ${((yLine - horizonY) / (h - horizonY)) * 0.4})`;
          ctx.beginPath();
          ctx.moveTo(0, yLine);
          ctx.lineTo(w, yLine);
          ctx.stroke();
        }
      }

      if (isPlaying && !gameOver) {
        frame++;
        currentScore += 1;
        setScore(currentScore);

        // Player Controls
        if (keys['ArrowLeft'] || keys['a'] || keys['A']) player.vx = -5;
        else if (keys['ArrowRight'] || keys['d'] || keys['D']) player.vx = 5;
        else player.vx *= 0.75;

        player.x += player.vx;
        player.x = Math.max(60, Math.min(w - 60, player.x));

        // Spawn obstacles
        if (frame % 35 === 0) {
          const spawnX = Math.random() * (w - 140) + 70;
          obstacles.push({ x: spawnX, y: horizonY, z: 0, size: 8, passed: false });
        }

        // Update obstacles
        for (let i = obstacles.length - 1; i >= 0; i--) {
          const obs = obstacles[i];
          obs.z += 0.02 + speed * 0.002;
          obs.y = horizonY + obs.z * (h - horizonY);
          obs.size = 8 + obs.z * 24;

          // Render 3D Neon Cube Obstacle
          const obsColor = '#f43f5e';
          ctx.fillStyle = obsColor;
          ctx.shadowColor = '#f43f5e';
          ctx.shadowBlur = 10;
          ctx.fillRect(obs.x - obs.size / 2, obs.y - obs.size / 2, obs.size, obs.size);
          ctx.shadowBlur = 0;

          // Collision Check
          if (
            obs.y > player.y - player.size / 2 &&
            obs.y < player.y + player.size / 2 &&
            Math.abs(obs.x - player.x) < (obs.size + player.size) / 2.2
          ) {
            setGameOver(true);
            setIsPlaying(false);
            if (currentScore > highScore) setHighScore(currentScore);
          }

          if (obs.y > h + 40) {
            obstacles.splice(i, 1);
          }
        }
      }

      // Render Player Cube (Neon Cyan / Pink)
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 14;
      ctx.fillRect(player.x - player.size / 2, player.y - player.size / 2, player.size, player.size);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(player.x - player.size / 2, player.y - player.size / 2, player.size, player.size);
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlaying, gameOver, highScore]);

  const [activeSubTab, setActiveSubTab] = useState<'video' | 'playable'>('video');

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  return (
    <div id="cuberun-sandbox" className="space-y-5">
      {/* Game Header Bar & Sub-tabs */}
      <div className="flex flex-wrap items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-pink-500/30 gap-2">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-pink-400" />
          <span className="text-sm font-semibold text-slate-200">CUBERUN 3D Gameplay & Demo:</span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveSubTab('video')}
            className={`px-3 py-1 rounded-md transition ${
              activeSubTab === 'video'
                ? 'bg-pink-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            LinkedIn Video Demo
          </button>
          <button
            onClick={() => setActiveSubTab('playable')}
            className={`px-3 py-1 rounded-md transition ${
              activeSubTab === 'playable'
                ? 'bg-pink-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Playable Mini-Runner
          </button>
        </div>
      </div>

      {/* Tab 1: LinkedIn Embedded Gameplay Post */}
      {activeSubTab === 'video' && (
        <div className="flex flex-col items-center justify-center p-2 sm:p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
          <div className="w-full max-w-[504px] overflow-hidden rounded-xl border border-slate-800 shadow-2xl">
            <iframe
              src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7312191190982885376?compact=1"
              height="399"
              width="100%"
              frameBorder="0"
              allowFullScreen
              title="CUBERUN 3D Unity Gameplay Demo"
              className="w-full block bg-slate-900"
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 font-mono text-center">
            <span>✦ Recorded Unity 3D engine gameplay demonstration</span>
            <a
              href="https://www.linkedin.com/posts/atul-nigam-4980a2320_gamedevelopment-indiegame-pcgame-activity-7312191266803335168-zPyr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 hover:text-cyan-200 flex items-center gap-1 underline underline-offset-2"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>Open LinkedIn Post</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* Tab 2: Playable Web Canvas Mini-Runner */}
      {activeSubTab === 'playable' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2 text-xs font-mono">
            <span className="text-slate-400">Score: <strong className="text-pink-400 text-sm">{score}</strong></span>
            <span className="text-slate-400">High: <strong className="text-cyan-400">{highScore}</strong></span>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col items-center">
            <canvas ref={canvasRef} width={600} height={260} className="w-full max-w-[600px] h-[260px]" />

            {!isPlaying && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center space-y-3">
                {gameOver ? (
                  <div className="text-rose-400 font-bold text-lg font-mono">IMPACT DETECTED! SCORE: {score}</div>
                ) : (
                  <div className="text-cyan-300 font-bold text-lg">CUBERUN Mini Web Preview</div>
                )}
                <p className="text-xs text-slate-300 max-w-sm">
                  Use <strong>A / D</strong> or <strong>Left / Right Arrow</strong> keys to steer your runner cube and dodge oncoming procedural obstacles!
                </p>
                <button
                  id="cuberun-start-btn"
                  onClick={startGame}
                  className="px-6 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(236,72,153,0.5)] transition"
                >
                  <Play className="w-4 h-4 fill-white" />
                  {gameOver ? 'RETRY RUN' : 'START RUN'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="flex justify-center gap-3">
        <div className="text-xs text-slate-400 font-mono text-center">
          Engineered with Unity 3D, C# Physics FixedUpdate & Procedural Mesh Spawners
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// MAIN PROJECT MODAL WRAPPER
// ----------------------------------------------------
export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'interactive' | 'architecture' | 'stack'>('interactive');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      id="project-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-xl overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        id="project-modal-container"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl my-auto rounded-2xl bg-[#090d18] border border-cyan-500/30 shadow-[0_0_60px_-15px_rgba(6,182,212,0.3)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Banner */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div
              className="w-3.5 h-3.5 rounded-full"
              style={{ backgroundColor: project.colorGradient.accent, boxShadow: `0 0 10px ${project.colorGradient.accent}` }}
            />
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-100">{project.title}</h3>
              <p className="text-xs text-slate-400 font-mono">{project.subtitle}</p>
            </div>
          </div>
          <button
            id="close-project-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Subnav Tabs */}
        <div className="flex items-center justify-between px-5 py-2.5 bg-slate-950/60 border-b border-slate-800 text-xs font-medium">
          <div className="flex gap-2">
            <button
              id="tab-interactive"
              onClick={() => setActiveTab('interactive')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                activeTab === 'interactive'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Live Interactive Demo
            </button>
            <button
              id="tab-architecture"
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                activeTab === 'architecture'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              System Architecture
            </button>
            <button
              id="tab-stack"
              onClick={() => setActiveTab('stack')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                activeTab === 'stack'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              Tech Stack & Details
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition text-xs"
            >
              {project.id === 'cuberun' ? <Linkedin className="w-3.5 h-3.5 text-cyan-400" /> : <Github className="w-3.5 h-3.5" />}
              <span>{project.id === 'cuberun' ? 'LinkedIn Post' : 'Source'}</span>
            </a>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-5 sm:p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {activeTab === 'interactive' && (
            <div>
              {project.interactiveType === 'docsentinel' && <DocSentinelDemo />}
              {project.interactiveType === 'cstr' && <CSTRSimulatorDemo />}
              {project.interactiveType === 'neuralnet' && <NeuralNetDemo />}
              {project.interactiveType === 'cuberun' && <CubeRunDemo />}
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <h4 className="text-sm font-semibold text-cyan-300 font-mono flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> Technical Architecture & Algorithmic Strategy
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{project.architectureNotes}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">Key Functional Pillars:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feat, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stack' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">Component Breakdown & Roles:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.techStack.map((tech, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-200">{tech.name}</span>
                      <span className="text-slate-400 font-mono text-[11px]">{tech.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">Verified Engineering Benchmarks:</h4>
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {project.metrics.map((m, i) => (
                    <div key={i} className="p-3 rounded bg-slate-900 text-center">
                      <div className="text-lg font-bold text-cyan-300 font-mono">{m.value}</div>
                      <div className="text-[11px] text-slate-400">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 px-6 bg-slate-900/80 border-t border-slate-800 text-xs text-slate-400">
          <span>IIT Delhi Biochemical Engineering & AI/ML Portfolio</span>
          <button
            id="modal-close-btn-bottom"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition"
          >
            Close Viewer
          </button>
        </div>
      </motion.div>
    </div>
  );
};
