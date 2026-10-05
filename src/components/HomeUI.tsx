export default function HomeUI() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-[#050505] p-6">
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-accent shadow-[0_0_40px_rgba(59,130,246,0.6)] mb-4">
          <span className="text-3xl font-bold text-white">SIH</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          Project 26247
        </h1>
        <p className="text-lg text-gray-400 max-w-xl mx-auto">
          AI-Enabled Drone & Counter-Drone Threat Simulation Trainer.
          A multimodal training digital twin for robust perception under uncertainty.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-12 text-left">
          <InfoCard 
            title="Real-time Perception" 
            desc="Live RT-DETR object detection with frozen foundation backbone." 
          />
          <InfoCard 
            title="Multimodal Fusion" 
            desc="Integration framework for RGB, Thermal, and Radar streams." 
          />
          <InfoCard 
            title="Training Analytics" 
            desc="Causal after-action review and trainee competency modeling." 
          />
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="glass-panel p-5 border-t-2 border-t-accent hover:-translate-y-1 transition-transform">
      <h3 className="text-white font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}
