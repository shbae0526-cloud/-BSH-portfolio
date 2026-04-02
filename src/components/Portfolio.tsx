import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, ChevronRight } from 'lucide-react';
import { PortfolioItem, SiteSettings } from '../types';

export const PortfolioGrid = ({ items }: { items: PortfolioItem[] }) => {
  return (
    <section id="portfolio" className="py-32 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[#00D4FF] text-xs font-bold tracking-[0.3em] uppercase mb-4 block"
            >
              Selected Works
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white tracking-tight"
            >
              PORTFOLIO
            </motion.h2>
          </div>
          <div className="flex gap-4">
            {['ALL', 'ENVIRONMENTS', 'CHARACTERS', 'SIMULATION'].map((cat) => (
              <button key={cat} className="text-xs font-bold text-gray-500 hover:text-white transition-colors tracking-widest">{cat}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-white/5 cursor-pointer"
            >
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[#00D4FF] text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block">{item.category}</span>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <div className="flex items-center gap-2 text-white/0 group-hover:text-white transition-all duration-500 text-sm font-medium">
                  VIEW PROJECT <ArrowRight size={16} />
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                <Play className="text-white fill-white ml-1" size={24} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Hero = ({ settings }: { settings: SiteSettings }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D4FF]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/5 text-[#00D4FF] text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
            VFX Artist & Visual Designer
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[0.9] mb-8">
            {settings.heroTitle.split(' ').map((word, i) => (
              <span key={i} className={i === 1 ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-blue-600' : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 font-light">
            {settings.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-10 py-4 bg-[#00D4FF] text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_rgba(0,212,255,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                VIEW PORTFOLIO <ChevronRight size={18} />
              </span>
            </button>
            <button className="px-10 py-4 border border-white/10 text-white font-bold rounded-full hover:bg-white/5 transition-all">
              CONTACT ME
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] font-bold text-gray-500 tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#00D4FF] to-transparent" />
      </motion.div>
    </section>
  );
};
