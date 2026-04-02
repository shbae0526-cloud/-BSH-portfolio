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
  const [isAdminMode, setIsAdminMode] = useState(false);
  const { items, settings, isLoaded, addItem, updateItem, deleteItem, saveSettings } = usePortfolio();

  // Ensure data is loaded from localStorage before rendering
  if (!isLoaded) {
    return <div className="bg-black min-h-screen flex items-center justify-center text-[#00D4FF] font-bold">LOADING...</div>;
  }

  return (
    <div className="bg-black min-h-screen font-sans selection:bg-[#00D4FF] selection:text-black">
      <Navbar 
        isAdmin={isAdminMode} 
        onAdminClick={() => setIsAdminMode(!isAdminMode)} 
      />

      {isAdminMode ? (
        <AdminDashboard 
          items={items}
          settings={settings}
          onAddItem={addItem}
          onUpdateItem={updateItem}
          onDeleteItem={deleteItem}
          onUpdateSettings={saveSettings}
          onExit={() => setIsAdminMode(false)}
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
                <span className="text-[#00D4FF] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">About Me</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                  CRAFTING VISUAL <br />
                  <span className="text-gray-500 italic">EXPERIENCES</span>
                </h2>
                <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                  10년 이상의 경력을 가진 VFX 아티스트로서, 영화, 광고, 게임 등 다양한 매체에서 혁신적인 시각 효과를 창조해왔습니다. 
                  단순한 기술적 구현을 넘어, 관객의 감성을 자극하는 스토리텔링 중심의 비주얼을 지향합니다.
                </p>
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div>
                    <h4 className="text-white font-bold mb-2">EXPERTISE</h4>
                    <ul className="text-gray-500 text-sm space-y-1">
                      <li>3D Environment Design</li>
                      <li>Fluid & Particle Simulation</li>
                      <li>Compositing & Color Grading</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2">TOOLS</h4>
                    <ul className="text-gray-500 text-sm space-y-1">
                      <li>Houdini, Maya, Blender</li>
                      <li>Nuke, After Effects</li>
                      <li>Unreal Engine 5</li>
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
