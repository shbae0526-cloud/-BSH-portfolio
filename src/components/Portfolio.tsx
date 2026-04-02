import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play, ChevronRight, X, Maximize2 } from 'lucide-react';
import { PortfolioItem, SiteSettings } from '../types';

const getVideoEmbedUrl = (url: string, isBackground = false) => {
  if (!url) return '';
  
  // YouTube
  const ytMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
  if (ytMatch) {
    let embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=1&loop=1&playlist=${ytMatch[1]}`;
    if (isBackground) {
      embedUrl += '&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3';
    }
    return embedUrl;
  }
  
  // Vimeo
  const vimeoMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/|player\.vimeo\.com\/video\/)([0-9]+)/);
  if (vimeoMatch) {
    let embedUrl = `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=1&loop=1&background=1`;
    return embedUrl;
  }
  
  return url;
};

const isDirectVideo = (url: string) => {
  return url.match(/\.(mp4|webm|ogg)(\?.*)?$/i);
};

export const PortfolioGrid = ({ items }: { items: PortfolioItem[] }) => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

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
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-white/5 mb-6">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                  {item.videoUrl ? <Play className="text-white fill-white ml-1" size={24} /> : <Maximize2 className="text-white" size={24} />}
                </div>
              </div>

              <div className="px-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#00D4FF] text-[10px] font-bold tracking-[0.2em] uppercase">{item.category}</span>
                  <div className="flex items-center gap-1 text-gray-500 group-hover:text-[#00D4FF] transition-colors text-[10px] font-bold">
                    {item.videoUrl ? 'VIDEO' : 'IMAGE'}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00D4FF] transition-colors">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-xl"
          >
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 z-[110] w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              <X size={24} />
            </button>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl"
            >
              {selectedItem.videoUrl ? (
                isDirectVideo(selectedItem.videoUrl) ? (
                  <video 
                    src={selectedItem.videoUrl} 
                    className="w-full h-full" 
                    controls 
                    autoPlay 
                  />
                ) : (
                  <iframe 
                    src={getVideoEmbedUrl(selectedItem.videoUrl)}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={selectedItem.title}
                  />
                )
              ) : (
                <img 
                  src={selectedItem.imageUrl} 
                  alt={selectedItem.title} 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
                <span className="text-[#00D4FF] text-xs font-bold tracking-[0.2em] uppercase mb-2 block">{selectedItem.category}</span>
                <h3 className="text-3xl font-bold text-white mb-2">{selectedItem.title}</h3>
                <p className="text-gray-400 text-sm max-w-2xl">{selectedItem.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export const Hero = ({ settings }: { settings: SiteSettings }) => {
  const renderBackground = () => {
    if (!settings.heroBackgroundUrl) {
      return (
        <>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D4FF]/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px]" />
        </>
      );
    }

    if (isDirectVideo(settings.heroBackgroundUrl)) {
      return (
        <video 
          src={settings.heroBackgroundUrl} 
          className="absolute inset-0 w-full h-full object-cover opacity-30" 
          autoPlay 
          muted 
          loop 
          playsInline
        />
      );
    }

    const embedUrl = getVideoEmbedUrl(settings.heroBackgroundUrl, true);
    if (embedUrl.includes('youtube.com') || embedUrl.includes('vimeo.com')) {
      return (
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          <iframe 
            src={embedUrl}
            className="w-full h-full scale-150"
            allow="autoplay; fullscreen"
            title="Hero Background"
          />
        </div>
      );
    }

    return (
      <img 
        src={settings.heroBackgroundUrl} 
        alt="Hero Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
        referrerPolicy="no-referrer"
      />
    );
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {renderBackground()}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black" />
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
