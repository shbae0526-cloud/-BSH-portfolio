import React from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Edit2, Save, X, Image as ImageIcon, Settings as SettingsIcon, LayoutGrid, Play } from 'lucide-react';
import { PortfolioItem, SiteSettings } from '../types';

export const AdminDashboard = ({ 
  items, 
  settings, 
  onAddItem, 
  onUpdateItem, 
  onDeleteItem, 
  onUpdateSettings,
  onExit
}: { 
  items: PortfolioItem[], 
  settings: SiteSettings,
  onAddItem: (item: any) => void,
  onUpdateItem: (id: string, item: any) => void,
  onDeleteItem: (id: string) => void,
  onUpdateSettings: (settings: SiteSettings) => void,
  onExit: () => void
}) => {
  const [activeTab, setActiveTab] = React.useState<'items' | 'settings'>('items');
  const [isAdding, setIsAdding] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<PortfolioItem | null>(null);
  const [newItem, setNewItem] = React.useState({ title: '', category: '', description: '', imageUrl: '', videoUrl: '', images: [] as string[] });
  const [saveStatus, setSaveStatus] = React.useState<string | null>(null);

  const handleSaveSettings = () => {
    onUpdateSettings(settings);
    setSaveStatus('설정이 저장되었습니다.');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-500">포트폴리오 콘텐츠 및 사이트 설정을 관리하세요.</p>
          </div>
          <div className="flex bg-white/5 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('items')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'items' ? 'bg-[#00D4FF] text-black shadow-[0_0_20px_rgba(0,212,255,0.3)]' : 'text-gray-400 hover:text-white'}`}
            >
              <LayoutGrid size={18} />
              게시글 관리
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'settings' ? 'bg-[#00D4FF] text-black shadow-[0_0_20px_rgba(0,212,255,0.3)]' : 'text-gray-400 hover:text-white'}`}
            >
              <SettingsIcon size={18} />
              사이트 설정
            </button>
          </div>
          <button 
            onClick={onExit} 
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white/5 text-white hover:bg-white/10 transition-all text-sm font-bold"
          >
            <X size={18} />
            닫기
          </button>
        </div>

        {activeTab === 'items' ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">포트폴리오 목록 ({items.length})</h2>
              <button 
                onClick={() => {
                  setIsAdding(true);
                  setEditingItem(null);
                }}
                className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#00D4FF] transition-all"
              >
                <Plus size={18} />
                새 작품 추가
              </button>
            </div>

            {(isAdding || editingItem) && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-[#00D4FF]/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,212,255,0.05)]"
              >
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  {editingItem ? <Edit2 size={18} className="text-[#00D4FF]" /> : <Plus size={18} className="text-[#00D4FF]" />}
                  {editingItem ? '작품 수정하기' : '새 작품 추가하기'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">제목</label>
                    <input 
                      type="text" 
                      value={editingItem ? editingItem.title : newItem.title}
                      onChange={e => editingItem 
                        ? setEditingItem({...editingItem, title: e.target.value})
                        : setNewItem({...newItem, title: e.target.value})
                      }
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00D4FF] outline-none transition-all"
                      placeholder="작품 제목을 입력하세요"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">카테고리</label>
                    <input 
                      type="text" 
                      value={editingItem ? editingItem.category : newItem.category}
                      onChange={e => editingItem 
                        ? setEditingItem({...editingItem, category: e.target.value})
                        : setNewItem({...newItem, category: e.target.value})
                      }
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00D4FF] outline-none transition-all"
                      placeholder="예: Environments, Characters"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">이미지 URL</label>
                    <input 
                      type="text" 
                      value={editingItem ? editingItem.imageUrl : newItem.imageUrl}
                      onChange={e => editingItem 
                        ? setEditingItem({...editingItem, imageUrl: e.target.value})
                        : setNewItem({...newItem, imageUrl: e.target.value})
                      }
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00D4FF] outline-none transition-all"
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">영상 URL (선택사항)</label>
                      {(editingItem?.videoUrl || newItem.videoUrl) && (
                        <span className="text-[10px] text-[#00D4FF] font-bold">URL 감지됨</span>
                      )}
                    </div>
                    <input 
                      type="text" 
                      value={editingItem ? (editingItem.videoUrl || '') : newItem.videoUrl}
                      onChange={e => editingItem 
                        ? setEditingItem({...editingItem, videoUrl: e.target.value})
                        : setNewItem({...newItem, videoUrl: e.target.value})
                      }
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00D4FF] outline-none transition-all"
                      placeholder="YouTube, Vimeo 또는 .mp4 파일 링크"
                    />
                    <p className="text-[10px] text-gray-600">YouTube(watch/embed/shorts), Vimeo, 또는 직접적인 영상 파일(.mp4 등) 링크를 지원합니다.</p>
                  </div>
                  <div className="md:col-span-2 space-y-4">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">추가 이미지 (여러 장 묶기)</label>
                    <div className="grid grid-cols-1 gap-3">
                      {(editingItem?.images || newItem.images).map((img, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input 
                            type="text" 
                            value={img}
                            onChange={e => {
                              const newImages = [...(editingItem ? (editingItem.images || []) : newItem.images)];
                              newImages[idx] = e.target.value;
                              editingItem 
                                ? setEditingItem({...editingItem, images: newImages})
                                : setNewItem({...newItem, images: newImages});
                            }}
                            className="flex-grow bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00D4FF] outline-none transition-all"
                            placeholder="https://..."
                          />
                          <button 
                            onClick={() => {
                              const newImages = (editingItem ? (editingItem.images || []) : newItem.images).filter((_, i) => i !== idx);
                              editingItem 
                                ? setEditingItem({...editingItem, images: newImages})
                                : setNewItem({...newItem, images: newImages});
                            }}
                            className="p-3 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                      <button 
                        onClick={() => {
                          const newImages = [...(editingItem ? (editingItem.images || []) : newItem.images), ''];
                          editingItem 
                            ? setEditingItem({...editingItem, images: newImages})
                            : setNewItem({...newItem, images: newImages});
                        }}
                        className="flex items-center justify-center gap-2 w-full py-3 border border-dashed border-white/10 rounded-lg text-gray-500 hover:text-white hover:border-white/30 transition-all text-sm"
                      >
                        <Plus size={16} /> 이미지 추가
                      </button>
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">설명</label>
                    <textarea 
                      value={editingItem ? editingItem.description : newItem.description}
                      onChange={e => editingItem 
                        ? setEditingItem({...editingItem, description: e.target.value})
                        : setNewItem({...newItem, description: e.target.value})
                      }
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00D4FF] outline-none transition-all h-32 resize-none"
                      placeholder="작품에 대한 상세 설명을 입력하세요"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <button 
                    onClick={() => {
                      setIsAdding(false);
                      setEditingItem(null);
                    }} 
                    className="px-6 py-2.5 rounded-full text-sm font-bold text-gray-400 hover:text-white transition-all"
                  >
                    취소
                  </button>
                  <button 
                    onClick={async () => {
                      try {
                        if (!newItem.title || !newItem.category) {
                          alert('제목과 카테고리는 필수입니다.');
                          return;
                        }
                        if (!newItem.imageUrl && !newItem.videoUrl && !editingItem) {
                          alert('이미지 URL 또는 영상 URL 중 하나는 반드시 입력해야 합니다.');
                          return;
                        }

                        if (editingItem) {
                          await onUpdateItem(editingItem.id, editingItem);
                          setEditingItem(null);
                        } else {
                          await onAddItem(newItem);
                          setIsAdding(false);
                          setNewItem({ title: '', category: '', description: '', imageUrl: '', videoUrl: '', images: [] });
                        }
                      } catch (err: any) {
                        console.error('Save Error:', err);
                        alert('저장에 실패했습니다. ' + (err.message || ''));
                      }
                    }}
                    className="bg-[#00D4FF] text-black px-8 py-2.5 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(0,212,255,0.3)]"
                  >
                    {editingItem ? '수정 완료' : '저장하기'}
                  </button>
                </div>
              </motion.div>
            )}

            <div className="grid grid-cols-1 gap-4">
              {items.map(item => (
                <div key={item.id} className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-center gap-6 group hover:border-white/20 transition-all">
                  <div className="w-24 h-16 rounded-lg overflow-hidden bg-black flex-shrink-0">
                    <img 
                      src={item.imageUrl || (item.videoUrl?.includes('youtube.com') || item.videoUrl?.includes('youtu.be') 
                        ? `https://img.youtube.com/vi/${item.videoUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1]}/hqdefault.jpg` 
                        : 'https://picsum.photos/seed/vfx-placeholder/200/150')} 
                      alt={item.title} 
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-bold">{item.title}</h3>
                      {item.videoUrl && <Play size={12} className="text-[#00D4FF] fill-[#00D4FF]" />}
                    </div>
                    <p className="text-gray-500 text-xs">{item.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setEditingItem(item);
                        setIsAdding(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }} 
                      className="p-2 text-gray-500 hover:text-[#00D4FF] transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => onDeleteItem(item.id)} className="p-2 text-gray-500 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-10 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">사이트 이름</label>
                <input 
                  type="text" 
                  value={settings.siteName}
                  onChange={e => onUpdateSettings({...settings, siteName: e.target.value})}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00D4FF] outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">포인트 컬러</label>
                <div className="flex gap-3">
                  <input 
                    type="color" 
                    value={settings.accentColor}
                    onChange={e => onUpdateSettings({...settings, accentColor: e.target.value})}
                    className="w-12 h-12 bg-black border border-white/10 rounded-lg cursor-pointer"
                  />
                  <input 
                    type="text" 
                    value={settings.accentColor}
                    onChange={e => onUpdateSettings({...settings, accentColor: e.target.value})}
                    className="flex-grow bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00D4FF] outline-none transition-all"
                  />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">About Me 이미지 URL</label>
                <input 
                  type="text" 
                  value={settings.aboutImageUrl}
                  onChange={e => onUpdateSettings({...settings, aboutImageUrl: e.target.value})}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00D4FF] outline-none transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">히어로 배경 URL (이미지 또는 영상)</label>
                <input 
                  type="text" 
                  value={settings.heroBackgroundUrl || ''}
                  onChange={e => onUpdateSettings({...settings, heroBackgroundUrl: e.target.value})}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00D4FF] outline-none transition-all"
                  placeholder="YouTube, Vimeo 또는 .mp4 파일 링크"
                />
                <p className="text-[10px] text-gray-600">히어로 섹션 배경에 표시될 이미지나 영상 URL을 입력하세요.</p>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">히어로 섹션 제목</label>
                <input 
                  type="text" 
                  value={settings.heroTitle}
                  onChange={e => onUpdateSettings({...settings, heroTitle: e.target.value})}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00D4FF] outline-none transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">히어로 섹션 부제목</label>
                <textarea 
                  value={settings.heroSubtitle}
                  onChange={e => onUpdateSettings({...settings, heroSubtitle: e.target.value})}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00D4FF] outline-none transition-all h-24 resize-none"
                />
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <h3 className="text-lg font-bold text-white mb-6">About Me 섹션 설정</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">About Me 소제목</label>
                  <input 
                    type="text" 
                    value={settings.aboutSubtitle}
                    onChange={e => onUpdateSettings({...settings, aboutSubtitle: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00D4FF] outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">About Me 메인 제목</label>
                  <input 
                    type="text" 
                    value={settings.aboutTitle}
                    onChange={e => onUpdateSettings({...settings, aboutTitle: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00D4FF] outline-none transition-all"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">자기 소개 설명</label>
                  <textarea 
                    value={settings.aboutDescription}
                    onChange={e => onUpdateSettings({...settings, aboutDescription: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00D4FF] outline-none transition-all h-32 resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">EXPERTISE (한 줄에 하나씩)</label>
                  <textarea 
                    value={settings.aboutExpertise.join('\n')}
                    onChange={e => onUpdateSettings({...settings, aboutExpertise: e.target.value.split('\n').filter(line => line.trim() !== '')})}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00D4FF] outline-none transition-all h-32 resize-none"
                    placeholder="3D Environment Design&#10;Fluid & Particle Simulation"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">TOOLS (한 줄에 하나씩)</label>
                  <textarea 
                    value={settings.aboutTools.join('\n')}
                    onChange={e => onUpdateSettings({...settings, aboutTools: e.target.value.split('\n').filter(line => line.trim() !== '')})}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00D4FF] outline-none transition-all h-32 resize-none"
                    placeholder="Houdini, Maya, Blender&#10;Nuke, After Effects"
                  />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <h3 className="text-lg font-bold text-white mb-6">소셜 미디어 링크</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Instagram</label>
                  <input 
                    type="text" 
                    value={settings.socialLinks.instagram}
                    onChange={e => onUpdateSettings({...settings, socialLinks: {...settings.socialLinks, instagram: e.target.value}})}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00D4FF] outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">YouTube</label>
                  <input 
                    type="text" 
                    value={settings.socialLinks.youtube}
                    onChange={e => onUpdateSettings({...settings, socialLinks: {...settings.socialLinks, youtube: e.target.value}})}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00D4FF] outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6 items-center gap-4">
              {saveStatus && (
                <motion.span 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[#00D4FF] text-sm font-bold"
                >
                  {saveStatus}
                </motion.span>
              )}
              <button 
                onClick={handleSaveSettings}
                className="flex items-center gap-2 bg-[#00D4FF] text-black px-10 py-3 rounded-full text-sm font-bold shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:scale-105 transition-all"
              >
                <Save size={18} />
                모든 설정 저장
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
