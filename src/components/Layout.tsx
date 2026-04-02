import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Youtube, Video, Palette, Mail, ExternalLink } from 'lucide-react';

export const Navbar = ({ onAdminClick, isAdmin, user, onLogin, onLogout }: { 
  onAdminClick: () => void, 
  isAdmin: boolean,
  user: any,
  onLogin: () => void,
  onLogout: () => void
}) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-bold tracking-tighter text-white"
      >
        VFX <span className="text-[#00D4FF]">BSH</span>
      </motion.div>
      <div className="flex items-center gap-8">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm font-medium text-gray-400 hover:text-[#00D4FF] transition-colors">HOME</button>
        <button onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-medium text-gray-400 hover:text-[#00D4FF] transition-colors">PORTFOLIO</button>
        
        {user ? (
          <div className="flex items-center gap-4">
            {isAdmin && (
              <button 
                onClick={onAdminClick}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${isAdmin && window.location.hash === '#admin' ? 'bg-[#00D4FF] text-black' : 'border border-[#00D4FF] text-[#00D4FF] hover:bg-[#00D4FF] hover:text-black'}`}
              >
                {isAdmin && window.location.hash === '#admin' ? 'EXIT ADMIN' : 'ADMIN CMS'}
              </button>
            )}
            <button 
              onClick={onLogout}
              className="text-xs font-bold text-gray-500 hover:text-white transition-colors"
            >
              LOGOUT
            </button>
            {user.photoURL && (
              <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-white/10" referrerPolicy="no-referrer" />
            )}
          </div>
        ) : (
          <button 
            onClick={onLogin}
            className="px-4 py-2 rounded-full text-xs font-bold border border-white/20 text-white hover:bg-white/10 transition-all"
          >
            ADMIN LOGIN
          </button>
        )}
      </div>
    </div>
  </nav>
);

export const Footer = ({ settings }: { settings: any }) => (
  <footer className="bg-[#0a0a0a] border-t border-white/5 py-20 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
      <div>
        <div className="text-2xl font-bold tracking-tighter text-white mb-6">
          VFX <span className="text-[#00D4FF]">BSH</span>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
          최첨단 시각 효과 기술을 통해 상상 속의 세계를 현실로 구현하는 VFX 아티스트 포트폴리오입니다.
        </p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6 text-sm tracking-widest">CONTACT</h4>
        <div className="space-y-4">
          <a href={`mailto:${settings.contactEmail}`} className="flex items-center gap-3 text-gray-400 hover:text-[#00D4FF] transition-colors group">
            <Mail size={18} />
            <span className="text-sm">{settings.contactEmail}</span>
          </a>
        </div>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6 text-sm tracking-widest">SOCIAL</h4>
        <div className="flex gap-4">
          {settings.socialLinks.instagram && (
            <a href={settings.socialLinks.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#00D4FF] hover:text-black transition-all">
              <Instagram size={20} />
            </a>
          )}
          {settings.socialLinks.youtube && (
            <a href={settings.socialLinks.youtube} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#00D4FF] hover:text-black transition-all">
              <Youtube size={20} />
            </a>
          )}
          {settings.socialLinks.vimeo && (
            <a href={settings.socialLinks.vimeo} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#00D4FF] hover:text-black transition-all">
              <Video size={20} />
            </a>
          )}
          {settings.socialLinks.artstation && (
            <a href={settings.socialLinks.artstation} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#00D4FF] hover:text-black transition-all">
              <Palette size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-xs">
      <p>© 2024 VFX BSH Portfolio. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
      </div>
    </div>
  </footer>
);
