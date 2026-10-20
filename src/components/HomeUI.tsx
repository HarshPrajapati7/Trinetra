type ViewState = 'home' | 'trainee' | 'instructor' | 'aar' | 'monitoring';

export default function HomeUI({ setView }: { setView: (v: ViewState) => void }) {
  return (
    <div className="h-full w-full overflow-y-auto bg-gis-bg flex flex-col justify-between">
      <div>
        {/* Hero Section with Drone Image */}
        <div className="w-full relative h-[500px] border-b border-gis-border flex items-center justify-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img src="/pixels.jpg" alt="Drone on camouflage" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-gis-bg to-transparent"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-[1280px] mx-auto px-12 text-center flex flex-col items-center">
            <h1 className="text-[44px] font-medium text-gis-accent leading-[1.2] max-w-2xl mb-6 tracking-tight">
              AI-Enabled Drone & Counter-Drone Threat Simulation Trainer
            </h1>
            <p className="text-[18px] text-gis-muted max-w-xl mx-auto leading-relaxed mb-10">
              A multimodal training digital twin for robust perception under uncertainty. 
              Built for the Ministry of Defence SIH26247 mandate.
            </p>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setView('trainee')}
                className="bg-gis-active text-white text-[16px] font-medium rounded-full px-8 py-4 hover:bg-opacity-90 transition-all hover:scale-[1.02]"
              >
                Start Trainee Simulation
              </button>
              <button 
                onClick={() => setView('instructor')}
                className="bg-gis-panel text-gis-text text-[16px] font-medium rounded-full px-8 py-4 border border-gis-border hover:bg-gis-panel-light transition-all hover:scale-[1.02]"
              >
                Instructor Console
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-12 py-[96px]">
          {/* Signature GIS Panel */}
          <div className="bg-gis-panel border border-gis-border shadow-lg rounded-[24px] p-[64px] text-gis-accent flex flex-col gap-6 w-full">
            <h2 className="text-[36px] font-medium max-w-xl leading-[1.2]">
              Real-time inference. No simulated AI.
            </h2>
            <p className="text-[18px] max-w-2xl text-gis-text leading-relaxed">
              The platform runs trained YOLO11 models on RGB and infrared inputs, with recorded GPS detections and evaluation metrics from the model run.
            </p>
            <div className="mt-4 flex">
               <button 
                 onClick={() => setView('aar')}
                 className="bg-[#1a1a1a] text-gis-accent text-[16px] font-medium rounded-full px-8 py-4 border border-[#333] hover:bg-[#222] transition-colors"
               >
                 View After-Action Review
               </button>
            </div>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-12 pb-[96px]">
          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard 
              title="Real-time Perception" 
              desc="Live webcam detection with the trained RGB YOLO11 model."
            />
            <InfoCard 
              title="Multimodal Fusion" 
              desc="Select RGB or infrared YOLO11 inference for uploaded images; both models report independent predictions."
            />
            <InfoCard 
              title="Training Analytics" 
              desc="Review recorded model metrics, GPS-tagged detections, evaluation plots, and the production video."
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-10 border-t border-gis-border text-center">
        <p className="text-[16px] font-medium tracking-widest uppercase text-gis-muted">
          Made by Team Star Busters
        </p>
      </footer>

    </div>
  );
}

function InfoCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="bg-gis-panel border border-gis-border p-8 rounded-[24px] shadow-sm hover:border-gis-active transition-colors">
      <h3 className="text-gis-accent text-[22px] font-medium mb-3">{title}</h3>
      <p className="text-[15px] text-gis-muted leading-relaxed">{desc}</p>
    </div>
  );
}
