export default function AARUI() {
  return (
    <div className="h-full w-full p-[48px] bg-[#ffffff] overflow-y-auto">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <header className="border-b border-[#dddddd] pb-8">
          <h1 className="text-[32px] font-normal text-[#181d26] tracking-tight">After-Action Review</h1>
          <p className="text-[16px] text-[#41454d] mt-2">Scenario: Night / Haze / Multiple UAVs (Completed)</p>
        </header>

        <div className="grid grid-cols-12 gap-12">
          
          {/* EVENT TIMELINE */}
          <div className="col-span-5 flex flex-col">
            <h2 className="text-[24px] font-normal text-[#181d26] mb-6">Time / Event</h2>
            
            <div className="space-y-8 border-l border-[#dddddd] ml-2 pl-6 py-2 relative">
              <TimelineEvent time="12.4s" title="First observation" type="info" />
              <TimelineEvent time="14.7s" title="RGB reliability drops" type="warning" />
              <TimelineEvent time="16.2s" title="Thermal evidence appears" type="info" />
              <TimelineEvent time="18.1s" title="Fused track strengthened" type="success" />
              <TimelineEvent time="21.3s" title="Trainee acknowledgement" type="user" />
              <TimelineEvent time="26.8s" title="Trainee decision" type="user" highlight />
            </div>
          </div>

          {/* PERFORMANCE & COUNTERFACTUAL */}
          <div className="col-span-7 space-y-12">
            
            {/* PERFORMANCE */}
            <div>
              <h2 className="text-[24px] font-normal text-[#181d26] mb-6">Performance</h2>
              <div className="grid grid-cols-2 gap-4">
                <MetricCard label="Detection" score="85%" />
                <MetricCard label="Tracking" score="92%" />
                <MetricCard label="Decision Latency" score="5.5s" />
                <MetricCard label="Uncertainty Mgt" score="78%" />
              </div>
            </div>

            {/* COUNTERFACTUAL REPLAY */}
            <div className="bg-[#f8fafc] border border-[#dddddd] rounded-[12px] p-[32px]">
              <h2 className="text-[24px] font-normal text-[#181d26] mb-8">Counterfactual Replay</h2>
              
              <div className="flex flex-col gap-6">
                {/* Original Decision */}
                <div className="p-6 bg-[#ffffff] border border-[#dddddd] rounded-[10px] relative">
                  <div className="text-[12px] font-medium text-[#41454d] uppercase tracking-wider mb-2">Original Decision (T+26.8s)</div>
                  <div className="text-[16px] text-[#181d26] mb-4">Engaged Track 01</div>
                  <div className="text-[14px] text-[#ffffff] bg-[#aa2d00] p-3 rounded-[6px]">
                    Outcome A: False Positive engagement due to thermal crossover phenomenon.
                  </div>
                </div>

                {/* Branching UI Element */}
                <div className="flex justify-center -my-3 z-10">
                  <div className="w-px h-8 bg-[#9297a0]"></div>
                </div>

                {/* Alternative Decision */}
                <div className="p-6 bg-[#ffffff] border border-[#458fff] rounded-[10px] relative shadow-[0_4px_12px_rgba(37,79,173,0.08)]">
                  <div className="text-[12px] font-medium text-[#1b61c9] uppercase tracking-wider mb-2">Alternative Decision (Simulated)</div>
                  <div className="text-[16px] text-[#181d26] mb-4">Wait for Radar verification (+3.2s)</div>
                  <div className="text-[14px] text-[#006400] bg-[#e2f3e4] border border-[#39bf45] p-3 rounded-[6px]">
                    Outcome B: Radar sparsity resolves track as clutter. False engagement avoided.
                  </div>
                  <button className="mt-6 w-full py-3 bg-[#ffffff] border border-[#dddddd] text-[#181d26] text-[14px] font-medium rounded-[8px] hover:bg-[#f8fafc] transition-colors">
                    Play Counterfactual Branch
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
    info: 'bg-[#1b61c9]',
    warning: 'bg-[#d9a441]',
    success: 'bg-[#006400]',
    user: 'bg-[#181d26]'
  };
  
  return (
    <div className={`relative ${highlight ? 'bg-[#f8fafc] p-4 rounded-[8px] -ml-4 border border-[#dddddd]' : ''}`}>
      <div className={`absolute -left-[29px] top-2 w-3 h-3 rounded-full border-2 border-[#ffffff] ${colorMap[type]}`}></div>
      <div className="flex gap-6 items-start">
        <span className="text-[14px] font-medium text-[#41454d] w-12 pt-0.5">{time}</span>
        <span className={`text-[16px] ${highlight ? 'text-[#181d26] font-medium' : 'text-[#333840]'}`}>{title}</span>
      </div>
    </div>
  );
}

function MetricCard({ label, score }: { label: string, score: string }) {
  return (
    <div className="p-6 bg-[#ffffff] border border-[#dddddd] rounded-[10px] flex flex-col justify-between items-start gap-4">
      <span className="text-[14px] font-medium text-[#41454d]">{label}</span>
      <span className="text-[32px] font-normal text-[#181d26]">{score}</span>
    </div>
  );
}
