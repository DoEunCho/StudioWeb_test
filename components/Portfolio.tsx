
import React, { useState } from 'react';
import { useAppState } from '../AppContext';
import { ExternalLink } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const { portfolio } = useAppState();
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Logo', 'Web', 'Branding'];
  const filteredPortfolio = filter === 'All' 
    ? portfolio 
    : portfolio.filter(item => item.category === filter);

  return (
    <section className="py-24 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">SELECTED WORKS</h2>
            <p className="text-gray-400 max-w-lg">
              딩스튜디오만의 감각으로 완성된 프리미엄 프로젝트 리스트입니다. 각 브랜드의 아이덴티티를 최우선으로 생각합니다.
            </p>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  filter === cat 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {cat === 'All' ? '전체' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPortfolio.map((item, idx) => (
            <div 
              key={item.id} 
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-900 border border-white/5"
            >
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-purple-400 text-xs font-bold tracking-widest uppercase mb-2">{item.category}</span>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm mb-6 line-clamp-2">{item.description}</p>
                <div className="flex items-center gap-2 text-white font-semibold group/btn">
                  자세히 보기 
                  <ExternalLink size={16} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
