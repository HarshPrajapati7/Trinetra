export default function HomeUI({ setView }: { setView: (v: string) => void }) {
  return (
    <div className="h-full w-full overflow-y-auto bg-[#ffffff]">
      <div className="max-w-[1280px] mx-auto px-12 py-[96px] flex flex-col items-center text-center">
        <h1 className="text-[40px] font-normal text-[#181d26] leading-[1.2] max-w-2xl mb-6 tracking-tight">
          AI-Enabled Drone & Counter-Drone Threat Simulation Trainer
        </h1>
        <p className="text-[18px] text-[#41454d] max-w-xl mx-auto leading-relaxed mb-10">
          A multimodal training digital twin for robust perception under uncertainty. 
          Built for the Ministry of Defence SIH26247 mandate.
        </p>
        
        <div className="flex gap-4 mb-[96px]">
          <button 
            onClick={() => setView('trainee')}
            className="bg-[#181d26] text-[#ffffff] text-[16px] font-medium rounded-[12px] px-6 py-4 hover:bg-[#0d1218] transition-colors"
          >
            Start Trainee Simulation
          </button>
          <button 
            onClick={() => setView('instructor')}
            className="bg-[#ffffff] text-[#181d26] text-[16px] font-medium rounded-[12px] px-6 py-4 border border-[#dddddd] hover:bg-[#f8fafc] transition-colors"
          >
            Instructor Console
          </button>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-12 pb-[96px]">
        {/* Signature Coral Card */}
        <div className="bg-[#aa2d00] rounded-[12px] p-[48px] text-[#ffffff] flex flex-col gap-6 w-full">
          <h2 className="text-[32px] font-normal max-w-xl leading-[1.2]">
            Real-time inference. No simulated AI.
          </h2>
          <p className="text-[16px] max-w-2xl font-normal opacity-90 leading-relaxed">
            The platform executes actual NVIDIA TAO RT-DETR models backed by C-RADIOv3-L, integrating RGB, Thermal, and Radar streams directly into the training scenario.
          </p>
          <div className="mt-4">
             <button 
               onClick={() => setView('aar')}
               className="bg-[#ffffff] text-[#181d26] text-[16px] font-medium rounded-[12px] px-6 py-4 hover:opacity-90 transition-opacity"
             >
               View After-Action Review
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-12 pb-[96px]">
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
    <div className="bg-[#f8fafc] p-8 rounded-[12px]">
      <h3 className="text-[#181d26] text-[20px] font-normal mb-3">{title}</h3>
      <p className="text-[14px] text-[#333840] leading-relaxed">{desc}</p>
    </div>
  );
}
