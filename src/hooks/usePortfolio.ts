import { useState, useEffect } from 'react';
import { PortfolioItem, SiteSettings } from '../types';

const STORAGE_KEY_PORTFOLIO = 'vfx_bsh_portfolio_items';
const STORAGE_KEY_SETTINGS = 'vfx_bsh_site_settings';

const DEFAULT_ITEMS: PortfolioItem[] = [
  {
    id: '1',
    title: 'Cyberpunk Cityscape VFX',
    category: 'Environments',
    description: '미래 지향적인 사이버펑크 도시의 대기 효과와 네온 사인을 구현한 프로젝트입니다.',
    imageUrl: 'https://picsum.photos/seed/vfx1/1200/800',
    createdAt: Date.now() - 1000000,
  },
  {
    id: '2',
    title: 'Fluid Simulation Study',
    category: 'Simulation',
    description: '고해상도 유체 시뮬레이션을 활용한 역동적인 물의 움직임을 표현했습니다.',
    imageUrl: 'https://picsum.photos/seed/vfx2/1200/800',
    createdAt: Date.now() - 2000000,
  },
  {
    id: '3',
    title: 'Character Magic Effects',
    category: 'Characters',
    description: '판타지 캐릭터의 마법 시전 효과와 파티클 시스템을 디자인했습니다.',
    imageUrl: 'https://picsum.photos/seed/vfx3/1200/800',
    createdAt: Date.now() - 3000000,
  },
  {
    id: '4',
    title: 'Explosion Dynamics',
    category: 'Destruction',
    description: '사실적인 폭발 효과와 잔해 비산 시뮬레이션 프로젝트입니다.',
    imageUrl: 'https://picsum.photos/seed/vfx4/1200/800',
    createdAt: Date.now() - 4000000,
  }
];

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'VFX BSH portfolio',
  heroTitle: 'IMAGINATION TO REALITY',
  heroSubtitle: '고급스러운 시각 효과와 혁신적인 디자인으로 상상을 현실로 만듭니다.',
  accentColor: '#00D4FF',
  contactEmail: 'shbae0526@gmail.com',
  aboutImageUrl: 'https://picsum.photos/seed/artist/800/800',
  heroBackgroundUrl: '',
  socialLinks: {
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    vimeo: 'https://vimeo.com',
    artstation: 'https://artstation.com'
  }
};

export function usePortfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedItems = localStorage.getItem(STORAGE_KEY_PORTFOLIO);
      const storedSettings = localStorage.getItem(STORAGE_KEY_SETTINGS);

      if (storedItems) {
        const parsedItems = JSON.parse(storedItems);
        if (Array.isArray(parsedItems)) {
          setItems(parsedItems);
        } else {
          setItems(DEFAULT_ITEMS);
        }
      } else {
        setItems(DEFAULT_ITEMS);
        localStorage.setItem(STORAGE_KEY_PORTFOLIO, JSON.stringify(DEFAULT_ITEMS));
      }

      if (storedSettings) {
        const parsedSettings = JSON.parse(storedSettings);
        if (parsedSettings && typeof parsedSettings === 'object') {
          // Merge with defaults to ensure all required fields exist
          setSettings({ ...DEFAULT_SETTINGS, ...parsedSettings });
        } else {
          setSettings(DEFAULT_SETTINGS);
        }
      } else {
        setSettings(DEFAULT_SETTINGS);
        localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      setItems(DEFAULT_ITEMS);
      setSettings(DEFAULT_SETTINGS);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveItems = (newItems: PortfolioItem[]) => {
    setItems(newItems);
    localStorage.setItem(STORAGE_KEY_PORTFOLIO, JSON.stringify(newItems));
  };

  const saveSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(newSettings));
  };

  const addItem = (item: Omit<PortfolioItem, 'id' | 'createdAt'>) => {
    const newItem: PortfolioItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
    };
    saveItems([newItem, ...items]);
  };

  const updateItem = (id: string, updatedItem: Partial<PortfolioItem>) => {
    const newItems = items.map(item => item.id === id ? { ...item, ...updatedItem } : item);
    saveItems(newItems);
  };

  const deleteItem = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    saveItems(newItems);
  };

  return { items, settings, isLoaded, addItem, updateItem, deleteItem, saveSettings };
}
