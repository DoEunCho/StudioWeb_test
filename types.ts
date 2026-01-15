
export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Logo' | 'Web' | 'Branding';
  imageUrl: string;
  description: string;
}

export interface SiteSettings {
  siteTitle: string;
  accentColor: string;
  heroText: string;
  heroSubText: string;
}

export interface AppState {
  portfolio: PortfolioItem[];
  settings: SiteSettings;
  isAdmin: boolean;
}
