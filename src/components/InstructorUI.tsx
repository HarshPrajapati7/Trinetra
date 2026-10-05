export default function InstructorUI() {
  return (
    <div className="h-full w-full p-[48px] bg-[#ffffff] overflow-y-auto">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <header>
          <h1 className="text-[32px] font-normal text-[#181d26] tracking-tight">Instructor Console</h1>
          <p className="text-[16px] text-[#41454d] mt-2">Design training scenarios and configure simulation parameters.</p>
        </header>

        <div className="grid grid-cols-12 gap-8">
          
          {/* SCENARIO BUILDER */}
          <div className="col-span-8 bg-[#ffffff] border border-[#dddddd] rounded-[12px] p-[32px] space-y-8">
            <h2 className="text-[24px] font-normal text-[#181d26] border-b border-[#dddddd] pb-4">Scenario Builder</h2>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              <ControlSelect label="Environment" options={['Urban Center', 'Industrial Complex', 'Rural Outpost', 'Open Desert']} />
              <ControlSelect label="Weather" options={['Clear', 'Haze', 'Heavy Fog', 'Rain']} />
              <ControlSelect label="Time of Day" options={['Daylight', 'Dusk', 'Night']} />
              <ControlSelect label="Object Density" options={['Low (Single Target)', 'Medium (3-5 Targets)', 'High (Swarm)']} />
              <ControlSelect label="Behaviour Profile" options={['Linear Waypoints', 'Evasive Maneuvers', 'Static Hover']} />
              <ControlSelect label="Difficulty" options={['Level 1 (Beginner)', 'Level 3 (Advanced)', 'Level 5 (Extreme OOD)']} />
            </div>

            <div className="space-y-4 pt-6 border-t border-[#dddddd]">
              <h3 className="text-[16px] font-medium text-[#181d26]">Sensor Conditions</h3>
              <div className="grid grid-cols-3 gap-4">
                <SensorConditionToggle label="RGB" status="Healthy" />
                <SensorConditionToggle label="Thermal" status="Degraded" />
                <SensorConditionToggle label="Radar" status="Sparse" />
              </div>
            </div>

            <div className="pt-8">
              <button className="w-full bg-[#181d26] text-[#ffffff] py-4 rounded-[12px] text-[16px] font-medium hover:bg-[#0d1218] transition-colors">
                Start Training Scenario
              </button>
            </div>
          </div>

          {/* SCENARIO PREVIEW */}
          <div className="col-span-4 flex flex-col gap-8">
            <div className="bg-[#f8fafc] border border-[#dddddd] rounded-[12px] p-[24px] flex-1 flex flex-col">
              <h2 className="text-[18px] font-medium text-[#181d26] mb-4">Scenario Preview</h2>
              <div className="flex-1 bg-[#ffffff] border border-[#dddddd] rounded-[6px] flex items-center justify-center">
                <span className="text-[#41454d] text-[14px] text-center px-4">
                  [ 3D Scene Preview ]<br/><br/>
                  Awaiting Isaac Sim Connection
                </span>
              </div>
            </div>

            <div className="bg-[#ffffff] border border-[#dddddd] rounded-[12px] p-[24px]">
              <h2 className="text-[18px] font-medium text-[#181d26] mb-4">Scenario Script</h2>
              <div className="text-[14px] text-[#333840] space-y-2 bg-[#f8fafc] p-4 rounded-[6px] border border-[#dddddd] h-40 overflow-y-auto font-mono">
                <div>&gt; T+00:00 - Init Environment</div>
                <div>&gt; T+00:10 - Spawn UAV_01 (Linear)</div>
                <div>&gt; T+00:45 - Weather transition: Haze</div>
                <div>&gt; T+01:20 - Sensor Degrade: RGB</div>
                <div className="text-[#9297a0]">...</div>
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
      <label className="text-[14px] font-medium text-[#41454d]">{label}</label>
      <select className="w-full bg-[#ffffff] border border-[#dddddd] text-[14px] text-[#181d26] rounded-[6px] p-3 focus:outline-none focus:border-[#458fff] transition-colors">
        {options.map(opt => <option key={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function SensorConditionToggle({ label, status }: { label: string, status: string }) {
  return (
    <div className="p-4 bg-[#ffffff] border border-[#dddddd] rounded-[10px] flex flex-col gap-1 cursor-pointer hover:bg-[#f8fafc] transition-colors">
      <span className="text-[14px] text-[#41454d] font-medium">{label}</span>
      <span className={`text-[16px] font-normal ${status === 'Healthy' ? 'text-[#006400]' : 'text-[#d9a441]'}`}>{status}</span>
    </div>
  );
}
