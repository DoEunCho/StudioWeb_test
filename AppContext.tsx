
import React, { createContext, useContext, useState } from 'react';
import { PortfolioItem, SiteSettings, AppState } from './types';

interface AppContextType {
  portfolio: PortfolioItem[];
  settings: SiteSettings;
  isAdmin: boolean;
  setPortfolio: React.Dispatch<React.SetStateAction<PortfolioItem[]>>;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: '1',
    title: 'LUX 브랜딩 패키지',
    category: 'Branding',
    imageUrl: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=800',
    description: '하이엔드 패션 브랜드를 위한 미니멀 로고 및 가이드라인 제작'
  },
  {
    id: '2',
    title: '딩 테크 웹사이트',
    category: 'Web',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    description: '차세대 AI 솔루션을 위한 미래지향적 인터페이스 개발'
  },
  {
    id: '3',
    title: '아트 갤러리 로고',
    category: 'Logo',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800',
    description: '전통과 현대가 공존하는 갤러리의 정체성을 담은 시그니처'
  },
  {
    id: '4',
    title: '에코 리빙 온라인 스토어',
    category: 'Web',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
    description: '친환경 라이프스타일 브랜드의 감성을 녹여낸 커머스 플랫폼'
  },
];

const INITIAL_SETTINGS: SiteSettings = {
  siteTitle: '딩스튜디오',
  accentColor: '#9333ea',
  heroText: '상상을 현실로 만드는\n최고의 디자인 파트너',
  heroSubText: '로고 디자인부터 프리미엄 웹 개발까지,\n브랜드의 가치를 극대화하는 올인원 솔루션을 제공합니다.'
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ portfolio, settings, isAdmin, setPortfolio, setSettings, setIsAdmin }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppState must be used within AppProvider');
  return context;
};
