export default function InstructorUI() {
  return (
    <div className="h-full w-full p-8 bg-gis-bg overflow-y-auto text-[13px]">
      <div className="max-w-[1000px] mx-auto space-y-6">
        <header className="mb-8">
          <h1 className="text-[24px] font-medium text-gis-accent">Instructor Setup</h1>
          <p className="text-gis-muted mt-1">Configure environment and parameters for the digital twin simulation.</p>
        </header>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 bg-gis-panel border border-gis-border rounded p-6 space-y-6">
            <h2 className="text-[16px] font-medium text-gis-accent border-b border-gis-border pb-3">Scenario Builder</h2>
            
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <ControlSelect label="Environment Model" options={['Urban Center (High Clutter)', 'Industrial Complex', 'Open Desert']} />
              <ControlSelect label="Weather Engine" options={['Clear', 'Haze (Visual Degradation)', 'Heavy Fog (Thermal/Radar Only)']} />
              <ControlSelect label="Time of Day" options={['Daylight', 'Dusk', 'Night (IR Focus)']} />
              <ControlSelect label="Target Density" options={['Single Target', 'Small Swarm (3-5)', 'Large Swarm (10+)']} />
            </div>

            <div className="pt-6 border-t border-gis-border">
              <h3 className="text-gis-accent mb-4">Sensor Node Status (Overrides)</h3>
              <div className="grid grid-cols-3 gap-4">
                <SensorCard label="RGB Camera" status="Nominal" />
                <SensorCard label="Thermal/LWIR" status="Degraded Noise" />
                <SensorCard label="Radar FMCW" status="Spoofed Returns" />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
               <button className="px-4 py-2 bg-gis-bg border border-gis-border text-gis-text rounded hover:bg-gis-panel-light">Reset Defaults</button>
               <button className="px-6 py-2 bg-gis-active text-white rounded font-medium hover:bg-opacity-90">Deploy Scenario</button>
            </div>
          </div>

          <div className="col-span-4 space-y-6">
            <div className="bg-gis-panel border border-gis-border rounded p-6 h-48 flex flex-col">
              <h2 className="text-gis-accent mb-3">Live Map Preview</h2>
              <div className="flex-1 bg-[#1a1a1a] rounded border border-[#333] flex items-center justify-center">
                <span className="text-gis-muted">Map not loaded</span>
              </div>
            </div>
            
            <div className="bg-gis-panel border border-gis-border rounded p-6">
              <h2 className="text-gis-accent mb-3">Script Execution Log</h2>
              <div className="text-gis-muted font-mono space-y-1 h-32 overflow-y-auto bg-[#1a1a1a] p-3 rounded text-[11px] border border-[#333]">
                <div>&gt; System Init...</div>
                <div>&gt; Loading terrain_urban_01.usd</div>
                <div>&gt; Weather set to HAZE_LVL2</div>
                <div>&gt; Awaiting deployment command...</div>
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
    <div className="space-y-1.5">
      <label className="text-gis-muted">{label}</label>
      <select className="w-full bg-[#1a1a1a] border border-[#333] text-gis-text rounded p-2 focus:outline-none focus:border-gis-active">
        {options.map(opt => <option key={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function SensorCard({ label, status }: { label: string, status: string }) {
  const isBad = status !== 'Nominal';
  return (
    <div className="p-3 bg-[#1a1a1a] border border-[#333] rounded flex flex-col gap-1 cursor-pointer hover:border-gis-active">
      <span className="text-gis-muted">{label}</span>
      <span className={isBad ? 'text-[#ffaa00]' : 'text-[#00ff66]'}>{status}</span>
    </div>
  );
}
