
import React, { useState } from 'react';
import { useAppState } from '../AppContext.tsx';
import { Settings, Image as ImageIcon, Plus, Trash2, Save, LayoutGrid, ChevronRight, LogOut } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { portfolio, setPortfolio, settings, setSettings, setIsAdmin } = useAppState();
  const [activeTab, setActiveTab] = useState<'content' | 'settings'>('content');
  
  const [newItem, setNewItem] = useState({
    title: '',
    category: 'Logo' as 'Logo' | 'Web' | 'Branding',
    imageUrl: '',
    description: ''
  });

  const handleAddPortfolio = () => {
    if (!newItem.title || !newItem.imageUrl) {
      alert('제목과 이미지 URL을 입력해주세요.');
      return;
    }
    const item = {
      ...newItem,
      id: Date.now().toString()
    };
    setPortfolio(prev => [...prev, item]);
    setNewItem({ title: '', category: 'Logo', imageUrl: '', description: '' });
  };

  const handleDeletePortfolio = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setPortfolio(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleUpdateSettings = (e: React.FormEvent) => {
    e.preventDefault();
    alert('설정이 로컬에 저장되었습니다!');
  };

  return (
    <div className="min-h-screen bg-[#080808] flex text-white font-sans">
      {/* Sidebar */}
      <div className="w-72 border-r border-white/5 p-8 hidden md:flex flex-col bg-black/40 backdrop-blur-3xl">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/20">
            <LayoutGrid size={20} className="text-white" />
          </div>
          <h2 className="text-lg font-black tracking-tight">D-CMS ADMIN</h2>
        </div>
        
        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab('content')}
            className={`w-full text-left px-5 py-4 rounded-2xl flex items-center justify-between transition-all duration-300 ${activeTab === 'content' ? 'bg-purple-600/10 text-purple-400 border border-purple-500/20 shadow-inner' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
          >
            <span className="flex items-center gap-3 font-semibold"><ImageIcon size={18} /> 포트폴리오</span>
            <ChevronRight size={14} className={activeTab === 'content' ? 'opacity-100' : 'opacity-0'} />
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left px-5 py-4 rounded-2xl flex items-center justify-between transition-all duration-300 ${activeTab === 'settings' ? 'bg-purple-600/10 text-purple-400 border border-purple-500/20 shadow-inner' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
          >
            <span className="flex items-center gap-3 font-semibold"><Settings size={18} /> 사이트 설정</span>
            <ChevronRight size={14} className={activeTab === 'settings' ? 'opacity-100' : 'opacity-0'} />
          </button>
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5">
          <button 
            onClick={() => setIsAdmin(false)}
            className="w-full px-5 py-4 rounded-2xl bg-white/5 text-sm font-bold flex items-center justify-center gap-3 border border-white/10 hover:bg-white/10 hover:text-purple-400 transition-all active:scale-95"
          >
            <LogOut size={16} /> 사이트 보기
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 md:p-16 max-h-screen overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <h3 className="text-4xl font-black">
            {activeTab === 'content' ? 'Project Portfolio' : 'Site Configuration'}
          </h3>
          <div className="text-xs text-gray-500 font-mono tracking-widest uppercase">
            Mode: Developer Access
          </div>
        </header>

        {activeTab === 'content' ? (
          <div className="max-w-5xl">
            {/* Add New Form */}
            <div className="bg-white/[0.02] rounded-3xl p-10 border border-white/10 mb-16 backdrop-blur-md">
              <h4 className="text-xs font-bold text-purple-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                <Plus size={14} /> Add New Project
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-gray-500 ml-2 tracking-widest">Title</label>
                  <input 
                    placeholder="프로젝트 제목을 입력하세요" 
                    value={newItem.title}
                    onChange={e => setNewItem({...newItem, title: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-purple-500/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-gray-500 ml-2 tracking-widest">Category</label>
                  <select 
                    value={newItem.category}
                    onChange={e => setNewItem({...newItem, category: e.target.value as any})}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-purple-500/50 transition-colors appearance-none"
                  >
                    <option value="Logo">Logo</option>
                    <option value="Web">Web</option>
                    <option value="Branding">Branding</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-gray-500 ml-2 tracking-widest">Image URL</label>
                  <input 
                    placeholder="https://..." 
                    value={newItem.imageUrl}
                    onChange={e => setNewItem({...newItem, imageUrl: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-purple-500/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-gray-500 ml-2 tracking-widest">Description</label>
                  <input 
                    placeholder="간단한 설명을 입력하세요" 
                    value={newItem.description}
                    onChange={e => setNewItem({...newItem, description: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-purple-500/50 transition-colors"
                  />
                </div>
              </div>
              <button 
                onClick={handleAddPortfolio}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-12 py-4 rounded-2xl transition-all shadow-xl shadow-purple-600/20 active:scale-95"
              >
                아이템 등록하기
              </button>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {portfolio.map(item => (
                <div key={item.id} className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex gap-6 items-center group hover:bg-white/[0.05] transition-colors">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/10 shadow-lg flex-shrink-0">
                    <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full font-black uppercase tracking-widest">{item.category}</span>
                    <h5 className="font-bold text-lg mt-2 truncate">{item.title}</h5>
                    <p className="text-gray-500 text-sm truncate mt-0.5">{item.description}</p>
                  </div>
                  <button 
                    onClick={() => handleDeletePortfolio(item.id)}
                    className="p-3 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl">
            <form className="bg-white/[0.02] rounded-3xl p-10 border border-white/10 space-y-10 backdrop-blur-md" onSubmit={handleUpdateSettings}>
              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] ml-2">Site Title</label>
                <input 
                  value={settings.siteTitle}
                  onChange={e => setSettings({...settings, siteTitle: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-purple-500/50 transition-all font-bold" 
                />
              </div>
              
              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] ml-2">Hero Headline</label>
                <textarea 
                  rows={2}
                  value={settings.heroText}
                  onChange={e => setSettings({...settings, heroText: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-purple-500/50 transition-all leading-relaxed" 
                />
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] ml-2">Subheadline</label>
                <textarea 
                  rows={3}
                  value={settings.heroSubText}
                  onChange={e => setSettings({...settings, heroSubText: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-purple-500/50 transition-all leading-relaxed text-gray-400" 
                />
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] ml-2">Accent Brand Color</label>
                <div className="flex gap-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shadow-lg group">
                    <input 
                      type="color"
                      value={settings.accentColor}
                      onChange={e => setSettings({...settings, accentColor: e.target.value})}
                      className="absolute inset-[-10px] w-[calc(100%+20px)] h-[calc(100%+20px)] cursor-pointer" 
                    />
                  </div>
                  <input 
                    value={settings.accentColor}
                    onChange={e => setSettings({...settings, accentColor: e.target.value})}
                    className="flex-1 bg-black/40 border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-purple-500/50 transition-all font-mono uppercase tracking-widest text-sm" 
                  />
                </div>
              </div>

              <button className="flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 text-white font-black px-12 py-5 rounded-2xl transition-all shadow-2xl shadow-purple-600/30 active:scale-95 w-full md:w-auto">
                <Save size={18} /> Update Configuration
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};