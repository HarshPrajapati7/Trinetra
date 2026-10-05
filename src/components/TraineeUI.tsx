import { useState, useEffect } from 'react';

export default function TraineeUI() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [frame, setFrame] = useState<string | null>(null);
  const [frameSize, setFrameSize] = useState<[number, number]>([640, 480]);
  const [detections, setDetections] = useState<any[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    const ws = new WebSocket("ws://localhost:8080/ws");
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.frame) setFrame(data.frame);
        if (data.frame_size) setFrameSize(data.frame_size);
        if (data.detections) setDetections(data.detections);
      } catch (e) {
        console.error("Error parsing websocket data", e);
      }
    };
    return () => { clearInterval(timer); ws.close(); };
  }, []);

  return (
    <div className="h-full w-full flex bg-gis-bg overflow-hidden text-[13px]">
      
      {/* Left Sidebar - Layers & Sensors */}
      <div className="w-[280px] bg-gis-panel border-r border-gis-border flex flex-col shrink-0">
        <div className="px-4 py-3 border-b border-gis-border text-gis-muted uppercase tracking-wider text-[11px] font-semibold flex justify-between">
          <span>Layers</span>
          <span>+</span>
        </div>
        <div className="py-2">
          <LayerItem label="RGB CAMERA" active color="#00ff00" />
          <LayerItem label="THERMAL / LWIR" active color="#ff5555" />
          <LayerItem label="RADAR (FMCW)" color="#55aaff" />
          <LayerItem label="TRACK FUSION" active color="#ffffff" selected />
        </div>
        
        <div className="px-4 py-3 border-y border-gis-border text-gis-muted uppercase tracking-wider text-[11px] font-semibold mt-4">
          Sensor Diagnostics
        </div>
        <div className="p-4 space-y-4">
           <DiagnosticRow label="RT-DETR Model" value="LOADED" status="good" />
           <DiagnosticRow label="Frame Latency" value="45ms" status="good" />
           <DiagnosticRow label="Thermal Stream" value="OFFLINE" status="bad" />
        </div>
      </div>

      {/* Main Map/Video View */}
      <div className="flex-1 bg-[#1a1a1a] relative flex flex-col">
        {/* Top toolbar inside map area */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
           <div className="bg-gis-panel/90 backdrop-blur border border-gis-border px-3 py-1.5 rounded-2xl text-gis-accent text-[12px]">
             3D / 2D SIMULATION
           </div>
        </div>
        
        {/* Live Video Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          {frame ? (
             <img src={frame} alt="Live" className="w-full h-full object-contain" />
          ) : (
             <div className="text-gis-muted font-medium text-[14px]">Awaiting Video Stream...</div>
          )}
        </div>
        
        {/* Real Detections Overlay */}
        {detections.map((det, i) => {
          const [x, y, w, h] = det.bbox;
          const [fw, fh] = frameSize;
          return (
            <div key={i} className="absolute z-10" style={{
              left: `${(x / fw) * 100}%`, top: `${(y / fh) * 100}%`, width: `${(w / fw) * 100}%`, height: `${(h / fh) * 100}%`
            }}>
              <div className="w-full h-full border-[1.5px] border-[#00ff00] relative">
                <div className="absolute -top-5 left-[-1.5px] bg-[#00ff00] text-black font-medium text-[11px] px-1 py-0.5 whitespace-nowrap">
                  {det.id} {det.class} {(det.confidence * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Scale indicator bottom right */}
        <div className="absolute bottom-4 right-4 text-gis-accent text-[11px] font-mono bg-gis-bg/80 px-2 py-1 rounded-2xl">
           SCALE: 1:500 | {currentTime}
        </div>
      </div>

      {/* Right Sidebar - Track Intel & Actions */}
      <div className="w-[320px] bg-gis-panel border-l border-gis-border flex flex-col shrink-0">
        <div className="px-4 py-3 border-b border-gis-border text-gis-accent flex justify-between items-center">
          <span className="font-medium text-[14px]">Track Inspector</span>
          <span className="text-gis-muted cursor-pointer">✕</span>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto">
          {detections.length > 0 ? (
            <div className="space-y-4">
              <div className="mb-6">
                <div className="text-gis-muted text-[11px] uppercase mb-1">Active Track</div>
                <div className="text-[20px] font-medium text-gis-accent">{detections[0].id}</div>
              </div>
              <PropRow label="Class" value={detections[0].class.toUpperCase()} />
              <PropRow label="Confidence" value={`${(detections[0].confidence * 100).toFixed(1)}%`} highlight />
              <PropRow label="Size Band" value={detections[0].size_band} />
              
              <div className="mt-8 pt-4 border-t border-gis-border space-y-2">
                 <button className="w-full py-2 bg-gis-active text-white rounded-2xl hover:bg-opacity-90">Engage Track</button>
                 <button className="w-full py-2 bg-gis-bg border border-gis-border text-gis-text rounded-2xl hover:bg-[#333]">Mark as Friendly</button>
              </div>
            </div>
          ) : (
            <div className="text-gis-muted text-center mt-10">No track selected. Click on map.</div>
          )}
        </div>
      </div>
      
    </div>
  );
}

function LayerItem({ label, active = false, color, selected = false }: { label: string, active?: boolean, color: string, selected?: boolean }) {
  return (
    <div className={`px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-gis-panel-light ${selected ? 'bg-gis-active/20 border-l-[2px] border-gis-active' : 'border-l-[2px] border-transparent'}`}>
      <div className="w-3 h-3 rounded-sm border border-[#666] flex items-center justify-center shrink-0">
        {active && <div className="w-1.5 h-1.5 bg-gis-accent"></div>}
      </div>
      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color }}></div>
      <span className={`truncate ${selected ? 'text-gis-accent font-medium' : 'text-gis-text'}`}>{label}</span>
    </div>
  );
}

function DiagnosticRow({ label, value, status }: { label: string, value: string, status: 'good'|'bad' }) {
  return (
    <div className="flex justify-between items-center text-[12px]">
      <span className="text-gis-muted">{label}</span>
      <span className={status === 'good' ? 'text-[#00ff66]' : 'text-[#ff4444]'}>{value}</span>
    </div>
  );
}

function PropRow({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-1 border-b border-[#333]">
      <span className="text-gis-muted">{label}</span>
      <span className={highlight ? 'text-gis-active font-medium' : 'text-gis-text'}>{value}</span>
    </div>
  );
}
