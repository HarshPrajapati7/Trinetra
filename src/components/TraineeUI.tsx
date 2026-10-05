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
    <div className="h-full w-full flex flex-col p-6 gap-6 bg-[#ffffff]">
      
      {/* Top Half: Situation View & Track Intel */}
      <div className="flex h-[60%] gap-6">
        {/* Situation View (3D/2D) */}
        <div className="w-3/4 bg-[#181d26] rounded-[12px] relative overflow-hidden group">
          <div className="absolute top-4 left-4 z-20 flex gap-2">
            <div className="px-3 py-1.5 bg-[#ffffff] text-[#181d26] rounded-[6px] text-[12px] font-medium border border-[#dddddd]">
              3D / 2D SIMULATION
            </div>
            <div className="px-3 py-1.5 bg-[#ffffff] text-[#1b61c9] rounded-[6px] text-[12px] font-medium flex items-center gap-2 border border-[#dddddd]">
              <span className="w-2 h-2 rounded-full bg-[#1b61c9]"></span>
              LIVE WEBSOCKET
            </div>
          </div>
          
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            <div className="px-3 py-1.5 bg-[#ffffff] text-[#181d26] rounded-[6px] text-[12px] font-medium border border-[#dddddd]">
              {(modelStatus === 'LOADED' || modelStatus === 'FALLBACK_ACTIVE') ? `INFERENCE: ${inferenceTime.toFixed(1)}ms` : `MODEL: ${modelStatus}`}
            </div>
          </div>
          
          {/* Live Video Background */}
          <div className="absolute inset-0 flex items-center justify-center bg-[#0d1218]">
            {frame ? (
               <img src={frame} alt="Live Situation" className="w-full h-full object-contain" />
            ) : (
               <div className="text-[#ffffff] opacity-50 font-medium text-[14px]">Awaiting Video Stream...</div>
            )}
          </div>
          
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
                <div className="w-full h-full border-2 border-[#fcab79] rounded-[4px] relative shadow-[0_0_8px_rgba(0,0,0,0.5)]">
                  <div className="absolute -top-7 left-[-2px] bg-[#fcab79] text-[#181d26] font-medium text-[12px] px-2 py-0.5 rounded-t-[4px] whitespace-nowrap">
                    {det.id} [{det.class}] {(det.confidence * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Track Intelligence */}
        <div className="w-1/4 bg-[#f8fafc] border border-[#dddddd] rounded-[12px] p-[24px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[18px] font-medium text-[#181d26]">Track Intelligence</h2>
            <span className="text-[14px] text-[#41454d]">{currentTime}</span>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-5">
            {detections.length > 0 ? (
              <>
                <TrackDetail label="TRACK ID" value={detections[0].id} />
                <TrackDetail label="CLASS" value={detections[0].class.toUpperCase()} />
                <TrackDetail label="CONFIDENCE" value={`${(detections[0].confidence * 100).toFixed(1)}%`} highlight />
                <TrackDetail label="SIZE PROFILE" value={detections[0].size_band} />
                
                <div className="pt-2">
                  <span className="text-[12px] font-medium text-[#41454d] uppercase tracking-wider block mb-2">SENSOR SUPPORT</span>
                  <div className="flex flex-wrap gap-2">
                    {detections[0].sensors.map((s: string) => (
                      <span key={s} className="px-2 py-1 bg-[#e0e2e6] text-[#181d26] rounded-[6px] text-[12px] font-medium">{s}</span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-[14px] text-[#41454d] pt-8 text-center">No active tracks.</div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Half: Sensors, Alerts, Actions */}
      <div className="h-[40%] w-full flex gap-6">
        
        {/* Sensor Health */}
        <div className="w-1/3 bg-[#ffffff] border border-[#dddddd] rounded-[12px] p-[24px] flex flex-col gap-4">
          <h2 className="text-[18px] font-medium text-[#181d26] mb-2">Sensor Health</h2>
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
        <div className="w-2/3 flex gap-6">
          <div className="w-1/2 bg-[#ffffff] border border-[#dddddd] rounded-[12px] p-[24px]">
             <h2 className="text-[18px] font-medium text-[#181d26] mb-4">Timeline & Alerts</h2>
             <div className="space-y-3 text-[14px] text-[#333840]">
               <div className="flex gap-4 border-l-2 border-[#dddddd] pl-3"><span className="text-[#41454d] w-10">12.4s</span> <span>First observation (RGB)</span></div>
               <div className="flex gap-4 border-l-2 border-[#d9a441] pl-3"><span className="text-[#41454d] w-10">14.7s</span> <span>Confidence fluctuating</span></div>
               {detections.length > 0 && (
                 <div className="flex gap-4 border-l-2 border-[#1b61c9] pl-3"><span className="text-[#41454d] w-10">Now</span> <span className="font-medium text-[#181d26]">Track {detections[0].id} Active</span></div>
               )}
             </div>
          </div>
          <div className="w-1/2 bg-[#ffffff] border border-[#dddddd] rounded-[12px] p-[24px] flex flex-col">
             <h2 className="text-[18px] font-medium text-[#181d26] mb-4">Actions</h2>
             <div className="grid grid-cols-1 gap-3 mt-auto mb-auto">
               <button className="bg-[#ffffff] border border-[#dddddd] text-[#181d26] hover:bg-[#f8fafc] text-left px-4 py-3 rounded-[12px] text-[14px] font-medium transition-colors">Acknowledge Contact</button>
               <button className="bg-[#ffffff] border border-[#dddddd] text-[#181d26] hover:bg-[#f8fafc] text-left px-4 py-3 rounded-[12px] text-[14px] font-medium transition-colors">Request Fusion Data</button>
               <button className="bg-[#181d26] text-[#ffffff] hover:bg-[#0d1218] text-left px-4 py-3 rounded-[12px] text-[14px] font-medium transition-colors">Mark as Hostile UAV</button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function SensorStatusRow({ label, status, info, active }: { label: string, status: string, info: string, active: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 bg-[#f8fafc] border border-[#dddddd] rounded-[6px]">
      <div>
        <div className="text-[14px] font-medium text-[#181d26]">{label}</div>
        <div className="text-[12px] text-[#41454d]">{info}</div>
      </div>
      <div className={`px-2 py-1 rounded-[4px] text-[12px] font-medium border ${active ? 'bg-[#f0fdf4] text-[#006400] border-[#39bf45]' : 'bg-[#ffffff] text-[#41454d] border-[#dddddd]'}`}>
        {status}
      </div>
    </div>
  );
}

function TrackDetail({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean }) {
  return (
    <div className="flex flex-col">
      <span className="text-[12px] font-medium text-[#41454d] uppercase tracking-wider mb-1">{label}</span>
      <span className={`text-[16px] font-normal ${highlight ? 'text-[#aa2d00]' : 'text-[#181d26]'}`}>{value}</span>
    </div>
  );
}
