export default function HomeUI({ setView }: { setView: (v: string) => void }) {
  return (
    <div className="h-full w-full overflow-y-auto bg-gis-bg">
      
      {/* Hero Section with Drone Image */}
      <div className="w-full relative h-[500px] border-b border-gis-border flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src="/pixels.jpg" alt="Drone on camouflage" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-gis-bg to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-12 text-center flex flex-col items-center">
          <h1 className="text-[40px] font-medium text-gis-accent leading-[1.2] max-w-2xl mb-6 tracking-tight">
            AI-Enabled Drone & Counter-Drone Threat Simulation Trainer
          </h1>
          <p className="text-[18px] text-gis-muted max-w-xl mx-auto leading-relaxed mb-10">
            A multimodal training digital twin for robust perception under uncertainty. 
            Built for the Ministry of Defence SIH26247 mandate.
          </p>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setView('trainee')}
              className="bg-gis-active text-white text-[16px] font-medium rounded px-6 py-4 hover:bg-opacity-90 transition-colors"
            >
              Start Trainee Simulation
            </button>
            <button 
              onClick={() => setView('instructor')}
              className="bg-gis-panel text-gis-text text-[16px] font-medium rounded px-6 py-4 border border-gis-border hover:bg-gis-panel-light transition-colors"
            >
              Instructor Console
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-12 py-[96px]">
        {/* Signature GIS Panel (restoring the content of the coral card but in GIS theme) */}
        <div className="bg-gis-panel border border-gis-border shadow-lg rounded p-[48px] text-gis-accent flex flex-col gap-6 w-full">
          <h2 className="text-[32px] font-medium max-w-xl leading-[1.2]">
            Real-time inference. No simulated AI.
          </h2>
          <p className="text-[16px] max-w-2xl text-gis-text leading-relaxed">
            The platform executes actual NVIDIA TAO RT-DETR models backed by C-RADIOv3-L, integrating RGB, Thermal, and Radar streams directly into the training scenario.
          </p>
          <div className="mt-4">
             <button 
               onClick={() => setView('aar')}
               className="bg-[#1a1a1a] text-gis-accent text-[16px] font-medium rounded px-6 py-4 border border-[#333] hover:bg-[#222] transition-colors"
             >
               View After-Action Review
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-12 pb-[96px]">
        {/* Restoring the 3 feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard 
            title="Real-time Perception" 
            desc="Live RT-DETR object detection with frozen foundation backbone. Zero mockup detections." 
          />
          <InfoCard 
            title="Multimodal Fusion" 
            desc="Integration framework for RGB, Thermal, and Radar streams into a single reliable track." 
          />
          <InfoCard 
            title="Training Analytics" 
            desc="Causal after-action review and trainee competency modeling via counterfactual replay." 
          />
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="bg-gis-panel border border-gis-border p-8 rounded">
      <h3 className="text-gis-accent text-[20px] font-medium mb-3">{title}</h3>
      <p className="text-[14px] text-gis-muted leading-relaxed">{desc}</p>
    </div>
  );
}
