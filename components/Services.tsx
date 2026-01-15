
import React from 'react';
import { PenTool, Laptop, Palette, BarChart } from 'lucide-react';

const services = [
  {
    icon: <PenTool className="text-purple-500" size={32} />,
    title: "Logo Design",
    titleKo: "로고 디자인",
    desc: "브랜드의 철학과 가치를 담아낸 심플하고 강력한 로고를 제작합니다. 시각적 정체성의 핵심을 만듭니다."
  },
  {
    icon: <Laptop className="text-purple-500" size={32} />,
    title: "Web Development",
    titleKo: "웹 개발",
    desc: "최신 Next.js와 Tailwind CSS 기술력을 바탕으로 빠른 속도와 감각적인 애니메이션이 살아있는 웹사이트를 구축합니다."
  },
  {
    icon: <Palette className="text-purple-500" size={32} />,
    title: "Branding",
    titleKo: "브랜딩 전략",
    desc: "로고를 넘어 컬러 팔레트, 폰트 시스템 등 브랜드가 고객에게 전달하는 모든 시각적 경험을 설계합니다."
  },
  {
    icon: <BarChart className="text-purple-500" size={32} />,
    title: "SEO & Growth",
    titleKo: "검색 최적화",
    desc: "아름다운 디자인에 그치지 않고 구글/네이버 검색 결과 상단에 노출될 수 있도록 기술적 SEO를 완벽히 지원합니다."
  }
];

export const Services: React.FC = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-6">OUR SERVICES</h2>
          <p className="text-gray-400 max-w-xl mx-auto">우리는 단순한 작업이 아닌, 비즈니스의 성공을 위한 파트너로서 최상의 결과물을 약속합니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, idx) => (
            <div 
              key={idx} 
              className="p-10 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="mb-6 bg-purple-500/10 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:bg-purple-500/20 transition-colors">
                {s.icon}
              </div>
              <h3 className="text-sm font-bold text-purple-400 mb-1 tracking-widest uppercase">{s.title}</h3>
              <h4 className="text-2xl font-bold mb-4">{s.titleKo}</h4>
              <p className="text-gray-400 leading-relaxed text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
