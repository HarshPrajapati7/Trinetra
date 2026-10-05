import { useState, useEffect } from 'react';

export default function TraineeUI() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [frame, setFrame] = useState<string | null>(null);
  const [frameSize, setFrameSize] = useState<[number, number]>([640, 480]);
  const [detections, setDetections] = useState<any[]>([]);
  const [sensorStatus, setSensorStatus] = useState<any>(null);
  const [inferenceTime, setInferenceTime] = useState<number>(0);
  const [modelStatus, setModelStatus] = useState<string>('CONNECTING...');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    
    // Connect to Real Python AI Backend
    const ws = new WebSocket("ws://localhost:8080/ws");
    
    ws.onopen = () => setModelStatus('CONNECTED');
    ws.onclose = () => setModelStatus('DISCONNECTED');
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.frame) setFrame(data.frame);
        if (data.frame_size) setFrameSize(data.frame_size);
        if (data.detections) setDetections(data.detections);
        if (data.inference_ms !== undefined) setInferenceTime(data.inference_ms);
        if (data.sensor_status) setSensorStatus(data.sensor_status);
        if (data.model_status) setModelStatus(data.model_status);
      } catch (e) {
        console.error("Error parsing websocket data", e);
      }
    };
    
    return () => {
      clearInterval(timer);
      ws.close();
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-col p-4 gap-4 bg-[#050505]">
      
      {/* Top Half: Situation View & Track Intel */}
      <div className="flex h-3/5 gap-4">
        {/* Situation View (3D/2D) */}
        <div className="w-3/4 glass-panel relative overflow-hidden group border border-gray-800">
          <div className="absolute top-4 left-4 z-20 flex gap-2">
            <div className="px-3 py-1 bg-black/60 backdrop-blur border border-gray-700 rounded-md text-xs font-mono text-gray-300">
              3D / 2D SIMULATION
            </div>
            <div className="px-3 py-1 bg-blue-900/40 backdrop-blur border border-blue-800/50 rounded-md text-xs font-mono text-blue-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              LIVE WEBSOCKET
            </div>
          </div>
          
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            <div className="px-3 py-1 bg-black/60 backdrop-blur border border-gray-700 rounded-md text-xs font-mono text-gray-300">
              {(modelStatus === 'LOADED' || modelStatus === 'FALLBACK_ACTIVE') ? `INFERENCE: ${inferenceTime.toFixed(1)}ms` : `MODEL: ${modelStatus}`}
            </div>
          </div>
          
          {/* Live Video Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1128] to-[#050505] flex items-center justify-center">
            {frame ? (
               <img src={frame} alt="Live Situation" className="w-full h-full object-contain opacity-90" />
            ) : (
               <div className="text-gray-500 font-mono text-sm">Awaiting Video Stream...</div>
            )}
          </div>
          
          <div className="scanline"></div>
          
          {/* Real Detections Overlay */}
          {detections.map((det, i) => {
            const [x, y, w, h] = det.bbox;
            const [fw, fh] = frameSize;
            return (
              <div key={i} className="absolute z-10" style={{
                left: `${(x / fw) * 100}%`,
                top: `${(y / fh) * 100}%`,
                width: `${(w / fw) * 100}%`,
                height: `${(h / fh) * 100}%`,
              }}>
                <div className="w-full h-full border-2 border-accent rounded-sm opacity-90 shadow-[0_0_10px_rgba(59,130,246,0.5)] relative">
                  <div className="absolute -top-6 left-0 bg-accent/20 border border-accent/50 text-accent font-mono text-xs px-1 whitespace-nowrap backdrop-blur-sm">
                    {det.id} [{det.class}] {(det.confidence * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Track Intelligence */}
        <div className="w-1/4 glass-panel p-5 flex flex-col">
          <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
            <h2 className="text-sm font-semibold tracking-wider text-gray-400">TRACK INTELLIGENCE</h2>
            <span className="text-xs font-mono text-gray-500">{currentTime}</span>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-4">
            {detections.length > 0 ? (
              <>
                <TrackDetail label="Track ID" value={detections[0].id} />
                <TrackDetail label="Class" value={detections[0].class.toUpperCase()} />
                <TrackDetail label="Confidence" value={`${(detections[0].confidence * 100).toFixed(1)}%`} highlight />
                <TrackDetail label="Size Profile" value={detections[0].size_band} />
                
                <div className="pt-2">
                  <span className="text-xs font-mono text-gray-500 block mb-2">SENSOR SUPPORT</span>
                  <div className="flex flex-wrap gap-2">
                    {detections[0].sensors.map((s: string) => (
                      <span key={s} className="px-2 py-1 bg-blue-900/30 text-blue-400 border border-blue-800/50 rounded text-xs font-mono">{s}</span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-sm font-mono text-gray-500 pt-8 text-center">NO ACTIVE TRACKS</div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Half: Sensors, Alerts, Actions */}
      <div className="h-2/5 w-full flex gap-4">
        
        {/* Sensor Health */}
        <div className="w-1/3 glass-panel p-4 flex flex-col gap-3">
          <h2 className="text-sm font-semibold tracking-wider text-gray-400 border-b border-gray-800 pb-2">SENSOR HEALTH</h2>
          <SensorStatusRow 
            label="RGB CAMERA" 
            status={sensorStatus?.rgb?.status || "UNKNOWN"} 
            info={sensorStatus?.rgb?.model_loaded ? "Model Loaded" : "Awaiting Model"}
            active={sensorStatus?.rgb?.status === 'ACTIVE'}
          />
          <SensorStatusRow 
            label="THERMAL / LWIR" 
            status="PENDING" 
            info="Model not trained yet"
            active={false}
          />
          <SensorStatusRow 
            label="RADAR" 
            status="PENDING" 
            info="Awaiting simulation data"
            active={false}
          />
        </div>

        {/* Timeline & Actions */}
        <div className="w-2/3 flex gap-4">
          <div className="w-1/2 glass-panel p-4">
             <h2 className="text-sm font-semibold tracking-wider text-gray-400 border-b border-gray-800 pb-2">TIMELINE & ALERTS</h2>
             <div className="mt-4 space-y-2 text-sm font-mono text-gray-400">
               <div className="flex gap-4"><span className="text-gray-500">12.4s</span> <span className="text-gray-200">First observation (RGB)</span></div>
               <div className="flex gap-4"><span className="text-gray-500">14.7s</span> <span className="text-yellow-500">Confidence fluctuating</span></div>
               {detections.length > 0 && (
                 <div className="flex gap-4"><span className="text-gray-500">Now</span> <span className="text-blue-400">Track {detections[0].id} Active</span></div>
               )}
             </div>
          </div>
          <div className="w-1/2 glass-panel p-4">
             <h2 className="text-sm font-semibold tracking-wider text-gray-400 border-b border-gray-800 pb-2">ACTIONS</h2>
             <div className="mt-4 grid grid-cols-1 gap-3">
               <button className="btn btn-secondary border border-gray-600 text-left px-4 font-mono text-xs">ACKNOWLEDGE CONTACT</button>
               <button className="btn btn-secondary border border-gray-600 text-left px-4 font-mono text-xs">REQUEST SENSOR FUSION DATA</button>
               <button className="btn btn-primary text-left px-4 font-mono text-xs">MARK AS HOSTILE UAV</button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function SensorStatusRow({ label, status, info, active }: { label: string, status: string, info: string, active: boolean }) {
  return (
    <div className="flex items-center justify-between p-2 bg-gray-900/30 border border-gray-800 rounded">
      <div>
        <div className="text-xs font-mono font-bold text-gray-300">{label}</div>
        <div className="text-[10px] font-mono text-gray-500">{info}</div>
      </div>
      <div className={`px-2 py-1 border rounded text-[10px] font-mono ${active ? 'bg-green-900/30 border-green-800/50 text-success' : 'bg-gray-800/50 border-gray-700 text-gray-500'}`}>
        {status}
      </div>
    </div>
  );
}

function TrackDetail({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] font-mono text-gray-500 uppercase">{label}</span>
      <span className={`text-sm font-mono ${highlight ? 'text-accent' : 'text-gray-200'}`}>{value}</span>
    </div>
  );
}
