export default function HomeUI({ setView }: { setView: (v: string) => void }) {
  return (
    <div className="h-full w-full overflow-y-auto bg-gis-bg flex items-center justify-center">
      <div className="max-w-[800px] mx-auto p-8 flex flex-col items-center text-center">
        
        <div className="w-[80px] h-[80px] mb-8 relative">
          <div className="absolute inset-0 border-[4px] border-gis-active rounded-full opacity-50"></div>
          <div className="absolute inset-4 border-[2px] border-gis-accent rounded-full border-t-transparent animate-spin"></div>
        </div>

        <h1 className="text-[32px] font-medium text-gis-accent leading-tight mb-4 tracking-tight">
          Trinetra GIS Command Center
        </h1>
        <p className="text-[15px] text-gis-muted max-w-xl mx-auto leading-relaxed mb-10">
          AI-Enabled Drone & Counter-Drone Threat Simulation Trainer. 
          Multimodal digital twin for robust perception under uncertainty.
        </p>
        
        <div className="flex gap-4">
          <button 
            onClick={() => setView('trainee')}
            className="bg-gis-active text-white text-[13px] font-medium rounded px-6 py-2.5 hover:bg-opacity-90 transition-colors"
          >
            Launch Trainee Dashboard
          </button>
          <button 
            onClick={() => setView('instructor')}
            className="bg-gis-panel text-gis-text text-[13px] font-medium rounded px-6 py-2.5 border border-gis-border hover:bg-gis-panel-light transition-colors"
          >
            Instructor Setup
          </button>
        </div>

      </div>
    </div>
  );
}
