import { useState } from 'react';
import TraineeUI from './components/TraineeUI';
import InstructorUI from './components/InstructorUI';
import AARUI from './components/AARUI';
import HomeUI from './components/HomeUI';

type ViewState = 'home' | 'trainee' | 'instructor' | 'aar';

function App() {
  const [view, setView] = useState<ViewState>('home');

  return (
    <div className="h-screen w-full flex flex-col font-sans bg-gis-bg text-gis-text overflow-hidden">
      {/* Top Navigation Bar - Dark IDE Style */}
      <nav className="h-[48px] bg-gis-nav flex items-center justify-between px-4 shrink-0 border-b border-gis-border shadow-sm z-50">
        <div className="flex items-center gap-6">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setView('home')}
          >
            {/* Grid icon mimicking the screenshot */}
            <div className="grid grid-cols-3 gap-[2px] w-[14px] h-[14px] opacity-80">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-white rounded-[1px]"></div>
              ))}
            </div>
            <h1 className="text-[15px] font-medium tracking-wide text-gis-text ml-2">Trinetra</h1>
          </div>
          
          <div className="flex gap-1 ml-4 border-l border-[#333] pl-6">
            <NavButton active={view === 'trainee'} onClick={() => setView('trainee')}>Trainee Dashboard</NavButton>
            <NavButton active={view === 'instructor'} onClick={() => setView('instructor')}>Instructor Setup</NavButton>
            <NavButton active={view === 'aar'} onClick={() => setView('aar')}>Analytics & AAR</NavButton>
          </div>
        </div>

        <div className="flex items-center gap-4 text-gis-muted">
          {/* Mock icons for top right */}
          <div className="w-4 h-4 bg-gis-muted rounded-sm"></div>
          <div className="w-4 h-4 bg-gis-muted rounded-full"></div>
          <div className="w-4 h-4 bg-gis-muted rotate-45"></div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 w-full h-[calc(100vh-48px)]">
        {view === 'home' && <HomeUI setView={setView} />}
        {view === 'trainee' && <TraineeUI />}
        {view === 'instructor' && <InstructorUI />}
        {view === 'aar' && <AARUI />}
      </main>
    </div>
  );
}

function NavButton({ active, onClick, children }: { active: boolean, onClick: () => void, children: React.ReactNode }) {
  return (
    <button 
      onClick={onClick}
      className={`px-3 py-1.5 text-[13px] rounded-md transition-colors ${active ? 'bg-gis-active text-white' : 'text-gis-muted hover:text-gis-text hover:bg-[#333]'}`}
    >
      {children}
    </button>
  );
}

export default App;
