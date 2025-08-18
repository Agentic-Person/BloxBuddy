// Demo authentication for development
// This bypasses real authentication until Supabase is set up

export interface DemoUser {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
}

const DEMO_USER: DemoUser = {
  id: 'demo-user-123',
  email: 'developer@bloxbuddy.com',
  username: 'DemoBuilder',
  avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo'
};

// Store auth state in localStorage
export const demoAuth = {
  login: () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('demo_user', JSON.stringify(DEMO_USER));
      localStorage.setItem('demo_auth', 'true');
    }
  },
  
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('demo_user');
      localStorage.removeItem('demo_auth');
    }
  },
  
  getUser: (): DemoUser | null => {
    if (typeof window !== 'undefined') {
      const isAuth = localStorage.getItem('demo_auth');
      if (isAuth === 'true') {
        const userStr = localStorage.getItem('demo_user');
        return userStr ? JSON.parse(userStr) : null;
      }
    }
    return null;
  },
  
  isAuthenticated: (): boolean => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('demo_auth') === 'true';
    }
    return false;
  }
};