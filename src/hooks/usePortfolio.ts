import { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { onAuthStateChanged, User, signInWithGoogle, logout } from '../firebase';
import { db, auth } from '../firebase';
import { PortfolioItem, SiteSettings } from '../types';

const COLLECTION_ITEMS = 'portfolio_items';
const DOC_SETTINGS = 'settings/global';

const ADMIN_EMAIL = 'shbae0526@gmail.com';

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
  aboutTitle: 'CRAFTING VISUAL EXPERIENCES',
  aboutSubtitle: 'About Me',
  aboutDescription: '10년 이상의 경력을 가진 VFX 아티스트로서, 영화, 광고, 게임 등 다양한 매체에서 혁신적인 시각 효과를 창조해왔습니다. 단순한 기술적 구현을 넘어, 관객의 감성을 자극하는 스토리텔링 중심의 비주얼을 지향합니다.',
  aboutExpertise: ['3D Environment Design', 'Fluid & Particle Simulation', 'Compositing & Color Grading'],
  aboutTools: ['Houdini, Maya, Blender', 'Nuke, After Effects', 'Unreal Engine 5'],
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
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAdmin(!!currentUser && currentUser.email === ADMIN_EMAIL && currentUser.emailVerified);
    });
    return () => unsubscribe();
  }, []);

  // Firestore Listeners
  useEffect(() => {
    // Listen to items
    const q = query(collection(db, COLLECTION_ITEMS), orderBy('createdAt', 'desc'));
    const unsubscribeItems = onSnapshot(q, (snapshot) => {
      const newItems = snapshot.docs.map(doc => ({ ...doc.data() } as PortfolioItem));
      
      // If no items in Firestore, use defaults (one-time migration/init)
      if (newItems.length === 0 && !isLoaded) {
        // We'll handle this in the init logic below
      } else {
        setItems(newItems);
      }
    }, (error) => {
      console.error('Firestore Items Error:', error);
    });

    // Listen to settings
    const unsubscribeSettings = onSnapshot(doc(db, DOC_SETTINGS), (snapshot) => {
      if (snapshot.exists()) {
        setSettings({ ...DEFAULT_SETTINGS, ...snapshot.data() } as SiteSettings);
      }
      setIsLoaded(true);
    }, (error) => {
      console.error('Firestore Settings Error:', error);
      setIsLoaded(true);
    });

    return () => {
      unsubscribeItems();
      unsubscribeSettings();
    };
  }, []);

  // Initial Data Setup (if Firestore is empty)
  useEffect(() => {
    const checkAndInit = async () => {
      if (!isLoaded) return;
      
      try {
        const settingsDoc = await getDoc(doc(db, DOC_SETTINGS));
        if (!settingsDoc.exists() && isAdmin) {
          await setDoc(doc(db, DOC_SETTINGS), DEFAULT_SETTINGS);
        }

        const itemsSnap = await getDocs(collection(db, COLLECTION_ITEMS));
        if (itemsSnap.empty && isAdmin) {
          for (const item of DEFAULT_ITEMS) {
            await setDoc(doc(db, COLLECTION_ITEMS, item.id), item);
          }
        }
      } catch (error) {
        console.error('Init Error:', error);
      }
    };
    
    if (isAdmin) {
      checkAndInit();
    }
  }, [isLoaded, isAdmin]);

  const addItem = async (item: Omit<PortfolioItem, 'id' | 'createdAt'>) => {
    if (!isAdmin) return;
    const id = Math.random().toString(36).substr(2, 9);
    const newItem: PortfolioItem = {
      ...item,
      id,
      createdAt: Date.now(),
    };
    await setDoc(doc(db, COLLECTION_ITEMS, id), newItem);
  };

  const updateItem = async (id: string, updatedItem: Partial<PortfolioItem>) => {
    if (!isAdmin) return;
    await updateDoc(doc(db, COLLECTION_ITEMS, id), updatedItem);
  };

  const deleteItem = async (id: string) => {
    if (!isAdmin) return;
    await deleteDoc(doc(db, COLLECTION_ITEMS, id));
  };

  const saveSettings = async (newSettings: SiteSettings) => {
    if (!isAdmin) return;
    await setDoc(doc(db, DOC_SETTINGS), newSettings);
  };

  return { 
    items, 
    settings, 
    isLoaded, 
    user, 
    isAdmin, 
    login: signInWithGoogle, 
    logout, 
    addItem, 
    updateItem, 
    deleteItem, 
    saveSettings 
  };
}
