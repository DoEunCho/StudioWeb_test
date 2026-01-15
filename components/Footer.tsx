import React from 'react';
// 확장자를 추가하여 경로를 명확히 합니다.
import { useAppState } from '../AppContext.tsx';

export const Footer: React.FC = () => {
  const { settings } = useAppState();
  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h2 className="text-xl font-bold mb-2">{settings.siteTitle.toUpperCase()}</h2>
          <p className="text-gray-500 text-sm">© 2024 DING STUDIO. 모든 권리 보유.</p>
        </div>
        
        <div className="flex gap-8 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition-colors">이용약관</a>
          <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
          <a href="#" className="hover:text-white transition-colors">쿠키정책</a>
        </div>
      </div>
    </footer>
  );
};
