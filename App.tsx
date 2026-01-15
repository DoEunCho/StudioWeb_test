
import React from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { Portfolio } from './components/Portfolio.tsx';
import { Services } from './components/Services.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { AdminPanel } from './components/AdminPanel.tsx';
import { AppProvider, useAppState } from './AppContext.tsx';
import { LayoutGrid, Eye } from 'lucide-react';

const MainContent: React.FC = () => {
  const { isAdmin, setIsAdmin } = useAppState();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white overflow-x-hidden">
      {isAdmin ? (
        <AdminPanel />
      ) : (
        <>
          <Navbar />
          <main>
            <Hero />
            <div id="portfolio">
              <Portfolio />
            </div>
            <div id="services">
              <Services />
            </div>
            <div id="contact">
              <Contact />
            </div>
          </main>
          <Footer />
        </>
      )}

      {/* Admin Toggle Floating Button */}
      <button
        onClick={() => setIsAdmin(!isAdmin)}
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/40 transition-all duration-300 transform hover:scale-110 group flex items-center justify-center"
        title={isAdmin ? "사이트 보기" : "관리자 모드"}
      >
        {isAdmin ? (
          <Eye className="w-6 h-6 text-white" />
        ) : (
          <LayoutGrid className="w-6 h-6 text-white" />
        )}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
          {isAdmin ? "사이트 보기" : "관리자 대시보드"}
        </span>
      </button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
};

export default App;