export default function InstructorUI() {
  return (
    <div className="h-full w-full p-6 bg-[#050505] overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-white tracking-tight">Instructor Console</h1>
          <p className="text-sm text-gray-400 mt-1">Design training scenarios and configure simulation parameters.</p>
        </header>

        <div className="grid grid-cols-12 gap-6">
          
          {/* SCENARIO BUILDER */}
          <div className="col-span-8 glass-panel p-6 space-y-8">
            <h2 className="text-lg font-semibold tracking-wide text-gray-300 border-b border-gray-800 pb-3">SCENARIO BUILDER</h2>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              <ControlSelect label="Environment" options={['Urban Center', 'Industrial Complex', 'Rural Outpost', 'Open Desert']} />
              <ControlSelect label="Weather" options={['Clear', 'Haze', 'Heavy Fog', 'Rain']} />
              <ControlSelect label="Time of Day" options={['Daylight', 'Dusk', 'Night']} />
              <ControlSelect label="Object Density" options={['Low (Single Target)', 'Medium (3-5 Targets)', 'High (Swarm)']} />
              <ControlSelect label="Behaviour Profile" options={['Linear Waypoints', 'Evasive Maneuvers', 'Static Hover']} />
              <ControlSelect label="Difficulty" options={['Level 1 (Beginner)', 'Level 3 (Advanced)', 'Level 5 (Extreme OOD)']} />
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-800">
              <h3 className="text-sm font-mono text-gray-400">Sensor Conditions</h3>
              <div className="grid grid-cols-3 gap-4">
                <SensorConditionToggle label="RGB" status="Healthy" />
                <SensorConditionToggle label="Thermal" status="Degraded" />
                <SensorConditionToggle label="Radar" status="Sparse" />
              </div>
            </div>

            <div className="pt-6">
              <button className="w-full btn btn-primary py-4 text-lg font-bold tracking-widest shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                START TRAINING SCENARIO
              </button>
            </div>
          </div>

          {/* SCENARIO PREVIEW */}
          <div className="col-span-4 flex flex-col gap-6">
            <div className="glass-panel p-5 flex-1 flex flex-col">
              <h2 className="text-sm font-semibold tracking-wider text-gray-400 border-b border-gray-800 pb-2 mb-4">SCENARIO PREVIEW</h2>
              <div className="flex-1 bg-gray-900/50 border border-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                <span className="text-gray-500 font-mono text-xs z-10 text-center px-4">
                  [ 3D Scene Preview ]<br/><br/>
                  Awaiting Isaac Sim Connection...
                </span>
              </div>
            </div>

            <div className="glass-panel p-5">
              <h2 className="text-sm font-semibold tracking-wider text-gray-400 border-b border-gray-800 pb-2 mb-4">SCENARIO SCRIPT</h2>
              <div className="text-xs font-mono text-gray-400 space-y-2 bg-black/50 p-3 rounded border border-gray-800 h-40 overflow-y-auto">
                <div>&gt; T+00:00 - Init Environment</div>
                <div>&gt; T+00:10 - Spawn UAV_01 (Linear)</div>
                <div>&gt; T+00:45 - Weather transition: Haze</div>
                <div>&gt; T+01:20 - Sensor Degrade: RGB Contrast</div>
                <div className="text-gray-600">...</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function ControlSelect({ label, options }: { label: string, options: string[] }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-mono text-gray-400 uppercase">{label}</label>
      <select className="w-full bg-gray-900/80 border border-gray-700 text-sm text-gray-200 rounded-md p-2.5 focus:ring-1 focus:ring-accent outline-none">
        {options.map(opt => <option key={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function SensorConditionToggle({ label, status }: { label: string, status: string }) {
  return (
    <div className="p-3 bg-gray-900/50 border border-gray-800 rounded-lg flex flex-col gap-1 cursor-pointer hover:border-gray-600 transition-colors">
      <span className="text-xs font-mono text-gray-400">{label}</span>
      <span className={`text-sm font-bold ${status === 'Healthy' ? 'text-green-500' : 'text-yellow-500'}`}>{status}</span>
    </div>
  );
}
