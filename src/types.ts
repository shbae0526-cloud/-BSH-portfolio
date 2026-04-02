export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  createdAt: number;
}

export interface SiteSettings {
  siteName: string;
  heroTitle: string;
  heroSubtitle: string;
  accentColor: string;
  contactEmail: string;
  socialLinks: {
    instagram?: string;
    youtube?: string;
    vimeo?: string;
    artstation?: string;
  };
}
