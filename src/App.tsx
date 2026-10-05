import { useState } from 'react';
import TraineeUI from './components/TraineeUI';
import InstructorUI from './components/InstructorUI';
import AARUI from './components/AARUI';
import HomeUI from './components/HomeUI';

type ViewState = 'home' | 'trainee' | 'instructor' | 'monitoring' | 'aar';

function App() {
  const [view, setView] = useState<ViewState>('home');

  return (
    <div className="h-screen w-screen flex flex-col font-sans bg-background text-gray-200">
      {/* Top Navigation Bar */}
      <nav className="h-14 border-b border-gray-800 bg-panel flex items-center justify-between px-6 shrink-0 z-50 shadow-md">
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setView('home')}
        >
          <div className="w-8 h-8 rounded bg-accent flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            SIH
          </div>
          <h1 className="text-lg font-semibold tracking-tight text-gray-100">Project 26247</h1>
          <span className="ml-3 px-2.5 py-0.5 text-[10px] font-mono bg-blue-900/40 text-blue-400 border border-blue-800/50 rounded-full tracking-widest uppercase">
            Trainer Platform
          </span>
        </div>
        
        <div className="flex gap-2">
          <NavButton active={view === 'trainee'} onClick={() => setView('trainee')}>Trainee Simulation</NavButton>
          <NavButton active={view === 'instructor'} onClick={() => setView('instructor')}>Instructor Builder</NavButton>
          <NavButton active={view === 'aar'} onClick={() => setView('aar')}>After-Action Review</NavButton>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
        {view === 'home' && <HomeUI />}
        {view === 'trainee' && <TraineeUI />}
        {view === 'instructor' && <InstructorUI />}
        {view === 'monitoring' && <div className="p-8 text-center text-gray-500 font-mono">Live Monitoring View Pending Setup...</div>}
        {view === 'aar' && <AARUI />}
      </main>
    </div>
  );
}

function NavButton({ active, onClick, children }: { active: boolean, onClick: () => void, children: React.ReactNode }) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 
      ${active 
        ? 'bg-accent text-white shadow-[0_0_10px_rgba(59,130,246,0.3)] border border-accent/50' 
        : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 border border-transparent'
      }`}
    >
      {children}
    </button>
  );
}

export default App;
