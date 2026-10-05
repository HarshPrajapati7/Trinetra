export default function AARUI() {
  return (
    <div className="h-full w-full p-8 bg-gis-bg overflow-y-auto text-[13px]">
      <div className="max-w-[1000px] mx-auto space-y-6">
        <header className="mb-8 border-b border-gis-border pb-6">
          <h1 className="text-[24px] font-medium text-gis-accent flex justify-between items-center">
            <span>Analytics & After-Action Review</span>
            <button className="px-4 py-1.5 text-[12px] bg-gis-panel border border-gis-border rounded-2xl text-gis-text hover:bg-gis-panel-light">Export Report</button>
          </h1>
          <p className="text-gis-muted mt-1">Session: TRN-9284 • Scenario: Haze / Multi-UAV</p>
        </header>

        <div className="grid grid-cols-12 gap-8">
          
          <div className="col-span-5 bg-gis-panel border border-gis-border rounded-2xl p-6">
            <h2 className="text-[16px] font-medium text-gis-accent mb-6">Event Timeline</h2>
            <div className="space-y-6 border-l border-[#444] ml-2 pl-4 py-2 relative">
              <Event time="T+12.4s" title="Visual contact (RGB)" type="info" />
              <Event time="T+14.7s" title="RGB confidence drops below 60%" type="warn" />
              <Event time="T+16.2s" title="Thermal track fused" type="info" />
              <Event time="T+21.3s" title="Trainee marked track as hostile" type="user" highlight />
            </div>
          </div>

          <div className="col-span-7 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <MetricBox label="Detection Accuracy" value="94.2%" trend="+2.1%" />
              <MetricBox label="Time to Engage" value="8.9s" trend="-1.2s" />
              <MetricBox label="Sensor Utilization" value="3/3" trend="Optimal" />
              <MetricBox label="False Positives" value="0" trend="-" />
            </div>

            <div className="bg-gis-panel border border-gis-border rounded-2xl p-6">
              <h2 className="text-[16px] font-medium text-gis-accent mb-4">Counterfactual Branch Analysis</h2>
              
              <div className="bg-[#1a1a1a] border border-[#333] p-4 rounded-2xl mb-4">
                <div className="text-gis-muted text-[11px] uppercase mb-1">Trainee Action @ T+21.3s</div>
                <div className="text-gis-accent font-medium mb-2">Engaged track without Radar confirmation</div>
                <div className="text-[#ffaa00]">Result: Minor penalty. Rule of engagement requires multi-sensor verification in Haze conditions.</div>
              </div>

              <div className="bg-[#1a1a1a] border border-gis-active/50 p-4 rounded-2xl shadow-[0_0_15px_rgba(59,90,130,0.1)]">
                <div className="text-gis-active text-[11px] uppercase mb-1">Optimal AI Branch</div>
                <div className="text-gis-accent font-medium mb-2">Wait 2.4s for Radar scan sweep completion</div>
                <div className="text-[#00ff66]">Result: 100% confidence achieved. Zero penalty.</div>
                <button className="mt-4 px-4 py-2 bg-gis-active/20 text-gis-accent border border-gis-active rounded-full text-[12px] hover:bg-gis-active hover:text-white transition-colors w-full">
                  Play Simulation Branch
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function Event({ time, title, type, highlight }: { time: string, title: string, type: string, highlight?: boolean }) {
  const c = type === 'warn' ? 'bg-[#ffaa00]' : type === 'user' ? 'bg-[#ffffff]' : 'bg-gis-active';
  return (
    <div className={`relative ${highlight ? 'bg-[#1a1a1a] p-3 rounded-2xl border border-[#333] -ml-7 pl-7' : ''}`}>
      <div className={`absolute -left-[21px] top-1.5 w-2 h-2 rounded-full ${c}`}></div>
      <div className="flex flex-col">
        <span className="text-gis-muted text-[11px] font-mono">{time}</span>
        <span className={highlight ? 'text-gis-accent font-medium' : 'text-gis-text'}>{title}</span>
      </div>
    </div>
  );
}

function MetricBox({ label, value, trend }: { label: string, value: string, trend: string }) {
  return (
    <div className="bg-gis-panel border border-gis-border p-4 rounded-2xl flex flex-col gap-1">
      <span className="text-gis-muted text-[12px]">{label}</span>
      <div className="flex items-end gap-3 mt-1">
        <span className="text-[24px] text-gis-accent font-medium leading-none">{value}</span>
        <span className="text-gis-active text-[12px] mb-0.5">{trend}</span>
      </div>
    </div>
  );
}
