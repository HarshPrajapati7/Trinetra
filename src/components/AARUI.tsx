export default function AARUI() {
  return (
    <div className="h-full w-full p-6 bg-[#050505] overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="border-b border-gray-800 pb-6">
          <h1 className="text-2xl font-semibold text-white tracking-tight">AFTER-ACTION REVIEW</h1>
          <p className="text-sm font-mono text-accent mt-2">Scenario: Night / Haze / Multiple UAVs (Completed)</p>
        </header>

        <div className="grid grid-cols-12 gap-8">
          
          {/* EVENT TIMELINE */}
          <div className="col-span-5 glass-panel p-6 flex flex-col">
            <h2 className="text-sm font-semibold tracking-wider text-gray-400 border-b border-gray-800 pb-3 mb-6">TIME / EVENT</h2>
            
            <div className="space-y-6 flex-1 border-l-2 border-gray-800 ml-2 pl-4 relative">
              <TimelineEvent time="12.4s" title="First observation" type="info" />
              <TimelineEvent time="14.7s" title="RGB reliability drops" type="warning" />
              <TimelineEvent time="16.2s" title="Thermal evidence appears" type="info" />
              <TimelineEvent time="18.1s" title="Fused track strengthened" type="success" />
              <TimelineEvent time="21.3s" title="Trainee acknowledgement" type="user" />
              <TimelineEvent time="26.8s" title="Trainee decision" type="user" highlight />
            </div>
          </div>

          {/* PERFORMANCE & COUNTERFACTUAL */}
          <div className="col-span-7 space-y-8">
            
            {/* PERFORMANCE */}
            <div className="glass-panel p-6">
              <h2 className="text-sm font-semibold tracking-wider text-gray-400 border-b border-gray-800 pb-3 mb-4">PERFORMANCE</h2>
              <div className="grid grid-cols-2 gap-4">
                <MetricCard label="Detection" score="85%" />
                <MetricCard label="Tracking" score="92%" />
                <MetricCard label="Decision Latency" score="5.5s" />
                <MetricCard label="Uncertainty Mgt" score="78%" />
              </div>
            </div>

            {/* COUNTERFACTUAL REPLAY */}
            <div className="glass-panel p-6">
              <h2 className="text-sm font-semibold tracking-wider text-gray-400 border-b border-gray-800 pb-3 mb-6">COUNTERFACTUAL REPLAY</h2>
              
              <div className="flex flex-col gap-6">
                {/* Original Decision */}
                <div className="p-4 border border-gray-700 bg-gray-900/30 rounded-lg relative">
                  <div className="absolute -top-3 left-4 bg-background px-2 text-xs font-mono text-gray-400">Original Decision (T+26.8s)</div>
                  <div className="text-sm text-gray-200 mt-2 font-mono">Decision: Engaged Track 01</div>
                  <div className="mt-3 text-xs text-red-400 bg-red-900/20 p-2 rounded">
                    Outcome A: False Positive engagement due to thermal crossover phenomenon.
                  </div>
                </div>

                {/* Branching UI Element */}
                <div className="flex justify-center -my-3 z-10">
                  <div className="w-px h-8 bg-gray-600"></div>
                </div>

                {/* Alternative Decision */}
                <div className="p-4 border border-accent/50 bg-accent/5 rounded-lg relative">
                  <div className="absolute -top-3 left-4 bg-background px-2 text-xs font-mono text-accent">Alternative Decision (Simulated)</div>
                  <div className="text-sm text-gray-200 mt-2 font-mono">Decision: Wait for Radar verification (+3.2s)</div>
                  <div className="mt-3 text-xs text-green-400 bg-green-900/20 p-2 rounded">
                    Outcome B: Radar sparsity resolves track as clutter. False engagement avoided.
                  </div>
                  <button className="mt-4 w-full py-2 bg-accent/20 text-accent text-xs font-bold rounded hover:bg-accent/30 transition">
                    PLAY COUNTERFACTUAL BRANCH
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineEvent({ time, title, type, highlight = false }: { time: string, title: string, type: 'info' | 'warning' | 'success' | 'user', highlight?: boolean }) {
  const colorMap = {
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
    success: 'bg-green-500',
    user: 'bg-purple-500'
  };
  
  return (
    <div className={`relative ${highlight ? 'bg-gray-800/50 p-2 rounded -ml-2 border border-gray-700' : ''}`}>
      <div className={`absolute -left-[21px] top-1.5 w-2 h-2 rounded-full ${colorMap[type]}`}></div>
      <div className="flex gap-4">
        <span className="text-xs font-mono text-gray-500 w-12">{time}</span>
        <span className={`text-sm ${highlight ? 'text-white font-bold' : 'text-gray-300'}`}>{title}</span>
      </div>
    </div>
  );
}

function MetricCard({ label, score }: { label: string, score: string }) {
  return (
    <div className="p-3 bg-gray-900/50 border border-gray-800 rounded flex justify-between items-center">
      <span className="text-xs font-mono text-gray-400 uppercase">{label}</span>
      <span className="text-lg font-mono text-white">{score}</span>
    </div>
  );
}
