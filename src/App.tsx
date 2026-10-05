import { useState } from 'react';
import TraineeUI from './components/TraineeUI';
import InstructorUI from './components/InstructorUI';
import AARUI from './components/AARUI';
import HomeUI from './components/HomeUI';

type ViewState = 'home' | 'trainee' | 'instructor' | 'monitoring' | 'aar';

function App() {
  const [view, setView] = useState<ViewState>('home');

  return (
    <div className="h-screen w-screen flex flex-col font-sans bg-[#ffffff] text-[#333840]">
      {/* Top Navigation Bar - Editorial style */}
      <nav className="h-[64px] border-b border-[#dddddd] bg-[#ffffff] flex items-center justify-between px-6 shrink-0 z-50">
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setView('home')}
        >
          <div className="w-8 h-8 flex items-center justify-center font-bold text-[#181d26] text-xl pb-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <h1 className="text-[16px] font-medium tracking-tight text-[#181d26]">Trinetra</h1>
        </div>
        
        <div className="flex gap-2 items-center">
          <NavButton active={view === 'trainee'} onClick={() => setView('trainee')}>Trainee Simulation</NavButton>
          <NavButton active={view === 'instructor'} onClick={() => setView('instructor')}>Instructor Builder</NavButton>
          <NavButton active={view === 'aar'} onClick={() => setView('aar')}>After-Action Review</NavButton>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
        {view === 'home' && <HomeUI setView={setView} />}
        {view === 'trainee' && <TraineeUI />}
        {view === 'instructor' && <InstructorUI />}
        {view === 'monitoring' && <div className="p-12 text-center text-[#41454d]">Live Monitoring View Pending Setup...</div>}
        {view === 'aar' && <AARUI />}
      </main>
    </div>
  );
}

function NavButton({ active, onClick, children }: { active: boolean, onClick: () => void, children: React.ReactNode }) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-[12px] text-[14px] font-medium transition-colors duration-200 
      ${active 
        ? 'bg-[#f8fafc] text-[#181d26] border border-[#dddddd]' 
        : 'text-[#41454d] hover:text-[#181d26] hover:bg-[#f8fafc] border border-transparent'
      }`}
    >
      {children}
    </button>
  );
}

export default App;
