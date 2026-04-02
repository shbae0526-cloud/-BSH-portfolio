/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, Footer } from './components/Layout';
import { Hero, PortfolioGrid } from './components/Portfolio';
import { AdminDashboard } from './components/AdminDashboard';
import { usePortfolio } from './hooks/usePortfolio';

export default function App() {
  const [isAdminMode, setIsAdminMode] = React.useState(window.location.hash === '#admin');
  const { items, settings, isLoaded, user, isAdmin, login, logout, addItem, updateItem, deleteItem, saveSettings } = usePortfolio();

  React.useEffect(() => {
    const handleHashChange = () => {
      setIsAdminMode(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleAdminMode = () => {
    if (isAdminMode) {
      window.location.hash = '';
    } else {
      window.location.hash = 'admin';
    }
  };

  // Ensure data is loaded from Firestore before rendering
  if (!isLoaded) {
    return <div className="bg-black min-h-screen flex items-center justify-center text-[#00D4FF] font-bold">LOADING...</div>;
  }

  return (
    <div className="bg-black min-h-screen font-sans selection:bg-[#00D4FF] selection:text-black">
      <Navbar 
        isAdmin={isAdmin} 
        user={user}
        onLogin={login}
        onLogout={logout}
        onAdminClick={toggleAdminMode} 
      />

      {isAdminMode && isAdmin ? (
        <AdminDashboard 
          items={items}
          settings={settings}
          onAddItem={addItem}
          onUpdateItem={updateItem}
          onDeleteItem={deleteItem}
          onUpdateSettings={saveSettings}
          onExit={toggleAdminMode}
        />
      ) : (
        <main>
          <Hero settings={settings} />
          <PortfolioGrid items={items} />
          
          {/* About Section */}
          <section className="py-32 px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                  <img 
                    src={settings.aboutImageUrl} 
                    alt="Artist" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#00D4FF] rounded-2xl -z-10 opacity-20 blur-3xl" />
              </div>
              <div>
                <span className="text-[#00D4FF] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">{settings.aboutSubtitle}</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                  {settings.aboutTitle.split(' ').map((word, i) => (
                    <React.Fragment key={i}>
                      {i === settings.aboutTitle.split(' ').length - 1 ? (
                        <span className="text-gray-500 italic">{word}</span>
                      ) : (
                        <>{word} </>
                      )}
                      {i === 1 && <br />}
                    </React.Fragment>
                  ))}
                </h2>
                <p className="text-gray-400 leading-relaxed mb-8 text-lg whitespace-pre-wrap">
                  {settings.aboutDescription}
                </p>
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div>
                    <h4 className="text-white font-bold mb-2">EXPERTISE</h4>
                    <ul className="text-gray-500 text-sm space-y-1">
                      {settings.aboutExpertise.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2">TOOLS</h4>
                    <ul className="text-gray-500 text-sm space-y-1">
                      {settings.aboutTools.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button className="text-[#00D4FF] font-bold flex items-center gap-2 group">
                  DOWNLOAD RESUME 
                  <span className="w-12 h-[1px] bg-[#00D4FF] group-hover:w-20 transition-all" />
                </button>
              </div>
            </div>
          </section>
        </main>
      )}

      <Footer settings={settings} />
    </div>
  );
}
